<template>
      <v-list dark id="menu" class="ma-auto">
        <v-list-item
          v-for="(item, index) in showList"
          :key="index"
        >
          <v-list-item-title @click="click(item)">{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
</template>

<script>
import server from 'api-client';
import EventBus from '../EventBus';

export default {
  data: () => ({
    SnackBar: {
      show: true,
      content: 'hi',
      timeout: 2000,
    },
    showList: [],
    songList: ['Save to Your Liked Songs', 'Add to Queue', 'Add to Playlist', 'Copy Song Link'],
    albumList: ['Save to Your Liked Songs', 'Copy Link'],
  }),
  props: {
    id: String,
    type: String,
    track: Object,
  },
  methods: {
    /**
     * Load Dropdown data
     */
    async loadData() {
      if (this.type === 'track') {
        const response = await server.checkLiked(this.id);
        if (response === true) this.songList[0] = 'Remove from Your Liked Songs';
        this.showList = this.songList;
      }
    },

    /**
     * Make a proper request based on the click
     * @param {String} item the Required request
     */
    async click(item) {
      if (this.type === 'track') {
        if (item === 'Save to Your Liked Songs') {
          const response = await server.saveTrack(this.id);

          if (response === true) {
            this.songList[0] = 'Remove from Your Liked Songs';
            this.showList[0] = 'Remove from Your Liked Songs';
            this.SnackBar.show = true;
            this.SnackBar.content = 'Saved to Your Liked Songs';
          }
        }
        if (item === 'Remove from Your Liked Songs') {
          const response = await server.RemoveTrack(this.id);
          if (response === true) {
            this.songList[0] = 'Save to Your Liked Songs';
            this.showList[0] = 'Save to Your Liked Songs';
            this.SnackBar.show = true;
            this.SnackBar.content = 'Removed from Your Liked Songs';
          }
        }
        if (item === 'Add to Queue') {
          this.$store.state.MusicPlayer.currentQueue.push(this.track);
          this.SnackBar.show = true;
          this.SnackBar.content = 'Added to Queue';
          console.log(this.$store.state.MusicPlayer.currentQueue);
        }
        EventBus.$emit('snackbar', this.SnackBar);
      }
    },
  },
  created() {
    this.loadData();
  },
};
</script>
