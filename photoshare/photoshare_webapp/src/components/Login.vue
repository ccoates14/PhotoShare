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
              ></v-text-field>
              <v-text-field
                class="ml-2"
                name="Password"
                label="Password"
                type="password"
              ></v-text-field>
              <v-card-actions>
                <v-btn primary small>Login</v-btn>
                <v-btn primary small @click="$store.state.login = false"
                  >Close</v-btn
                >
                <v-btn primary small @click="$store.state.login = false; $store.state.signup=true"
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
