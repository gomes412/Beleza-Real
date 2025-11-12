import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    const precisaAuth =
        pathname.startsWith("/login") ||
        pathname.startsWith("/todoDia1") ||
        pathname.startsWith("/todoDia2") ||
        pathname.startsWith("/todoDia3") ||
        pathname.startsWith("/todoDia4") ||
        pathname.startsWith("/cada7.1") ||
        pathname.startsWith("/cada7.2") ||
        pathname.startsWith("/cada7.3") ||
        pathname.startsWith("/cada7.4") ||
        pathname.startsWith("/cada15.1") ||
        pathname.startsWith("/cada15.2") ||
        pathname.startsWith("/cada15.3") ||
        pathname.startsWith("/cada15.4") ||
        pathname.startsWith("/cada30.1") ||
        pathname.startsWith("/cada30.2") ||
        pathname.startsWith("/cada30.3") ||
        pathname.startsWith("/cada30.4") ||
        pathname.startsWith("/personalizar1") ||
        pathname.startsWith("/personalizar2") ||
        pathname.startsWith("/personalizar3") ||
        pathname.startsWith("/personalizar4");

    
    if (precisaAuth && !token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
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