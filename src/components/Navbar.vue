<template>
    <div id="nav">
        <nav class="navbar  is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
            <div class="container">
  <div class="navbar-brand">
    <router-link to="/" class="navbar-item" tag="a">
      <i class="fas fa-dragon"></i><span>oTrue</span>
    </router-link>

    <a @click="toggleMenu" role="button" class="navbar-burger burger toggleMenuButton" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu toggleMenuContent">
      
    <div class="navbar-start">

      <div class="navbar-item">
        <div class="field has-addons has-addons-right">
          <div class="control is-expanded">
            <input class="input searchField" type="text" placeholder="Search...">
          </div>
          <div class="control">
            <a class="button is-primary searchButton">
              <i class="fas fa-search"></i>
            </a>
          </div>
        </div>
      </div>

    </div>

    <div class="navbar-end">
        


      <div class="navbar-item">
        <div class="buttons">
            <router-link class="button is-primary" to="/signup" tag="a" v-if="!currentUser">Signup</router-link>
            <router-link class="button is-light" to="/login" tag="a" v-if="!currentUser">Login</router-link>
            
            
        </div>
      </div>


        <div class="navbar-item has-dropdown is-hoverable" v-if="currentUser">
                <a href="" @click.prevent="" class="navbar-link">
                    {{ userProfile.name }}
                </a>

                <div class="navbar-dropdown">
                    <router-link to="/settings" tag="a"  class="navbar-item">
                      Setting
                    </router-link>
                    <hr class="navbar-divider">
                    <a class="navbar-item" @click.prevent="logout">
                      Log Out
                    </a>
                </div>
            </div>


    </div>
  </div>
  </div>
</nav>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js');

export default {
    name: 'Navbar',
    data(){
        return {
            currentUser: fb.auth.currentUser,
            userProfile: null
        }
    },
    methods: {
        logout(){
            fb.auth.signOut().then(() => {
                this.$router.push('/login');
            });
        },
        toggleMenu(){
            document.querySelector('.toggleMenuButton').classList.toggle('is-active');
            document.querySelector('.toggleMenuContent').classList.toggle('is-active');

        }
    },
    mounted() {
        fb.usersCollection.doc(this.currentUser.uid).onSnapshot(doc => {
            this.userProfile = doc.data()
        });
    }
}
</script>
<style lang="scss" scoped>

.navbar-brand .navbar-item {
  font-family: 'Roboto Condensed';
  font-size: 25px;
  color: #35495D;
  margin-right: 50px;
  i{
  color: #53B983;
    font-weight: 800;
    
  }
  span{
    font-size: 24px;
    font-weight: 600;
  }
}

.navbar-brand .navbar-item:hover{
  color: #53C5A7;
}

.searchButton{
  border-radius: 0 20px 20px 0;
}

.searchField{
  border-radius: 20px 0 0 20px;
}
</style>
