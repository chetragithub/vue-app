// Reference from: https://router.vuejs.org/guide/advanced/navigation-guards.html
import { createRouter, createWebHistory } from "vue-router";
import { loggedIn } from "@/common/auth/logged";
// import { rolelogged } from "@/common/auth/role";
// import { useCookieStore } from "@/stores/cookie";

// const loginRequired = async (to, from, next) => {
//   const { getCookie } = useCookieStore();
//   if (getCookie("user_token")) {
//     next();
//   } else {
//     next("/login");
//   }
// };

// const roleRequired = (role) =>
//   async (to, from, next) => {
//     const { getCookie } = useCookieStore();
//     if (getCookie("user_role") === role) {
//       next();
//     } else {
//       next("/404");
//     }
//   };

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { auth: true },
    component: () => import("@/views/LoginView"),
  },
  {
    path: "/store",
    name: "store",
    meta: { isSecure: true, auth: false},
    component: () => import("@/views/StoreView"),
  },
  {
    path: "/manage_account",
    name: "manage_account",
    meta: { isSecure: true, auth: false},
    component: () => import("@/views/ManageAccountView"),
  },
  {
    path: "/change_password",
    name: "change_password",
    meta: { isSecure: true, auth: false },
    component: () => import("@/views/ChangePasswordView"),
  },
  {
    path: "/recover_password",
    name: "recover_password",
    meta: { auth: true },
    component: () => import("@/views/RecoverPasswordView"),
  },
  {
    path: "/reset_password/:token",
    name: "reset_password",
    component: () => import("@/views/ResetPasswordView"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404/PageNotFoundView"),
  },
  // product owner ==============================================
  {
    path: "/",
    name: "home",
    meta: { isSecure: true, defaultPage: true, role: 'restaurant_owner' },
    component: () => import("@/views/restuarant_owner/HomeView"),
    // beforeEnter: [loginRequired, roleRequired("restaurant_owner")],
  },
  {
    path: "/category",
    name: "category",
    meta: { isSecure: true, role: 'restaurant_owner' },
    component: () => import("@/views/restuarant_owner/CategoryView"),
    // beforeEnter: [loginRequired, roleRequired("restaurant_owner")],
  },
  {
    path: "/product",
    name: "product",
    meta: { isSecure: true, role: 'restaurant_owner' },
    component: () => import("@/views/restuarant_owner/ProductView"),
    // beforeEnter: [loginRequired, roleRequired("restaurant_owner")],
  },
  {
    path: "/table",
    name: "table",
    meta: { isSecure: true, role: 'restaurant_owner' },
    component: () => import("@/views/restuarant_owner/TableView"),
    // beforeEnter: [loginRequired, roleRequired("restaurant_owner")],
  },
  {
    path: "/staff",
    name: "staff",
    meta: { isSecure: true, role: 'restaurant_owner' },
    component: () => import("@/views/restuarant_owner/StaffView"),
    // beforeEnter: [loginRequired, roleRequired('restaurant_owner')],
  },
  {
    path: "/money",
    name: "money",
    meta: { isSecure: true, role: 'restaurant_owner' },
    component: () => import("@/views/restuarant_owner/MoneyView"),
    // beforeEnter: [loginRequired, roleRequired('restaurant_owner')],
  },
  {
    path: "/sale",
    name: "/sale",
    meta: { isSecure: true, role: 'restaurant_owner' },
    component: () => import("@/views/restuarant_owner/ProductReportView"),
    // beforeEnter: [loginRequired, roleRequired("restaurant_owner")],
  },
  // waiter =====================================================
  {
    path: "/waiter",
    name: "waiter",
    meta: { isSecure: true, defaultPage: true, role: 'waiter' },
    component: () => import("@/views/waiter/WaiterView"),
    // beforeEnter: [loginRequired, roleRequired("waiter")],
  },
  {
    path: "/order-details",
    name: "order-details",
    meta: { isSecure: true, role: 'waiter' },
    component: () => import("@/views/waiter/OrderDetailsView"),
    // beforeEnter: [loginRequired, roleRequired("waiter")],
  },
  // Chef =======================================================
  {
    path: "/chef",
    name: "/chef",
    meta: { isSecure: true, defaultPage: true, role: 'chef' },
    component: () => import("@/views/chef/ChefView"),
    // beforeEnter: [loginRequired, roleRequired("chef")],
  },
  // Cashier =======================================================
  {
    path: "/cashier",
    name: "/cashier",
    meta: { isSecure: true, defaultPage: true, role: 'cashier' },
    component: () => import("@/views/cashier/OrdersView"),
    // beforeEnter: [loginRequired, roleRequired("cashier")],
  }
];

const router = createRouter({
  // mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  // base: 'http://localhost:8080/',
  routes,
});

router.beforeEach(async (to, from, next) => {
  await loggedIn(to, from, next, router)
})

export default router;
