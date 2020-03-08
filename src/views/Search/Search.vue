<template>
  <div class="ml-6">
  <Navbar :searching=true></Navbar>
  <h2 class="white--text mt-10 font-weight-bold" >Browse all</h2>
  <v-layout row wrap>
  <Genres v-for="genre in genres" :key=genre.text class="mt-3" :source= genre.src
  :title= genre.text :route= genre.route :color= genre.color></Genres>
  </v-layout>
  </div>
</template>

<script>
import Navbar from '../../components/NavBar.vue';
import Genres from '../../components/GenresCard.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Genres,
  },
  data() {
    return {
      genres: [
        {
          src: 'https://t.scdn.co/images/47d9e28592b64a95a60bdbe9ae7fb2c8.jpeg',
          text: 'Arabic',
          route: '/genre/arabic',
          color: 'blue',
        },
        {
          src: 'https://t.scdn.co/images/9676cef74ec147a48607c737c4f93943.jpeg',
          text: 'Hip-Hop',
          route: '/genre/hip-hop',
          color: 'red',
        },
        {
          src: 'https://t.scdn.co/images/47d9e28592b64a95a60bdbe9ae7fb2c8.jpeg',
          text: 'Arabic',
          route: '/genre/arabic',
          color: 'blue',
        },
        {
          src: 'https://t.scdn.co/images/9676cef74ec147a48607c737c4f93943.jpeg',
          text: 'Hip-Hop',
          route: '/genre/hip-hop',
          color: 'red',
        },
        {
          src: 'https://t.scdn.co/images/47d9e28592b64a95a60bdbe9ae7fb2c8.jpeg',
          text: 'Arabic',
          route: '/genre/arabic',
          color: 'blue',
        },
        {
          src: 'https://t.scdn.co/images/9676cef74ec147a48607c737c4f93943.jpeg',
          text: 'Hip-Hop',
          route: '/genre/hip-hop',
          color: 'red',
        },
        {
          src: 'https://t.scdn.co/images/47d9e28592b64a95a60bdbe9ae7fb2c8.jpeg',
          text: 'Arabic',
          route: '/genre/arabic',
          color: 'blue',
        },
        {
          src: 'https://t.scdn.co/images/9676cef74ec147a48607c737c4f93943.jpeg',
          text: 'Hip-Hop',
          route: '/genre/hip-hop',
          color: 'red',
        },
      ],
    };
  },
};
</script>
