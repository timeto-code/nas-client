import { NextResponse } from "next/server";
import { auth } from "./auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiRoutes,
  authRoutes,
  publicRoutes,
} from "./middleware.routes";

// This function can be marked `async` if using `await` inside
export default auth((request) => {
  const { nextUrl } = request;
  console.log("nextUrl", nextUrl);

  // 判断路由信息
  const isApiRoute = nextUrl.pathname.startsWith(apiRoutes);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // 判断身份验证状态
  const isLoggedIn = !!request.auth;
  console.log("isLoggedIn", request.auth);

  // 如果是API请求，需要在其他判断和操作
  if (isApiRoute) {
    // 在登陆的时候需要通过API获取JWT
    const isAuth = nextUrl.pathname.startsWith(`${apiRoutes}/auth/`);
    if (isAuth) {
      return NextResponse.next();
    }
  }

  if (isLoggedIn) {
    // 已登录状态，不允许访问登录、注册相关的特殊功能路由，重定向到登录后默认路由
    if (isAuthRoute) {
      console.log("已登录，正在跳转到默认页面.....");
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  } else {
    // 未登录状态，只允许访问 isAuthRoute 定义的特定路由
    // 默认自动重定向到登录页面
    if (!isAuthRoute && !isPublicRoute) {
      console.log("未登录，正在跳转到登录页面.....");
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  console.log(`登录状态 [${isLoggedIn}], 访问路由：${nextUrl.pathname}`);
  return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api.*)"],

  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   "/((?!api|_next/static|_next/image|favicon.ico).*)",
  // ],
};
