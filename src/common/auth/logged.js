import { useCookieStore } from "@/stores/cookie";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

export async function isUserLogin() {
  const { user } = storeToRefs(useUserStore());
  let isLogin = false;
  let isRefresh = false;
  const { getCookie } = useCookieStore();
  const token = getCookie("user_token");
  if (!token) return { login: isLogin };
  if (token && !user.token) {
    user.token = token;
    isRefresh = true;
  }
  isLogin = true;
  return { login: isLogin, isRefresh };
}

export const loggedIn = async (to, from, next, router) => {
  const { getUser } = useUserStore();
  const { userData } = storeToRefs(useUserStore());
  const isLogin = await isUserLogin();
  if (!isLogin.login && to.meta.isSecure) {
    router.push("/login");
  } else {
    if (isLogin.login && isLogin.isRefresh) {
      await getUser();
      if (
        (to.meta.isSecure && to.meta.role !== userData.value.role.name) ||
        (to.meta.auth && userData.value)
      ) {
        next(
          router.options.routes.find(
            (r) =>
              r.meta &&
              r.meta.role === userData.value.role.name &&
              r.meta.defaultPage
          ).path
        );
      }
    }
    next();
  }
};
