import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/app.scss'

import 'bulma/css/bulma.css'


import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
// Firebase
const fb = require('./firebaseConfig.js')


Vue.config.productionTip = false;

let app
fb.auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            render: h => h(App)
        }).$mount('#app')
    }
})
