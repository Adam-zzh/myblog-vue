const state = {
  // 存储token
  token:"",
  userName:"" // 可选
}
const getters = {
  getToken(state){
    return state.token || localStorage.getItem("token") || "";
  }
}

const mutations = {
  // 修改token，并将token存入localStorage
  setToken(state,token) {
    state.token = token;
    localStorage.setItem('token', token);
    console.log('store、localstorage保存token成功！');
  },
  delToken(state) {
    state.token = "";
    localStorage.removeItem("token");
  },
  // 可选
  setUserInfo(state, userName) {
    state.userName = userName;
  }
}

const actions = {
  // removeToken: (context) => {
  // context.commit('setToken')
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
