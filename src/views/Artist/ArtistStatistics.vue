<template>
    <div>
    <v-container>
    <h1 class="white--text display-2 font-weight-bold mb-5">Your Statistics</h1>
    </v-container>
    <v-container v-if="!showTables">
        <v-row>
        <h1 class="white--text mx-6">Choose a start date</h1>
                <v-spacer></v-spacer>
        <h1 class="white--text mx-6">Choose an end date</h1>
        </v-row>
        <v-row>
                <v-date-picker v-model="startDate" dark="" class="mx-5"></v-date-picker>
                <v-spacer></v-spacer>
                <v-btn class="mx-2 my-12" dark large @click="showStatistics()">
                    Show Statistics
                </v-btn>
                <v-spacer></v-spacer>
                <v-date-picker v-model="endDate" dark="" class="mx-5"></v-date-picker>
        </v-row>
        <v-snackbar
        v-model="snackbar"
        :timeout="2500"
        color="red"
        >
        Please Choose a Start and End Date
        <v-btn
            color="black"
            text
            @click="snackbar = false"
        >
            Close
        </v-btn>
        </v-snackbar>
    </v-container>
    <v-container v-if="showTables">
      <h1 class="white--text font-weight-bold mb-5">Your Tracks Listens</h1>
        <v-data-table
        :headers="headers1"
        :items="ListensTrackObject"
        :items-per-page="5">
        </v-data-table>
      <h1 class="white--text font-weight-bold my-3">Your Tracks Likes</h1>
        <v-data-table
        :headers="headers2"
        :items="LikesTrackObject"
        :items-per-page="5">
        </v-data-table>
      <h1 class="white--text font-weight-bold my-3">Your Albums Listens</h1>
        <v-data-table
        :headers="headers3"
        :items="ListensAlbumsObject"
        :items-per-page="5">
        </v-data-table>
      <h1 class="white--text font-weight-bold my-3">Your Albums Likes</h1>
        <v-data-table
        :headers="headers4"
        :items="LikesAlbumsObject"
        :items-per-page="5">
        </v-data-table>
    </v-container>
    </div>
</template>

<script>
import client from 'api-client';

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      showTables: false,
      snackbar: false,
      tracksIDs: [],
      albumsIDs: [],
      ListensTracksData: [],
      ListensTrackObject: [],
      LikesTrackData: [],
      LikesTrackObject: [],
      ListensAlbumsData: [],
      ListensAlbumsObject: [],
      LikesAlbumsData: [],
      LikesAlbumsObject: [],
      headers1: [
        {
          text: 'Your Tracks',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          text: 'Number of plays',
          value: 'plays',
        },
      ],
      headers2: [
        {
          text: 'Your Tracks',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          text: 'Number of Likes',
          value: 'likes',
        },
      ],
      headers3: [
        {
          text: 'Your Albums',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          text: 'Number of Plays',
          value: 'plays',
        },
      ],
      headers4: [
        {
          text: 'Your Albums',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          text: 'Number of Likes',
          value: 'likes',
        },
      ],
    };
  },
  async mounted() {
    this.fetchAnArtist();
  },
  methods: {
    async fetchLikesOfTracksData() {
      await client.fetchLikesOfTracks(
        {
          ids: this.tracksIDs,
          period: 'day',
          startDate: this.startDate,
          endDate: this.endDate,
        },
      ).then((res) => {
        this.LikesTrackData = res;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.LikesTrackData.length; i++) {
          const obj = {
            name: this.LikesTrackData[i].track.name,
            date: `${this.LikesTrackData[i].day}/${this.LikesTrackData[i].month}/${this.LikesTrackData[i].year}`,
            likes: this.LikesTrackData[i].liked,
          };
          this.LikesTrackObject.push(obj);
        }
      });
    },
    async fetchListensOfTracksData() {
      await client.fetchListensOfTracks(
        {
          ids: this.tracksIDs,
          period: 'day',
          startDate: this.startDate,
          endDate: this.endDate,
        },
      ).then((res) => {
        this.ListensTracksData = res;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.ListensTracksData.length; i++) {
          const obj = {
            name: this.ListensTracksData[i].track.name,
            date: `${this.ListensTracksData[i].day}/${this.ListensTracksData[i].month}/${this.ListensTracksData[i].year}`,
            plays: this.ListensTracksData[i].played,
          };
          this.ListensTrackObject.push(obj);
        }
      });
    },
    async fetchListensOfAlbumsData() {
      await client.fetchListensOfAlbums(
        {
          ids: this.albumsIDs,
          period: 'day',
          startDate: this.startDate,
          endDate: this.endDate,
        },
      ).then((res) => {
        this.ListensAlbumsData = res;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.ListensAlbumsData.length; i++) {
          const obj = {
            name: this.ListensAlbumsData[i].album.name,
            date: `${this.ListensAlbumsData[i].day}/${this.ListensAlbumsData[i].month}/${this.ListensAlbumsData[i].year}`,
            plays: this.ListensAlbumsData[i].played,
          };
          this.ListensAlbumsObject.push(obj);
        }
      });
    },
    async fetchLikesOfAlbumsData() {
      await client.fetchLikesOfAlbums(
        {
          ids: this.albumsIDs,
          period: 'day',
          startDate: this.startDate,
          endDate: this.endDate,
        },
      ).then((res) => {
        this.LikesAlbumsData = res;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.LikesAlbumsData.length; i++) {
          const obj = {
            name: this.LikesAlbumsData[i].album.name,
            date: `${this.LikesAlbumsData[i].day}/${this.LikesAlbumsData[i].month}/${this.LikesAlbumsData[i].year}`,
            likes: this.LikesAlbumsData[i].liked,
          };
          this.LikesAlbumsObject.push(obj);
        }
      });
    },
    /** Get an artist */
    fetchAnArtist() {
    /* eslint no-underscore-dangle: ["off", { "allow": ["foo_", "_bar"] }] */
      client.fetchAnArtist(JSON.parse(localStorage.getItem('currentUser')).data._id)
        .then((response) => {
          const artistID = response[0].id;
          this.fetchArtistTopTracks(artistID);
          this.fetchArtistAlbums(artistID);
        });
    },
    /** Get an artist albums */
    async fetchArtistAlbums(id) {
      const albumObj = await client.fetchArtistAlbums(id);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < albumObj.items.length; i++) {
        this.albumsIDs.push(albumObj.items[i].id);
      }
    },
    /** Gets the top tracks of an artist */
    async fetchArtistTopTracks(id) {
      const tracksObj = await client.fetchArtistTopTracks(id);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tracksObj.length; i++) {
        this.tracksIDs.push(tracksObj[i].id);
      }
    },
    /** Show Statistics in the current page */
    showStatistics() {
      if (this.startDate !== '' && this.endDate !== '') {
        this.fetchListensOfTracksData();
        this.fetchLikesOfTracksData();
        this.fetchListensOfAlbumsData();
        this.fetchLikesOfAlbumsData();
        this.showTables = true;
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>
