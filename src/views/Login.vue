<template>
  <div class="login-page">
      <Navbar></Navbar>
      <div class="container">
      <div class="columns is-centered">
          <div class="column is-10-mobile is-6-tablet is-7-desktop is-5-widescreen">

              <h1>Login</h1>

              <form @submit.prevent="login" class="login">

                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left">
                    <input class="input" type="email" v-model="loginForm.email" placeholder="Email">
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>
        
                <div class="field">
                  <label class="label">Password</label>
                  <div class="control  has-icons-left">
                    <input class="input" type="password" v-model="loginForm.password" placeholder="Password">
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="control">
                  <button class="button is-primary" type="submit">Submit</button>
                </div>
        
            </form>

          </div>
    </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
const fb = require('../firebaseConfig.js');

export default {
    name: 'Login',
    components:{
        Navbar
    },
    data(){
        return {
            loginForm: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        login(){
            fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then((user) => {
                console.log('You just log in : ' , user);
                this.$router.push('/');
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.login-page{
    margin-top: 100px;
    .column{
      margin: auto
    }
    h1{
        font-family: 'Roboto Condensed';
        font-size: 40px;
        margin-bottom: 30px;
    }
    .login{
        text-align: left;
    }
}
</style>
