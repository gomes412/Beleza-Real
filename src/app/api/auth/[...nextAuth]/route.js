import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "@/lib/db";

async function getUserByEmail(email) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT id, nome, email, senha_hash, rule FROM usuario WHERE email = $1",
      [email]
    );
    const user = res.rows[0];
    if (user) {
      user.role = user.rule;
      delete user.rule;
    }
    return user || null;
  } catch (error) {
    console.error("Erro ao buscar usuário no DB:", error);
    return null;
  } finally {
    client.release();
  }
}

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credenciais",
      credentials: {
        email: { label: "E-mail", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const { email, senha } = credentials || {};
        if (!email || !senha) return null;

        const user = await getUserByEmail(email);
        if (!user || !user.senha_hash) return null;

        const ok = await compare(senha, user.senha_hash);
        if (!ok) return null;

        return {
          id: user.id,
          name: user.nome,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const existing = await getUserByEmail(profile.email);
        if (!existing) return false;
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }

      if (account?.provider === "google") {
        const existing = await getUserByEmail(token.email);
        if (existing) {
          token.id = existing.id;
          token.role = existing.role;
          token.name = existing.nome || token.name;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        name: token.name,
        email: token.email,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
