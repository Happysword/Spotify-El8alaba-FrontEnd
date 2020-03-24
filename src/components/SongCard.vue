<template>
  <v-menu offset-y absolute=""
  dark=""
  >
    <template v-slot:activator="{ on }">
        <v-card
          class="mx-auto"
          max-width="185"
          dark
          @mouseover="showActionButton = true"
          @mouseleave="showActionButton = false"
          height="285"
          @click="CardClickLink()"
          @contextmenu.prevent="on.click"
        >
          <v-container fluid v-show="images != []">
            <v-img :src="images[0].url" height="150px"></v-img>
          </v-container>
          <v-card-title class="font-weight-bold subtitle-2">{{name}}</v-card-title>

          <v-card-subtitle class="caption text-truncate"
          v-if="!showActionButton && type === 'playlist'">
            {{description}}
          </v-card-subtitle>

          <v-card-subtitle class="caption" v-if="!showActionButton && type === 'album'">
            {{artistName}}
          </v-card-subtitle>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              fab
              small
              color="#1ED760"
              v-if="showActionButton"
              @mousedown.stop
              @click.stop="showPlayButton = !showPlayButton"
            >
              <v-icon color="white" v-show="showPlayButton">mdi-play</v-icon>
              <v-icon color="white" v-show="!showPlayButton">mdi-pause</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title class="grey--text">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
  props: {
    description: String,
    href: String,
    id: String,
    images: Array,
    name: String,
    public: Boolean,
    tracks: Object,
    type: String,
    artistName: String,
  },
  data() {
    return {
      showActionButton: false,
      showPlayButton: true,
      items: [
        { title: 'Start Radio' },
        { title: 'Save to Your Library' },
        { title: 'Copy link' },
      ],
    };
  },
  methods: {
    /** When a card is clicked it go to route of playlist or album depending on its type */
    CardClickLink() {
      if (this.type === 'playlist') {
        this.$router.push(`/playlist/${this.id}`);
      } else if (this.type === 'album') {
        this.$router.push(`/album/${this.id}`);
      }
    },
  },
};
</script>
