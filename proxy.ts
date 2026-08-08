
import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { getAccessToken } from "./service/getAccessToken";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password","/verify-otp"];
const PUBLIC_ROUTES = ["/", "/news", "/login", "/register","/services","/technicians","/how-it-works","/contact","/terms","/privacy","/help","/verify-otp"];

export const proxy = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccesstoken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshtoken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    const response = NextResponse.next();
    if (!decodedAccesstoken?.success && decodedRefreshtoken?.success) {
        const result = await getAccessToken();

        if (result.success && result.data?.accessToken) {
            const newAccessToken: string = result.data.accessToken; 

            response.cookies.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            });

            accessToken = newAccessToken;
            decodedAccesstoken = jwtUtils.verifyToken(newAccessToken, process.env.JWT_ACCESS_SECRET as string);
        }
    }

    let role = null;
    if (decodedAccesstoken?.success && decodedAccesstoken?.data) {
        role = (decodedAccesstoken.data as JwtPayload).role;
    }

    if (!decodedAccesstoken?.success) {
        response.cookies.delete("accessToken");
    }

    const isPublishRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
if (!accessToken && !isPublishRoute) {
    const loginUrl = new URL("/login", request.url);

    const redirectPath =
        request.nextUrl.pathname + request.nextUrl.search;

    loginUrl.searchParams.set("redirectTo", redirectPath);

    return NextResponse.redirect(loginUrl);
}

    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (role === "CUSTOMER") return NextResponse.redirect(new URL("/dashboard/customer", request.url));
        if (role === "ADMIN") return NextResponse.redirect(new URL("/dashboard/admin", request.url));
        if (role === "TECHNICION") return NextResponse.redirect(new URL("/dashboard/technician", request.url));
    }

    return response;
};


export const config = {
    matcher: [
    "/((?!_next/static|_next/image|images|icons|fonts|favicon.ico|api).*)",
    ],
};


