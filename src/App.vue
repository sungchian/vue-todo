<template>
  <div id="app">
    <!-- loading 拉到最外層，可以讓所有頁面使用。 -->
    <div v-if="loading" class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/todo">Todo</router-link> |
      <router-link to="/leafmap">LeafMap</router-link> |
      <router-link to="/cantavit">Cantavit</router-link> |
      <router-link to="/records">Record</router-link> |
      <router-link to="/analysis">Analysis</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
import store from "./store";
export default {
  computed: {
    loading: {
      get() {
        console.log(store.state.loading);
        return store.state.loading;
      },
      set(val) {
        return val;
      }
    }
  }
};
</script>

<style lang="scss">
:root{
    --bgc: #2A2438;
    --brown-lighter: #cfbdb7;
    --brown-light: #9F918C;
    --brown: #8D7A79;
    --bgc-left-top: #2A2438;
    --bgc-right-down: #575F67;
    --gold: #B88C35;
    --gold-light: #F8E299;
    //#CA4246
    //#E16541
    //#E16541
    //#F18F43
    //#F18F43
    //#8B9862
    //#8B9862
    //#476098
    //#476098
    //#A7489B
    
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.mb-20 {
  margin-bottom: 20px;
}

.mb-50 {
  margin-bottom: 50px;
}
</style>

<style scoped>
body{
  position: relative;
}

.loader {
  position: absolute;
  top: 50%;
  left: 40%;
  margin-left: 10%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 999;
}
.dot {
  width: 24px;
  height: 24px;
  background: #3ac;
  border-radius: 100%;
  display: inline-block;
  animation: slide 1s infinite;
}
.dot:nth-child(1) {
  animation-delay: 0.1s;
  background: #32aacc;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #64aacc;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
  background: #96aacc;
}
.dot:nth-child(4) {
  animation-delay: 0.4s;
  background: #c8aacc;
}
.dot:nth-child(5) {
  animation-delay: 0.5s;
  background: #faaacc;
}
@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
