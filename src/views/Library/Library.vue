<template>
    <v-container fluid="" >
        <select-bar v-for="(libraryLink,index) in libraryLinks"
        :key="index"
        :selectBarValue="libraryLink.value"
        :selectBarRoute="libraryLink.route"></select-bar>
    <router-view ></router-view>
    </v-container>
</template>

<script>
import SelectBar from '../../components/SelectBar.vue';

export default {
  data() {
    return {
      libraryLinks: [
        { value: 'Playlists', route: '/library/playlists' },
        { value: 'Albums', route: '/library/albums' },
        { value: 'Artists', route: '/library/artists' },
      ],
    };
  },
  components: {
    SelectBar,
  },
};
</script>
