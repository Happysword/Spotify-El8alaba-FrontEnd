<template>
<div>
  <v-snackbar
      id="snackbar"
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      color='#1DB954'
    >
      <h3 class="white--text title font-weight-light mx-auto">
        {{ snackbar.content }}
      </h3>
    </v-snackbar>
    <v-dialog :value="overlay" justify="center"
      overlay-color="#000000FF" overlay-opacity="0.7" dark>
        <h1 class="display-2 white--text text-center mb-12">
          Do you really want to delete this playlist?
        </h1>
      <div align="center">
        <v-btn
          justify="center"
          rounded
          dark
          outlined
          width="130"
          class="mx-8"
          @click="overlay = false"
        >
          Cancel
        </v-btn>
        <v-btn
          rounded
          width="130"
          color="#1DB954"
          @click="Delete()"
        >
          Delete
        </v-btn>
      </div>
    </v-dialog>
</div>
</template>

<script>
import server from 'api-client';
import EventBus from '../EventBus';

export default {
  data() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        content: '',
      },
      overlay: false,
      listId: '',
    };
  },

  methods: {
    /**
     * Unfollow User's List
     */
    async Delete() {
      const response = await server.UnfollowPlaylist(this.listId);
      if (response.status === 200) {
        this.overlay = false;
        this.snackbar = {
          show: true,
          timeout: 2000,
          content: 'Removed from Your Library',
        };
      }
    },
  },

  async mounted() {
    EventBus.$on('snackbar', (snackbar) => {
      this.snackbar = snackbar;
    });

    EventBus.$on('overlay', (overlay, id) => {
      this.overlay = overlay;
      this.listId = id;
    });
  },
};
</script>
