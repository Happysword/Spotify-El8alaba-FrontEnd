<template>
  <div>
    <v-container v-if="ready">
      <div>
        <template v-if="recentlyPlayed.length > 0">
          <v-row>
            <v-col sm='8' md='10' lg="10">
              <h1 class="font-weight-bold white--text">
                Recently Played
              </h1>
            </v-col>
            <v-col sm='4' md='2' lg="2" align="end" v-if="recentlyPlayed.length > 6">
              <h1 class="white--text pr-5 pt-4 body-1" id="all"
              >
                See All
              </h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm='6' md='4' lg="2"
              v-for="i in (recentlyPlayed.length>6 ? 6:recentlyPlayed.length)"
              :key ="i">
              <songCard
                :id="recentlyPlayed[i-1].id"
                :name="recentlyPlayed[i-1].name"
                :images="recentlyPlayed[i-1].images"
                :description="recentlyPlayed[i-1].description"
                :type="recentlyPlayed[i-1].type"
                :artistName="recentlyPlayed[i-1].artistName"
                :owner="recentlyPlayed[i-1].owner ? recentlyPlayed[i-1].owner.id:''"
              >
              </songCard>
            </v-col>
          </v-row>
        </template>
      </div>
      <div>
        <template v-if="newReleases.length > 0">
          <v-row>
            <v-col sm='8' md='10' lg="10">
              <h1 class="font-weight-bold white--text">
                New Releases
              </h1>
            </v-col>
            <v-col sm='4' md='2' lg="2" align="end" v-if="newReleases.length > 6">
              <h1 class="white--text pr-5 pt-4 body-1" id="all"
                @click="$router.push('/NewReleases')"
              >
                See All
              </h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm='6' md='4' lg="2"
              v-for="i in (newReleases.length>6 ? 6:newReleases.length)"
              :key ="i">
              <songCard
                :id="newReleases[i-1].id"
                :name="newReleases[i-1].name"
                :images="newReleases[i-1].images"
                :description="newReleases[i-1].description"
                :type="newReleases[i-1].type"
                :artistName="newReleases[i-1].artistName"
                :owner="newReleases[i-1].owner ? newReleases[i-1].owner.id:''"
              >
              </songCard>
            </v-col>
          </v-row>
        </template>
      </div>
      <div v-for="category in categories" :key="category._id">
        <template v-if="category.playlists.length > 0">
          <v-row>
            <v-col sm='8' md='10' lg="10">
              <h1 class="font-weight-bold white--text" id="recent"
              @click="click(category._id, category.playlists.length)"
              >
                {{category.name}}
              </h1>
            </v-col>
            <v-col sm='4' md='2' lg="2" align="end" v-if="category.playlists.length > 6">
              <h1 class="white--text pr-5 pt-4 body-1" id="all"
                @click="click(category._id, category.playlists.length)"
              >
                See All
              </h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm='6' md='4' lg="2"
              v-for="i in (category.playlists.length>6 ? 6:category.playlists.length)"
              :key ="i">
              <songCard
                :id="category.playlists[i-1].id"
                :name="category.playlists[i-1].name"
                :images="category.playlists[i-1].images"
                :description="category.playlists[i-1].description"
                :type="category.playlists[i-1].type"
                :artistName="category.playlists[i-1].artistName"
                :owner="category.playlists[i-1].owner"
              >
              </songCard>
            </v-col>
          </v-row>
        </template>
      </div>
    </v-container>
    <v-container v-if="!ready">
      <div v-for="j in 6" :key="j">
        <v-col sm="6" md="6" lg="6">
          <v-skeleton-loader
              ref="skeleton"
              type="heading"
              class="py-1"
              dark
          ></v-skeleton-loader>
        </v-col>
        <v-row class="py-12">
          <v-col sm='6' md='4' lg="2" v-for="i in 6" :key="i">
            <v-skeleton-loader
              ref="skeleton"
              type="card"
              class="mx-auto px-1"
              dark
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import server from 'api-client';
import songCard from '../../components/SongCard.vue';

/**
 * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
 */
export default {
  name: 'Home',
  components: {
    songCard,
  },
  data() {
    return {
      categories: [],
      recentlyPlayed: [],
      newReleases: [],
      owner: {},
      ready: false,
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    /**
     * Route to Genre page
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     * @param {String} id category id
     * @param {Number} length number of playlists in this category
     */
    click(id, length) {
      if (length >= 1) {
        this.$router.push(`/genre/${id}-page`);
      }
    },
    /**
     * Get list of Categories
     * @author Naiera <naiera.refaey99@eng-st.cu.edu.eg>
     */
    async getCategories() {
      this.ready = false;
      this.recentlyPlayed = await server.fetchRecentlyPlayedLists(6);
      this.categories = await server.fetchGenres();
      this.newReleases = await server.fetchNewReleases();
      this.ready = true;
    },
  },
};
</script>
<style scoped>
#recently:hover,#recent:hover,#all:hover {
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
