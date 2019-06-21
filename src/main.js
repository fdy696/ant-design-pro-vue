import Vue from "vue";
import {
  Button,
  Icon,
  Layout,
  Breadcrumb,
  Drawer,
  Radio,
  Menu,
  Avatar,
  Badge,
  Dropdown
} from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import Permission from "./components/Permission";
Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Breadcrumb);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Avatar);
Vue.use(Badge);
Vue.use(Dropdown);

Vue.component("Permission", Permission);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
