import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/auth/helper/auth";

const publicRoutes = ['/','/login','/register']

export async function middleware(req:NextRequest) {
  const token = (await cookies()).get('token')?.value;
  const currentPath = req.nextUrl.pathname;
  const user = await decrypt(token as string)
  
  // cek jika ngk ada user id dan sedang berada didalam protectedRoute, tendang ke page login. (userid dari decrypt token)
  if(!user?.payload.id && !publicRoutes.includes(currentPath)){ 
    return NextResponse.redirect(new URL('/login',req.nextUrl))
  }
  
  // cek jika ada user id dan sedang berada didalam publicRoutes, tendang ke page dashboard. (userid dari decrypt token)
  if(user?.payload.id && publicRoutes.includes(currentPath)){
    return NextResponse.redirect(new URL('/dashboard',req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  // akan berjalan di semua route, kecuali route yang berawalan: api,_next/static,_next/image,favicon.ico
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}