<template>
  <div class="header">
    <div class="notice">
      <a-badge :count="9" number>
        <a-icon type="mail" style="fontSize: 22px;" />
      </a-badge>
    </div>
    <a-dropdown placement="bottomLeft">
      <div
        style="display: inline-block;padding:0  30px 0 20px ;cursor: pointer"
      >
        <a-avatar
          class="header-avatar"
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        />
        <span class="username">{{ username }}</span>
      </div>
      <a-menu slot="overlay">
        <a-menu-item class="menu-item">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item class="menu-item">
          <a-icon type="setting" />
          个人设置
        </a-menu-item>
        <a-menu-item class="menu-item">
          <a-icon type="logout" />
          退出登陆
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "Serati Ma"
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  float: right;
  padding: 0 32px;
  height: 65px;
  .username {
    color: #ccc;
    font-size: 18px;
    font-weight: 200;
    padding: 10px;
  }
  .menu-item {
    font-size: 30px;
  }
}

.header-avatar {
  cursor: pointer;
  margin-top: -5px;
}

.notice {
  display: inline-block;
  vertical-align: middle;
  padding-right: 20px;
  padding-top: 5px;
  cursor: pointer;
}
</style>

<style>
.ant-dropdown-menu-item,
.ant-dropdown-menu-submenu-title {
  font-size: 16px;
  font-weight: 300;
  padding: 10px 12px;
}
</style>
