<template>
    <v-card
                            class="mx-auto"
                            max-width="185"
                            dark=""
                            @mouseover="showActionButton = true"
                            @mouseleave="showActionButton = false"
                            height="285"
                            @click="CardClickLink()"
                        >
                          <v-container fluid="">
                              <v-img
                              :src="images[0].url"
                              height="150px"
                              ></v-img>
                          </v-container>
                            <v-card-title class="font-weight-bold subtitle-2">
                            {{name}}
                            </v-card-title>

                            <v-card-subtitle class="caption" v-if="!showActionButton">
                            {{description}}
                            </v-card-subtitle>

                            <v-card-actions>

                            <v-spacer></v-spacer>

                            <v-btn fab="" small=""  color="#1ED760"
                            v-if="showActionButton"
                            @mousedown.stop="" @click.stop="showPlayButton = !showPlayButton">
                                <v-icon color="white" v-show="showPlayButton">mdi-play</v-icon>
                                <v-icon color="white" v-show="!showPlayButton">mdi-pause</v-icon>
                            </v-btn>

                            </v-card-actions>

                        </v-card>
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
  },
  data() {
    return {
      showActionButton: false,
      showPlayButton: true,
    };
  },
  methods: {
    CardClickLink() {
      // window.location.href = 'https://i.scdn.co/image/ab67706f000000022b29b4a26e620ccd2bd2d2f8';
      this.$router.push(`/playlist/${this.id}`);
    },
  },
};
</script>
