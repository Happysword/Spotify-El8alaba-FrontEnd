<template>
    <v-container>
      <div v-for="category in categories" :key="category.id">
        <template v-if="category.playlists.length > 0">
          <v-row>
            <v-col sm='8' md='10' lg="10">
              <h1 class="font-weight-bold white--text" id="recent"
              @click="click(category)"
              >
                {{category.name}}
              </h1>
            </v-col>
            <v-col sm='4' md='2' lg="2" align="end" v-if="category.playlists.length > 6">
              <h1 class="white--text pr-5 pt-4 body-1" id="all" @click="click(category)">
                See All
              </h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm='6' md='4' lg="2"
              v-for="i in (category.playlists.length>6 ? 6:category.playlists.length)"
              :key ="i">
              <!-- <artistCard v-if="played[i-1].type === 'artist'"
                :id="played[i-1].id"
                :name="played[i-1].name"
                :images="played[i-1].images[0]"
                :description="played[i-1].description"
                :type="played[i-1].type"
              >
              </artistCard> -->
              <songCard
                :id="category.playlists[i-1].id"
                :name="category.playlists[i-1].name"
                :images="category.playlists[i-1].images"
                :description="category.playlists[i-1].description"
                :type="category.playlists[i-1].type"
                :artistName="category.playlists[i-1].artistName"
              >
              </songCard>
            </v-col>
          </v-row>
        </template>
      </div>
    </v-container>
</template>

<script>
import server from 'api-client';
import songCard from '../../components/SongCard.vue';
// import artistCard from '../../components/ArtistCard.vue';

export default {
  name: 'Home',
  components: {
    songCard,
    // artistCard,
  },
  data() {
    return {
      played: [
        {
          type: 'artist',
          description: 'This is a description',
          images: [
            {
              url: 'https://i.scdn.co/image/2622edec99d68d1d141886be593c88cbe509f6d8',
            },
          ],
          name: 'Billie Eilish',
          id: '5e8f2f34481183596571494a',
        },
        {
          type: 'album',
          description: 'This is a description',
          images: [
            {
              url: 'https://mosaic.scdn.co/640/ab67616d0000b2731f7077ae1018b5fbab08dfa8ab67616d0000b2733eb275abf8efc71452bcd52eab67616d0000b2737c39dd133836c2c1c87e34d6ab67616d0000b273b30e1e75859151e8d2691bcf',
            },
          ],
          name: 'Freddie',
          artistName: 'Freddie Mercury',
          id: '5e8f2f3e4811835965714971',
        },
        {
          type: 'artist',
          description: 'This is a description',
          images: [
            {
              url: 'https://i.scdn.co/image/2622edec99d68d1d141886be593c88cbe509f6d8',
            },
          ],
          name: 'Billie Eilish',
          id: '5e8f2f34481183596571494a',
        },
        {
          type: 'playlist',
          description: 'This is a description',
          images: [
            {
              url: 'https://mosaic.scdn.co/640/ab67616d0000b2731f7077ae1018b5fbab08dfa8ab67616d0000b2733eb275abf8efc71452bcd52eab67616d0000b2737c39dd133836c2c1c87e34d6ab67616d0000b273b30e1e75859151e8d2691bcf',
            },
          ],
          name: 'Freddie',
          id: '5e8f2f3e4811835965714971',
        },
        {
          type: 'artist',
          description: 'This is a description',
          images: [
            {
              url: 'https://i.scdn.co/image/2622edec99d68d1d141886be593c88cbe509f6d8',
            },
          ],
          name: 'Billie Eilish',
          id: '5e8f2f34481183596571494a',
        },
        {
          type: 'album',
          description: 'This is a description',
          images: [
            {
              url: 'https://mosaic.scdn.co/640/ab67616d0000b2731f7077ae1018b5fbab08dfa8ab67616d0000b2733eb275abf8efc71452bcd52eab67616d0000b2737c39dd133836c2c1c87e34d6ab67616d0000b273b30e1e75859151e8d2691bcf',
            },
          ],
          name: 'Freddie',
          artistName: 'Freddie Mercury',
          id: '5e8f2f3e4811835965714971',
        },
      ],
      list: [
        'Recently Played',
        'Your heavy rotation',
        'Rewind and rediscover your favorites',
      ],
      categories: [],
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    click(category) {
      if (category.playlists.length >= 1) {
        // eslint-disable-next-line no-underscore-dangle
        this.$router.push(`/genre/${category._id}-page`);
      }
    },

    async getCategories() {
      this.categories = await server.fetchGenres();
    },
  },
};
</script>
<style scoped>
#recent:hover,#all:hover {
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
