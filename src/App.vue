<script>
import Search from './components/index/search.vue';
import Navigation from './components/index/navigation.vue';
import Prompt from './components/index/prompt.vue';
import {Navigator} from './js/navigator';

export default {
  data() {
    return {
      is_active: false,
      navigators: this.load_navs(),
      nav_index: -1,
    }
  },
  methods: {
    toggel() {
      this.is_active = this.is_active ? false : true;
    },
    set_navIndex(n) {
      this.nav_index = n;
    },
    load_navs() {
      let navs = JSON.parse(window.localStorage.getItem('navigators'))||[];
      for(let index in navs) {
        const nav = JSON.parse(navs[index]);
        navs[index] = new Navigator(nav.title, nav.url, nav.favicon);
      }
      return navs;
    }
  },
  components: {
    Search,
    Navigation,
    Prompt,
  }
}
</script>

<template>
  <Prompt v-if="is_active" :nav_index="nav_index" :is_active="is_active" :navigators="navigators" @toggel="toggel" @set_navIndex="set_navIndex" />
  <div class="search-module justify-content-center">
    <Search />
    <Navigation :is_active="is_active" :nav_index="nav_index" :navigators="navigators" @toggel="toggel" @set_navIndex="set_navIndex" />
  </div>
</template>

<style scoped>
body {
  user-select: none;
}

.search-module {
  height: 100vh;
  width: 100vw;
  margin: 0px;
  background: url('./imgs/bg.jpg') no-repeat;
  background-size: cover;
  background-position: top center;
  overflow: hidden;
}
</style>