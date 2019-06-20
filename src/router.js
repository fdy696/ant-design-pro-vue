import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // 用户相关路由
    {
      path: "/user",
      redirect: "/user/login",
      component: () => import("./layouts/UserLayout"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("./views/User/Login")
        },
        {
          path: "register",
          name: "register",
          component: () => import("./views/User/Register")
        }
      ]
    },

    {
      path: "/",
      redirect: "/dashboard/analysis",
      component: () => import("./layouts/BasicLayout"),
      children: [
        {
          path: "/dashboard",
          component: { render: h => h("router-view") },
          name: "dashboard",
          redirect: "/dashboard/workplace",
          meta: {
            title: "仪表盘",
            icon: "dashboard",
            permission: ["dashboard"]
          },
          children: [
            {
              path: "/dashboard/analysis",
              name: "Analysis",
              component: () => import("@/views/dashboard/Analysis"),
              meta: { title: "分析页", permission: ["dashboard"] }
            },
            {
              path: "/dashboard/monitor",
              name: "Monitor",
              hidden: true,
              component: () => import("@/views/dashboard/Monitor"),
              meta: { title: "监控页", permission: ["dashboard"] }
            },
            {
              path: "/dashboard/workplace",
              name: "Workplace",
              component: () => import("@/views/dashboard/Workplace"),
              meta: { title: "工作台", permission: ["dashboard"] }
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: () => import("./views/Notfound")
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
