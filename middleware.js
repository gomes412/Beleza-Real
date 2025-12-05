import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // ROTAS PROTEGIDAS
  const rotasProtegidas = [
    "/login",
    "/todoDia1",
    "/todoDia2",
    "/todoDia3",
    "/todoDia4",
    "/cada7.1",
    "/cada7.2",
    "/cada7.3",
    "/cada7.4",
    "/cada15.1",
    "/cada15.2",
    "/cada15.3",
    "/cada15.4",
    "/cada30.1",
    "/cada30.2",
    "/cada30.3",
    "/cada30.4",
    "/personalizar1",
    "/personalizar2",
    "/personalizar3",
    "/personalizar4",
  ];

  const precisaAuth = rotasProtegidas.some((rota) => pathname.startsWith(rota));

  // Se tentar acessar rota protegida sem estar logado → manda para login
  if (precisaAuth && !token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Se já estiver logado e tentar acessar a página de login, redireciona para Principal
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/calendario", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/todoDia1/:path*",
    "/todoDia2/:path*",
    "/todoDia3/:path*",
    "/todoDia4/:path*",
    "/cada7.1/:path*",
    "/cada7.2/:path*",
    "/cada7.3/:path*",
    "/cada7.4/:path*",
    "/cada15.1/:path*",
    "/cada15.2/:path*",
    "/cada15.3/:path*",
    "/cada15.4/:path*",
    "/cada30.1/:path*",
    "/cada30.2/:path*",
    "/cada30.3/:path*",
    "/cada30.4/:path*",
    "/personalizar1/:path*",
    "/personalizar2/:path*",
    "/personalizar3/:path*",
    "/personalizar4/:path*",
  ],
};
