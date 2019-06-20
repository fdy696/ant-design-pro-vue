<template>
  <div class="base-layout">
    <Header />
    <Siderbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Siderbar from "./Siderbar";
export default {
  data() {
    return {
      // key: value
    };
  },
  components: {
    Header,
    Footer,
    Siderbar
  }
};
</script>

<style lang="scss" scoped></style>
