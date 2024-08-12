import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import routes, { getAllRoutes } from './libs/routes';
import { getAuthedUserAction } from './server-actions/auth-actions';

const allRoute = getAllRoutes();

export async function middleware(request: NextRequest) {
  const user = await getAuthedUserAction();

  let routeDetails: any = null;

  // Get route details
  if (allRoute?.[request.nextUrl.pathname]) {
    routeDetails = allRoute?.[request.nextUrl.pathname];
  }

  // Check if route is protected and user is unathorized, redirect to auth page
  if (routeDetails?.protected && !user) {
    return NextResponse.redirect(new URL(`${routes.auth.fullUrl}`, request.nextUrl.origin));
  }

  // If auth user enter on auth route, redirect to home page
  if (request.nextUrl.pathname.includes('auth') && user) {
    return NextResponse.redirect(new URL(routes.tabs.fullUrl, request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
