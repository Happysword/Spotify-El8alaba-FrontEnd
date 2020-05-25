<template>
  <div>
    <v-container v-if="ready">
      <h1 class="font-weight-bold white--text">
        New Releases
      </h1>
      <br><br>
      <v-row>
        <v-col sm='6' md='4' lg="2" v-for="(list,index) in lists" :key="index">
          <listCard
            :id="list.id"
            :name="list.name"
            :images="list.images"
            :description="list.description"
            :type="list.type"
            :artistName="list.artistName"
            :owner="list.owner"
          ></listCard>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!ready">
      <h1 class="font-weight-bold white--text">
        New Releases
      </h1>
      <br><br>
      <v-row>
        <v-col sm='6' md='4' lg="2" v-for="i in 12" :key="i">
          <v-skeleton-loader
            ref="skeleton"
            type="card"
            class="mx-auto px-1"
            dark
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import server from 'api-client';
import listCard from '../../components/SongCard.vue';

export default {
  data() {
    return {
      ready: false,
      lists: [],
    };
  },
  components: {
    listCard,
  },
  methods: {
    /**
     * Fetch new releases
     */
    async NewReleases() {
      this.ready = false;
      server.fetchNewReleases()
        .then((res) => {
          this.ready = true;
          this.lists = res;
          console.log(this.lists);
        });
    },
  },
  mounted() {
    this.NewReleases();
  },
};
</script>
