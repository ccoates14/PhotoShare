<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters v-if="$store.state.currentPhotoGrid.length > 0">
        <v-col
          v-for="url in $store.state.currentPhotoGrid"
          :key="url"
          cols="12"
          sm="4"
        >
          <v-card class="pa-2 mt-2 mb-2 ml-2 mr-2" outlined tile>
            <expandable-image :close-on-background-click="true" :src="url">
            </expandable-image>
          </v-card>
        </v-col>
      </v-row>
      <v-card class="pa-2 mt-2 mb-2 ml-2 mr-2" outlined tile v-else>
        <expandable-image :close-on-background-click="true" :src="imagesNotFound">
        </expandable-image>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  
  data: () => ({
    imagesNotFound: 'https://res.cloudinary.com/dlmueporq/image/upload/v1606527953/tenor_qovqtk.gif'
  }),
};
</script>
