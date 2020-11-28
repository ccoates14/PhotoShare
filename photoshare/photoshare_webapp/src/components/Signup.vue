<template>
  <v-dialog v-model="$store.state.signup" max-width="600px">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-container class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Sign Up</h4>
            </v-card-title>
            <v-form v-model="isValidForm">
              <v-text-field
                class="ml-2"
                name="Username"
                label="Username"
                required
                :rules="usernameRules"
                v-model="username"
                v-click-outside="checkUserNameTaken"
              ></v-text-field>
              <v-text-field
                class="ml-2"
                name="Password"
                label="Password"
                type="password"
                v-model="password1"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field
                class="ml-2"
                name="Password"
                label="Password"
                type="password"
                v-model="password2"
                :rules="[...passwordRules, ()=>password1==password2 || 'Passwords must be the same!']"
                required
              ></v-text-field>
              <v-card-actions>
                <v-btn primary small @click="closeWindow"
                  >Close</v-btn
                >
                <v-btn primary small :disabled="!isValidForm" @click="submitSignUp">Sign Up</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>
import axios from 'axios';
export default {
  data: () => ({
    username: '',
    password1: '',
    password2: '',
    isValidForm: false,
    usernameRules: [(v=> v && v.length>3 )|| 'username required'],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 5) || 'Password must have 5+ characters',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
      v => /(?=.*\d)/.test(v) || 'Must have one number',
      v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]',
    ]
    
  }),

  methods: {
    checkUserNameTaken(){
      if (this.username){
        //check if username is taken
        axios.get(this.$store.state.baseApiUrl + 'users/userExists/' + this.username).then(r =>{
          const usernameTaken = r.data;

          if (usernameTaken){
            alert(this.username + ' taken!');
            this.username = '';
          }
        }).catch(err =>{
          console.log(err);
        });
      }
    },
    closeWindow(){
      this.$store.state.signup = false;
    },
    submitSignUp(){
      this.$store.dispatch('signUp', {
        username: this.username,
        password: this.password2
      }).then(()=>{
        this.closeWindow();
      }).catch(()=>{
        //
      });
    }
  },
};
</script>
