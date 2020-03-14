<template>
  <nav>
    <v-navigation-drawer
      app
      color="#040404"
      dark
      v-model="drawer"
      width="230"
      permanent
    >
      <v-container>
        <v-list dense="">
          <v-list-item-content>
            <v-img
              src="../assets/imgs/El-8alaba.png"
              contain
              height="120"
            ></v-img>
          </v-list-item-content>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            route
            exact
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">{{
                link.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list dark="" dense="">
          <v-list-item-content>
            <v-list-item-title class="caption font-weight-bold gray--text"
              >PLAYLISTS</v-list-item-title
            >
          </v-list-item-content>

          <v-dialog
            v-model="dialog"
            max-width="100%"
            dark=""
            overlay-color="black"
            overlay-opacity="0.9"
          >
            <template v-slot:activator="{ on }">
              <v-list-item @click="drawer = !drawer" v-on="on">
                <v-list-item-icon>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2"
                    >Create Playlist</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-container>
              <v-row align="center" justify="center">
                <v-subheader
                  class="display-2
      font-weight-bold white--text"
                  mr-5
                  >Create new playlist</v-subheader
                >
              </v-row>
            </v-container>
            <v-card>
              <v-card-title>
                <span class="title">Playlist Name</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="New Playlist"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions> </v-card-actions>
            </v-card>
            <v-container>
              <v-row align="center" justify="center">
                <v-btn
                  rounded
                  depressed
                  outlined
                  class="mx-4"
                  @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  rounded
                  depressed
                  color="success white--text"
                  class="mx-4"
                  @click="dialog = false"
                  >Create</v-btn
                >
              </v-row>
            </v-container>
          </v-dialog>

          <v-list-item route to="/home/library/tracks">
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2"
                >Liked Songs</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list-item
          v-for="playlist in playlists.items"
          :key="playlist.id"
          dense
          route
          :to="'/home/playlist/' + playlist.id"
        >
          <v-list-item-content>
            <v-list-item-title class="subtitle-2">{{
              playlist.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-container>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Jsonplaylists from '../json/Get-Current-User-Playlists.json';

export default {
  name: 'Navbar',
  data() {
    return {
      drawer: true,
      links: [
        { icon: 'mdi-home', text: 'Home', route: '/home' },
        { icon: 'mdi-magnify', text: 'Search', route: '/home/search' },
        { icon: 'mdi-bookshelf', text: 'Your Library', route: '/home/library' },
      ],
      playlists: Jsonplaylists,
      dialog: false,
    };
  },
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
