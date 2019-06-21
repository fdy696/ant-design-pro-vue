import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import findLast from "lodash/findLast";
import { checkAccess, isLogin } from "./utils/permission";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // 用户相关路由
    {
      path: "/user",
      name: "user",
      hideInMenu: true,
      redirect: "/user/login",
      component: () => import("./layouts/UserLayout"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("./views/user/Login")
        },
        {
          path: "register",
          name: "register",
          component: () => import("./views/user/Register")
        }
      ]
    },

    {
      path: "/",
      redirect: "/dashboard/analysis",
      meta: {
        authority: ["admin", "user"]
      },
      component: () => import("./layouts/BasicLayout"),
      children: [
        {
          path: "/dashboard",
          component: { render: h => h("router-view") },
          name: "dashboard",
          redirect: "/dashboard/workplace",
          meta: {
            title: "仪表盘",
            icon: "dashboard"
          },
          children: [
            {
              path: "/dashboard/analysis",
              name: "Analysis",
              component: () => import("@/views/dashboard/Analysis"),
              meta: { title: "分析页" }
            },
            {
              path: "/dashboard/monitor",
              name: "Monitor",
              hidden: true,
              component: () => import("@/views/dashboard/Monitor"),
              meta: { title: "监控页" }
            },
            {
              path: "/dashboard/workplace",
              name: "Workplace",
              component: () => import("@/views/dashboard/Workplace"),
              meta: { title: "工作台" }
            }
          ]
        },
        {
          path: "/test",
          name: "test",
          component: () => import("./views/form/Test"),
          meta: {
            title: "测试",
            icon: "smile",
            authority: ["admin"]
          }
        },
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") },
          meta: { icon: "form", title: "表单", authority: ["admin", "user"] },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: {
                title: "基础表单"
              },
              component: () => import("./views/form/BasicForm")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              meta: {
                title: "分布表单"
              },
              component: () => import("./views/form/StepForm")
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: () => import("./views/Notfound")
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !checkAccess(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
