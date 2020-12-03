import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/plugins/api'

import academy from './academy';
import customer from './customer';
Vue.use(Vuex);

const state = {
  overlay: false,
  page: "",
  links: [],
  user:null,
  loginDialog:false
};

const mutations = {
  setOverlay(state, payload){
    state.overlay = payload;
  },
  setLoginDialog(state, payload){
    state.loginDialog = payload;
  },
  setPage(state, payload){
    state.page = payload;
    if(payload == "academy"){
      state.links = [
        {'label':'Pendaftaran','url':'/academy/form','auth':false},
        {'label':'Customer','url':'/academy/customer','auth':true},
        {'label':'Periode','url':'/academy/period','auth':true},
        {'label':'List','url':'/academy/list','auth':true},
      ];
    }else if(payload == "ask-career"){
      state.links = [
        {'label':'Pendaftaran','url':'/ask-career/form','auth':false},
        {'label':'Customer','url':'/ask-career/customer','auth':true},
        {'label':'Periode','url':'/ask-career/period','auth':true},
        {'label':'List','url':'/ask-career/list','auth':true},
      ]
    }
  },
  setUser(state, payload){
    state.loginDialog = false;
    state.user = payload;
  }
};

const actions = {
  login({commit}, payload){
    return new Promise((resolve, reject)=>{
      api.post('/auth/login',payload).then(response =>{
          localStorage.setItem('token',"Bearer "+response.data.token)
          commit('setUser',response.data.user);
          resolve(response.data);
      });
    });
  },
  me({commit}){
    return new Promise((resolve, reject)=>{
      api.get('/auth/me').then(response=>{
        let obj = response.data;
        if(obj.id != undefined)
          commit('setUser',response.data);
      })
    });
  }
};

const getters = {
  overlay(state){
    return state.overlay;
  },
  page(state){
    return state.page;
  },
  links(state){
    return state.links;
  },
  user(state){
    return state.user;
  },
  loginDialog(state){
    return state.loginDialog;
  }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        academy,
        customer
    }
});