<template>
  <div class="signup-page">
      <Navbar></Navbar>
        <div class="container">
          <div class="columns is-centered">
              <div class="column is-10-mobile is-6-tablet is-7-desktop is-5-widescreen">

                  <h1>SignUp</h1>

                  <form @submit.prevent="signup" class="signup">

                    <div class="field">
                      <label class="label">Name</label>
                      <div class="control has-icons-left">
                        <input class="input" type="text" v-model="signupForm.name" placeholder="Name">
                        <span class="icon is-small is-left">
                          <i class="fas fa-user"></i>
                        </span>
                      </div>
                    </div>

                    <div class="field">
                      <label class="label">Profile Picture</label>
                      <div class="file has-name">
                        <label class="file-label">
                          <input class="file-input" type="file" name="profilePicture" id="profilePicture" accept="image/*" >
                          <span class="file-cta">
                            <span class="file-icon">
                              <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                              Choose a picture …
                            </span>
                          </span>
                          <span class="file-name">
                            Screen Shot 2017-07-29 at 15.54.25.png
                          </span>
                        </label>
                      </div>
                    </div>

                    <div class="field">
                      <label class="label">Biography</label>
                      <div class="control has-icons-left">
                        <textarea class="input" type="text" v-model="signupForm.bio" placeholder="Biography"></textarea>
                        <span class="icon is-small is-left">
                          <i class="fas fa-atlas"></i>
                        </span>
                      </div>
                    </div>

                    <div class="field">
                      <label class="label">Email</label>
                      <div class="control has-icons-left">
                        <input class="input" type="email" v-model="signupForm.email" placeholder="Email">
                        <span class="icon is-small is-left">
                          <i class="fas fa-envelope"></i>
                        </span>
                      </div>
                    </div>

                    <div class="field">
                      <label class="label">Password</label>
                      <div class="control  has-icons-left">
                        <input class="input" type="password" v-model="signupForm.password" placeholder="Password">
                        <span class="icon is-small is-left">
                          <i class="fas fa-lock"></i>
                        </span>
                      </div>
                    </div>
                    <div class="control">
                      <button class="button is-primary" type="submit">Signup</button>
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
    name: 'Signup',
    components:{
        Navbar
    },
    data(){
        return {
            signupForm: {
                name: null,
                bio: null,
                email: null,
                password: null
            }
        }
    },
    methods: {
        signup(){
            let profilePicture = document.querySelector('#profilePicture').files[0];
            let profilePictureName = new Date() + '-' + profilePicture.name;
            let profilePicturesRef = fb.storageRef.child('profilePictures/' + profilePictureName);
            console.log("Image name is : ", profilePictureName);
            fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then((user) => {
                profilePicturesRef.put(profilePicture).then(snapshot => {
                    console.log("Image uploaded");
                  return snapshot.ref.getDownloadURL();
                  
                }).then(url => {
                  fb.usersCollection.doc(user.user.uid).set({
                          name: this.signupForm.name,
                          bio: this.signupForm.bio,
                          profilePictureURL: url
                  });
                  console.log("User infos uploaded");
                });
            }).then(() => this.$router.push('/'));
        }
    }
}
</script>
<style lang="scss" scoped>
.signup-page{
    margin-top: 100px;
    .column{
      margin: 0 auto;
    
      h1{
          font-family: 'Roboto Condensed';
          font-size: 40px;
          margin-bottom: 30px;
      }
      .signup{
          text-align: left;
          textarea{
            height: 100px;
          }
      }
    }
}
</style>