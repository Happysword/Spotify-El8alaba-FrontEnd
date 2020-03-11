<template>
  <v-container fluid="">
    <select-bar
      v-for="(libraryLink, index) in libraryLinks"
      :key="index"
      :selectBarValue="libraryLink.value"
      :selectBarRoute="libraryLink.route"
    ></select-bar>
    <router-view></router-view>
  </v-container>
</template>

<script>
import SelectBar from '../../components/SelectBar.vue';

export default {
  data() {
    return {
      libraryLinks: [
        { value: 'Playlists', route: '/home/library/playlists' },
        { value: 'Albums', route: '/home/library/albums' },
        { value: 'Artists', route: '/home/library/artists' },
      ],
    };
  },
  components: {
    SelectBar,
  },
};
</script>
