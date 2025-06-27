import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const publicAuthRoutes = ["/login", "/register", "/forgot-password"];
const DEFAULT_REDIRECT_PATH = "/dashboard";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log("Middleware is running");
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (pathname === "/") {
      const url = req.nextUrl.clone();
      url.pathname = token ? DEFAULT_REDIRECT_PATH : "/login";
      return NextResponse.redirect(url);
    }

    if (token && publicAuthRoutes.includes(pathname)) {
      const url = req.nextUrl.clone();
      url.pathname = DEFAULT_REDIRECT_PATH;
      return NextResponse.redirect(url);
    }

    // role-based access control can be implemented here
    // if needed, uncomment the following code block
    // const matchedKey = Object.keys(routeMap).find((key) =>
    //   pathname.startsWith(key)
    // );

    // if (matchedKey) {
    //   const { roles: allowedRoles } = routeMap[matchedKey];
    //   if (!token) {
    //     if (!publicAuthRoutes.includes(pathname)) {
    //       const url = req.nextUrl.clone();
    //       url.pathname = "/login";
    //       url.searchParams.set("callbackUrl", pathname);
    //       return NextResponse.redirect(url);
    //     }
    //     return;
    //   }

    //   const userRoles: string[] = Array.isArray(token.roles) ? token.roles : [];
    //   const isAuthorized = allowedRoles.some((role) =>
    //     userRoles.includes(role)
    //   );

    //   if (!isAuthorized) {
    //     const url = req.nextUrl.clone();
    //     url.pathname = "/unauthorized";
    //     return NextResponse.redirect(url);
    //   }
    // }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
