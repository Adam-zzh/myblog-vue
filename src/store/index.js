import Vue from 'vue';
import Vuex from 'vuex';
// require是赋值过程并且是运行时才执行,import是解构过程并且是编译时执行
const modulesFiles = require.context("./modules", true, /\.js|.ts$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    ...modules,
  }
})

/*
this.$store.commit("login/setToken", localStorage.getItem("token"));
this.$store.dispatch('login/getToken');
*/
