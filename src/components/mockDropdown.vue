<template>
      <v-list dark id="menu" class="ma-auto" left>
        <v-list-item
          v-for="(item, index) in showList"
          :key="index"
        >
          <v-list-item-title style="cursor: pointer;"
            @click="click(item)">{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
</template>

<script>
import server from 'api-client';
import EventBus from '../EventBus';

export default {
  data: () => ({
    overlay: false,
    SnackBar: {
      show: false,
      content: '',
      timeout: 2000,
    },
    showList: [],
    songList: ['Save To Your Liked Songs', 'Add to Queue', 'Add to Playlist'],
    albumList: ['Save To Your Library', 'Copy Link'],
    myPlaylist: ['Make Public', 'Delete', 'Copy Link'],
  }),
  props: {
    id: String,
    type: String,
    track: Object,
    ownerID: String,
    public: Boolean,
    card: String,
    listID: String,
    position: Number,
  },
  methods: {
    /**
     * Load Dropdown data
     */
    async loadData() {
      if (this.type === 'track') {
        // eslint-disable-next-line no-underscore-dangle
        if (this.ownerID === JSON.parse(localStorage.getItem('currentUser')).data._id) {
          this.songList = ['Save To Your Liked Songs', 'Add to Queue', 'Add to Playlist', 'Remove from this Playlist'];
        }
        const response = await server.checkLiked(this.id);
        if (response === true) this.songList[0] = 'Remove From Your Liked Songs';
        this.showList = this.songList;
      }
      if (this.type === 'playlist') {
        // eslint-disable-next-line no-underscore-dangle
        if (this.ownerID === JSON.parse(localStorage.getItem('currentUser')).data._id) {
          if (this.public === true) this.myPlaylist[0] = 'Make Secret';
          this.showList = this.myPlaylist;
        } else {
          const response = await server.CheckPlaylist(this.id);
          if (response.status === 200 && response.data[0] === true) this.albumList[0] = 'Remove From Your Library';
          this.showList = this.albumList;
        }
      }
      if (this.type === 'album') {
        const response = await server.CheckAlbum(this.id);
        if (response.status === 200 && response.data[0] === true) this.albumList[0] = 'Remove From Your Library';
        this.showList = this.albumList;
      }
    },

    /**
     * Make a proper request based on the click
     * @param {String} item the Required request
     */
    async click(item) {
      console.log(window.location.href);
      if (this.type === 'track') {
        if (item === 'Save To Your Liked Songs') {
          const response = await server.saveTrack(this.id);

          if (response === true) {
            this.songList[0] = 'Remove From Your Liked Songs';
            this.SnackBar.show = true;
            this.SnackBar.content = 'Saved to Your Liked Songs';
          }
        }
        if (item === 'Remove From Your Liked Songs') {
          const response = await server.RemoveTrack(this.id);
          if (response === true) {
            this.songList[0] = 'Save To Your Liked Songs';
            this.SnackBar.show = true;
            this.SnackBar.content = 'Removed From Your Liked Songs';
          }
        }
        if (item === 'Add to Queue') {
          this.$store.state.MusicPlayer.currentQueue.push(this.track);
          this.SnackBar.show = true;
          this.SnackBar.content = 'Added to Queue';
          console.log(this.$store.state.MusicPlayer.currentQueue);
        }
        if (item === 'Add to Playlist') {
          EventBus.$emit('addOverlay', true, this.id);
        }
        if (item === 'Remove from this Playlist') {
          const response = await server.RemoveTrackFromPlaylist(
            this.listID,
            this.id,
            this.position,
          );
          if (response === true) {
            EventBus.$emit('reload', this.listID);
            this.SnackBar.show = true;
            this.SnackBar.content = 'Track is Removed from This Playlist';
          }
        }
        EventBus.$emit('snackbar', this.SnackBar);
        this.showList = this.songList;
      }
      if (this.type === 'playlist') {
        if (item === 'Make Public') {
          const response = await server.ChangeDetailsOfPlaylist(this.id, { public: true });
          if (response === true) {
            this.myPlaylist[0] = 'Make Secret';
            this.showList = this.myPlaylist;
            this.SnackBar.show = true;
            this.SnackBar.content = 'Your Playlist is Public';
          }
        } else if (item === 'Make Secret') {
          const response = await server.ChangeDetailsOfPlaylist(this.id, { public: false });
          if (response === true) {
            this.myPlaylist[0] = 'Make Public';
            this.showList = this.myPlaylist;
            this.SnackBar.show = true;
            this.SnackBar.content = 'Your Playlist is Secret';
          }
        } else if (item === 'Delete') {
          this.overlay = true;
          EventBus.$emit('overlay', this.overlay, this.id);
        } else if (item === 'Save To Your Library') {
          const response = await server.FollowPlaylist(this.id);
          if (response.status === 200) {
            this.albumList[0] = 'Remove From Your Library';
            this.showList = this.albumList;
            this.$store.commit('changeLiked');
            this.SnackBar.show = true;
            this.SnackBar.content = 'Saved To Your Library';
            server.fetchCurrentUserPlaylists(JSON.parse(localStorage.getItem('currentUser')).token)
              .then((res) => {
                this.$store.state.userPlaylists = res;
              });
          }
        } else if (item === 'Remove From Your Library') {
          const response = await server.UnfollowPlaylist(this.id);
          if (response.status === 200) {
            this.albumList[0] = 'Save To Your Library';
            this.showList = this.albumList;
            this.$store.commit('changeLiked');
            this.SnackBar.show = true;
            this.SnackBar.content = 'Removed From Your Library';
            server.fetchCurrentUserPlaylists(JSON.parse(localStorage.getItem('currentUser')).token)
              .then((res) => {
                this.$store.state.userPlaylists = res;
              });
          }
        }
        EventBus.$emit('snackbar', this.SnackBar);
      }
      if (this.type === 'album') {
        if (item === 'Save To Your Library') {
          const response = await server.SaveAlbum(this.id);
          if (response.status === 201) {
            this.albumList[0] = 'Remove From Your Library';
            this.showList = this.albumList;
            this.$store.commit('changeLiked');
            this.SnackBar.show = true;
            this.SnackBar.content = 'Saved To Your Library';
          }
        } else if (item === 'Remove From Your Library') {
          const response = await server.RemoveAlbum(this.id);
          if (response.status === 200) {
            this.albumList[0] = 'Save To Your Library';
            this.showList = this.albumList;
            this.$store.commit('changeLiked');
            this.SnackBar.show = true;
            this.SnackBar.content = 'Removed From Your Library';
          }
        }
        EventBus.$emit('snackbar', this.SnackBar);
      }
      if (item === 'Copy Link') {
        if (this.card === 'card') {
          if (this.type === 'playlist') this.$copyText(`${window.location.origin}/playlist/${this.id}`);
          if (this.type === 'album') this.$copyText(`${window.location.origin}/album/${this.id}`);
        } else this.$copyText(window.location.href);
        this.SnackBar.show = true;
        this.SnackBar.content = 'Copied to clipboard';
        EventBus.$emit('snackbar', this.SnackBar);
      }
      this.$forceUpdate(); // Force Vue to re-render the component
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
