<template>
  <div class="home">
    <Navbar></Navbar>
      <div class="container is-centered columns">
        <div class="column is-5">
          <div class="profile-infos">
            <img :src="userProfile.profilePictureURL" alt="" class="column is-10-mobile is-6-tablet is-5-desktop is-4-widescreen">
            <h2>{{ userProfile.name }}</h2>
            <div class="infos">
              <p>{{ currentUser.email }}</p>
              <p>{{ userProfile.bio }}</p>
            </div>
          </div>
          
          
          <div class="newpost has-shadow">
            <form @submit.prevent="newpost">
              <textarea v-model="newpostContent" class="textarea" placeholder="What's on your mind ..." rows="4"></textarea>
              
              <div class="file is-pulled-left">
                <label class="file-label">
                  <input class="file-input" type="file" name="postPicture" id="postPicture" accept="image/*">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a picture…
                    </span>
                  </span>
                </label>
              </div>

              <button type="submit" class="button is-primary">New Post</button>
            </form>
          </div>
        </div>

        <div class="column is-7">
          <div class="posts">
            <div class="post has-shadow" v-for="post in posts" :key="post.id">
              <div class="user-date">
                
                  <img :src="post.userPictureURL" alt="" class="post-user-img">
                  <span class="post-username" style="vertical-align: top;margin: 5px 0 0 15px;display: inline-block;"> 
                    {{ post.userName }}
                  </span>
                  <a href="#" class="delete-post is-pulled-right" v-if="post.userId == currentUser.uid" @click="deletePost(post.id)">
                    <i class="far fa-trash-alt"></i>
                  </a>
              </div>
              
              <div class="content">
                  <img :src="post.url" alt="">
                  {{ post.content }}
              </div>
              <div class="reactions columns">
                  <div class="column is-4">
                      <button v-if="post.react == 'up'" class="up active" @click.prevent="up(post.id)">
                          <i class="fas fa-angle-double-up"></i> <span>{{ post.ups }}</span>
                      </button>
                      <button v-else class="up" @click.prevent="up(post.id)">
                          <i class="fas fa-angle-double-up"></i> <span>{{ post.ups }}</span>
                      </button>
                  </div>
                  <div class="column is-4" >
                      <button v-if="post.react == 'down'" class="up active" @click.prevent="down(post.id)">
                      <i class="fas fa-angle-double-down"></i> <span>{{ post.downs }}</span>
                      </button>
                      <button v-else class="up" @click.prevent="down(post.id)">
                      <i class="fas fa-angle-double-down"></i> <span>{{ post.downs }}</span>
                      </button>
                  </div>
                  <div class="column is-4">
                      <button class="up">
                      <i class="fas fa-share-alt"></i> <span>45</span>
                      </button>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
const fb = require('../firebaseConfig.js');


