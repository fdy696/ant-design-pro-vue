<template>
  <div class="base-layout">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        v-if="navLayout === 'left'"
        :theme="navTheme"
        width="300px"
      >
        <div class="logo">
          <img :src="logoUrl" alt="ant-design-pro-vue" />
          <span :class="{ color: navTheme == 'light' }">Ant design pro</span>
        </div>
        <Sidebar :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header
          class="a-header"
          style="background: #fff; padding: 0;height: 70px"
        >
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />

          <Header class="header" />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <!-- <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item> -->
          </a-breadcrumb>
          <div
            :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
          >
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Permission :authority="['admin']">
      <SettingDrawer></SettingDrawer>
    </Permission>
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Siderbar";
import SettingDrawer from "../components/settingDrawer";
export default {
  data() {
    return {
      collapsed: false,
      logoUrl: require("../assets/ant.svg")
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    Footer,
    Header,
    Sidebar,
    SettingDrawer
  }
};
</script>

<style lang="less" scoped>
.logo {
  height: 70px;
  line-height: 70px;
  color: #fff;
  font-size: 20px;
  overflow: hidden;
  img {
    height: 40px;
    padding: 0 20px;
  }
}

.logo .color {
  color: #333;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 16px;
  cursor: pointer;
  transition: color 0.3s;
}

.a-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
