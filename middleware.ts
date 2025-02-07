import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/auth/helper/auth";

const publicRoutes = ["/", "/login", "/register"];
const apiRoute = "/api";

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  const currentPath = req.nextUrl.pathname;

  const user = await decrypt(token as string);

  // cek jika ngk ada user id dan sedang berada didalam protectedRoute dan path tidak berada di /api , tendang ke page login. (userid dari decrypt token)
  if (
    !user?.payload.id &&
    !publicRoutes.includes(currentPath) &&
    !currentPath.startsWith(apiRoute)
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // cek jika ada user id dan sedang berada didalam publicRoutes, tendang ke page dashboard. (userid dari decrypt token)
  if (user?.payload.id && publicRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // cek apakah sedang berada di path api/:path*
  if (currentPath.startsWith(apiRoute)) {
    // validate untuk authorization route api
    const bearertoken = req.headers.get("Authorization");

    if (!bearertoken) {
      return NextResponse.json({ message: "unnauthorized" }, { status: 400, statusText: "failed access" });
    }

    const tokenAuthorization = await decrypt(bearertoken.split(" ")[1]);

    if (!tokenAuthorization?.payload.id) {
      return NextResponse.json({ message: "invalid token" }, { status: 400, statusText: "failed access" });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // akan berjalan di semua route, kecuali route yang berawalan: _next/static,_next/image,favicon.ico
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
