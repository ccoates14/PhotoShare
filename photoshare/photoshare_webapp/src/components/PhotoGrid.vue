<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="n in 7" :key="n" cols="12" sm="4">
          <v-card class="pa-2 mt-2 mb-2 ml-2 mr-2" outlined tile>
            <v-img src="https://source.unsplash.com/random">

            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {};
</script>
