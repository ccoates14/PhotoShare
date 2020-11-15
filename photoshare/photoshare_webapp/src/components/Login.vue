<template>
  <v-dialog v-model="$store.state.login" max-width="600px">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-container class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form>
              <v-text-field
                class="ml-2"
                name="Username"
                label="Username"
                v-model="username"
              ></v-text-field>
              <v-text-field
                class="ml-2"
                name="Password"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-card-actions>
                <v-btn primary small @click="login">Login</v-btn>
                <v-btn primary small @click="closeWindow"
                  >Close</v-btn
                >
                <v-btn primary small @click="closeWindow(); openSignUpWindow()"
                  >Sign Up</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    username: '',
    password: ''
  }),
  methods:{
    closeWindow(){
      this.$store.state.login = false;
    },
    openSignUpWindow(){
      this.$store.state.signup=true;
    },
    login(){
      console.log(this.username);
      console.log(this.password);
      if (this.username && this.password){
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        }).then(()=>{
          this.closeWindow();
        }).catch(()=>{
          //
        });
      }
    }
  }
}
</script>
