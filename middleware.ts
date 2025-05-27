import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

const protectedRoutes = ['/users/profile']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  const authHeader = (await headers()).get("Authorization")

  if (isProtectedRoute && !authHeader) {
    return NextResponse.redirect(new URL('/users/signin', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
