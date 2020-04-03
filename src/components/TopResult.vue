<template>
    <v-card
      class="mx-auto"
      max-width="450"
      dark=""
      @mouseover="showActionButton = true"
      @mouseleave="showActionButton = false"
      height="250"
      @click="CardClickLink()"
       >
      <v-container fluid="">
        <v-img
        :src=image
        height="100px"
        width="100px"
        v-if="type === 'artist'"
        class="artistImage"></v-img>
        <v-img
        :src=image
        height="100px"
        max-width="100px"
        v-if="type != 'artist'&& image!=''"
        class="mt-2 ml-2 contain"></v-img>
        <v-icon v-if="type=='profile'&& image==''"
        size="100" class="Picon" dark>mdi-account</v-icon>
      </v-container>
      <v-card-title class="font-weight-bold d-inline-block na">
          {{name}}
      </v-card-title>
        <template v-if="type != 'profile'">
          <v-card-subtitle class="white--text">
            <span v-if="type=='playlist'">by </span>
            <span class="name"
              @click="artistLink()"
              v-if="type != 'artist' && type !='playlist'">{{ artistName }}</span>
            <span class="name" @click="artistLink()"
              v-if="type=='playlist'">{{ owner }}</span>
            <span class="TYPE">{{ type }}</span>
          </v-card-subtitle>
        </template>

        <template v-if="type == 'profile'">
          <v-card-subtitle class="white--text">
            <span class="TYPE">{{ type }}</span>
          </v-card-subtitle>
        </template>

        <v-card-actions v-if="showActionButton && type != 'profile'">
          <v-spacer></v-spacer>
          <v-btn fab big color="#1ED760" id="btn"
            v-if="showActionButton && type != 'profile'"
            @mousedown.stop="" @click.stop="showPlayButton = !showPlayButton">
              <v-icon color="white" id="play" v-if="showPlayButton">mdi-play</v-icon>
              <v-icon color="white" id="pause" v-if="!showPlayButton">mdi-pause</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: {
    id: String,
    image: String,
    name: String,
    track: Object,
    type: String, // it may be artist , track , playlist , album or a profile
    artistName: String,
    owner: String,
  },
  data() {
    return {
      showActionButton: false,
      showPlayButton: true,
    };
  },
  methods: {
    CardClickLink() {
      if (this.type === 'playlist') {
        this.$router.push(`/home/playlist/${this.id}`);
      } else if (this.type === 'track') {
        this.$router.push(`/home/track/${this.id}`);
      } else if (this.type === 'artist') {
        this.$router.push(`/home/artist/${this.id}`);
      } else if (this.type === 'profile') {
        this.$router.push(`/home/profile/${this.id}`);
      } else if (this.type === 'album') {
        this.$router.push(`/home/album/${this.id}`);
      }
    },
    artistLink() {
      if (this.artistName === 'Spotify' || this.owner === 'Spotify') {
        this.$router.push('/home');
      } else {
        this.$router.push(`/home/artist/${this.artistName}`);
      }
    },
  },
};
</script>


<style scoped>


.artistImage{
        transform: translate(20% , 10%);
        border-radius: 50%;
        height:100%;
        width:100%;
        size: 10px;
        object-fit: center;
        object-position: center center;
    }
#btn{
        transform: translate(-40% , -110%);
    }
.TYPE{
      background-color: #101010;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 3px;
      padding-bottom: 3px;
      border-radius: 20px;
    }
.name{
      margin-right: 6px;
    }
.name:hover{
      text-decoration-line: underline;
    }
.Picon{
  transform: translate(10%,10%);
}
</style>