export default {
  name: 'Home',
  components:{
    Navbar
  },
  data(){
    return {
      currentUser: fb.auth.currentUser,
      userProfile: null,
      newpostContent: null,
      posts : [],
      url: null
    }
  },
  methods:{
      newpost(){
          if((this.newpostContent && this.newpostContent.trim().length >= 1) || document.querySelector('#postPicture').files.length > 0){

            if((this.newpostContent && this.newpostContent.trim().length >= 1) && document.querySelector('#postPicture').files.length > 0){

              let postPicture = document.querySelector('#postPicture').files[0];
              let postPictureName = new Date() + '-' + postPicture.name;
              let postPicturesRef = fb.storageRef.child('postPictures/' + postPictureName);
              console.log("Image name is : ", postPictureName);
                  postPicturesRef.put(postPicture).then(snapshot => {
                      console.log("Image uploaded");
                      return snapshot.ref.getDownloadURL();
                  }).then(url => {
                      fb.postsCollection.add({
                        userId: this.currentUser.uid,
                        content: this.newpostContent.trim(),
                        userName: this.userProfile.name,
                        ups: 0,
                        downs: 0,
                        shares: 0,
                        createdAt: new Date(),
                        url: url,
                        userPictureURL: this.userProfile.profilePictureURL
                    })
                      
                  }).then(() => {
                    this.newpostContent = '';
                    postPicture.value = '';
                    console.log("END :  sending post infos");
                  }).catch(function(error) {
                      console.error("Error adding post: ", error.message);
                  });


            }else if ((!this.newpostContent || this.newpostContent.trim().length == 0 ) && document.querySelector('#postPicture').files.length > 0){
                let postPicture = document.querySelector('#postPicture').files[0];
                let postPictureName = new Date() + '-' + postPicture.name;
                let postPicturesRef = fb.storageRef.child('postPictures/' + postPictureName);
                console.log("Image name is : ", postPictureName);
                    postPicturesRef.put(postPicture).then(snapshot => {
                        console.log("Image uploaded");
                        return snapshot.ref.getDownloadURL();
                    }).then(url => {
                        fb.postsCollection.add({
                          userId: this.currentUser.uid,
                          content: '',
                          userName: this.userProfile.name,
                          ups: 0,
                          downs: 0,
                          shares: 0,
                          createdAt: new Date(),
                          url: url,
                          userPictureURL: this.userProfile.profilePictureURL
                      })

                    }).then(() => {
                      this.newpostContent = '';
                      postPicture.value = '';
                      console.log("END :  sending post infos");
                    }).catch(function(error) {
                        console.error("Error adding post: ", error.message);
                    });

            }else{

              fb.postsCollection.add({
                  userId: this.currentUser.uid,
                  content: this.newpostContent.trim(),
                  userName: this.userProfile.name,
                  ups: 0,
                  downs: 0,
                  shares: 0,
                  createdAt: new Date(),
                  url: null,
                  userPictureURL: this.userProfile.profilePictureURL
              }).then(function(docRef) {
                  this.newpostContent = '';
                  console.log("Post written with ID: ", docRef.id);
              })
              .catch(function(error) {
                  console.error("Error adding post: ", error.message);
              });
            }
            
          }
      },
      deletePost(id){
        if(confirm('Are you sure you want to delete the post?')){

          fb.reactsCollection.where('postId','==',id).get()
          .then(function(querySnapshot) {
                // Once we get the results, begin a batch
                var batch = fb.db.batch();

                querySnapshot.forEach(function(doc) {
                    // For each doc, add a delete operation to the batch
                    batch.delete(doc.ref);
                });

                // Commit the batch
                return batch.commit();
          }).then(function() {
              // Delete completed!
              // ...
            fb.postsCollection.doc(id).delete().then(function() {
              console.log("Post successfully deleted!");
            })
          }).catch(function(err){
              console.log("Error : ", err.message);
          }); 

        }
      },
      up(id){
        fb.reactsCollection.where('userId', '==', this.currentUser.uid).where('postId', '==', id).get()
          .then((snapshot) => {
            if(snapshot.docs.length > 0){
              if(snapshot.docs[0].data().type == 'up'){
                  console.log('Already uped by this user');
              }else{

                fb.reactsCollection.doc(snapshot.docs[0].id).update({
                      type: 'up'
                }).then(function() {
                    fb.postsCollection.doc(id).update({
                        ups: fb.increment,
                        downs: fb.decrement
                    }).then(function() {
                        console.log("Document successfully updated!");
                    })

                }).catch(function() {
                    console.log("Error updating document");
                });


              }
            }else{


                fb.reactsCollection.add({
                      userId: this.currentUser.uid,
                      postId: id,
                      type: 'up'
                }).then(function() {
                    fb.postsCollection.doc(id).update({
                        ups: fb.increment
                    }).then(function() {
                        console.log("Document successfully updated!");
                    })

                }).catch(function() {
                    console.log("Error updating document");
                });



            }
        })

      },

      down(id){
        fb.reactsCollection.where('userId', '==', this.currentUser.uid).where('postId', '==', id).get()
          .then((snapshot) => {
            if(snapshot.docs.length > 0){
              if(snapshot.docs[0].data().type == 'down'){
                  console.log('Already downed by this user');
              }else{

                fb.reactsCollection.doc(snapshot.docs[0].id).update({
                      type: 'down'
                }).then(function() {
                    fb.postsCollection.doc(id).update({
                        downs: fb.increment,
                        ups: fb.decrement
                    }).then(function() {
                        console.log("Document successfully updated!");
                    })

                }).catch(function() {
                    console.log("Error updating document");
                });


              }
            }else{


                fb.reactsCollection.add({
                      userId: this.currentUser.uid,
                      postId: id,
                      type: 'down'
                }).then(function() {
                    fb.postsCollection.doc(id).update({
                        downs: fb.increment
                    }).then(function() {
                        console.log("Document successfully updated!");
                    })

                }).catch(function() {
                    console.log("Error updating document");
                });



            }
        })

      }
  },
  mounted() {
      fb.usersCollection.doc(this.currentUser.uid).onSnapshot(doc => {
          this.userProfile = doc.data()
      });

      fb.postsCollection.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {

          let postsArray = []
          querySnapshot.forEach(doc => {
              let post = doc.data()
              post.id = doc.id
              postsArray.push(post)
              post.react = null

              fb.reactsCollection.where('postId', '==', post.id).where('userId', '==', this.currentUser.uid).get().then(snapshot => {
                snapshot.forEach(function(doc){
                  post.react = doc.data().type
                  console.log("Data : ",doc.data());
                });
              })


          })
          this.posts = postsArray
          
      })
      console.log('uid : ',this.currentUser.uid);
      console.log('post uid : ',this.posts[0].userId);
  }
}
</script>
<style lang="scss" scoped>
.container{
  margin: 0 auto;
}
.home{
    margin: 0 auto;
    margin-top: 55px;
    background-color: #EFEFEF;

    h1{
        font-family: 'Roboto Condensed';
        font-size: 40px;
    }

    .profile-infos{
      padding: 20px;
      text-align: center;
      margin: 10px auto;
      background-color: #ffffff;
      border: 1px solid #DDD;
      border-radius: 5px;
      h2{
        font-size: 20px;
        font-weight: 600;
      }
      .infos{
        color: #888;
      }
    }

    .newpost{
      padding: 20px;
      text-align: right;
      background-color: #ffffff;
      border: 1px solid #DDD;
      border-radius: 5px;
      .textarea{
        height: 90px;
        margin-bottom: 10px;
      }

      .file{
        display: inline;

        .file-label{
          display: inline;
        }
      }

      button{
        border-radius: 20px;
      }
    }

    .posts{
      margin: 10px auto;
        .post{
          background-color: #ffffff;
          border: 1px solid #DDD;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;

          

          .content{
              text-align: left;
              padding: 10px 10px 0 10px;
              font-size: 18px;
              .hashtags{
                  margin-top: 5px;
              }
          }

          .user-date{
              text-align: left;
              padding: 10px 20px;
              color: #555;
              font-size: 20px;

              .post-user-img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid #AAA;
              }
          }

          .reactions{
              padding: 10px;
              padding-top: 0;
              margin-top: 0;
              button{
                  padding: 10px;
                  width: 100%;
                  text-align: center;
                  border: none;
                  background: none;
                  border-radius: 3px;
              }

              button:hover{
                  background-color: #53C5A7;
                  color: #FFF;
                  cursor: pointer;
              }

              button.active{
                  background-color: #53C5A7;
                  color: #FFF;
              }
          }
      }
    }

    .column{
      margin: 0 auto
    }
}
</style>