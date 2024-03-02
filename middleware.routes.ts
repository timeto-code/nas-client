/********** 所有API请求的路由 **********/
export const apiRoutes = "/api";

/********** 未登录时就可访问的路由 **********/
export const publicRoutes = ["/verification"];

/********** 只有特殊操作：登录、登出、验证、等等...才可以访问的特定路由 **********/
export const authRoutes = [
  "/login",
  "/logout",
  "/register",
  "/error",
  "/reset",
  "/new-password",
];

/********** 默认登录后重定向的路由 **********/
export const DEFAULT_LOGIN_REDIRECT = "/";
