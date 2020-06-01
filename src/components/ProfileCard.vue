<template>
     <v-card
         class="mx-auto"
         max-width="185"
         dark=""
         height="285"
         @click="CardClickLink()"
     >
       <v-container fluid="">
           <v-img class="circle"
           :src="images[0].url"
           height="150px"
           ></v-img>
       </v-container>
         <v-card-title class="font-weight-bold subtitle-2">
         {{profileName}}
         </v-card-title>

     </v-card>
</template>

<script>
export default {
  props: {
    id: String,
    images: Array,
    type: String,
    profileName: String,
  },
  methods: {
    /* istanbul ignore next */
    /** When a card is clicked it go to route of the profile */
    CardClickLink() {
      this.$router.push(`/home/user/${this.id}`);
    },
  },
};
</script>

<style scoped>
.circle {
    border-radius: 500px;
}
</style>
