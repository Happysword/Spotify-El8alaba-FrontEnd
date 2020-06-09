<template>
  <v-app>
    <v-content class="grey lighten-4 pa-0 pa-sm-8">
      <!-- Root Container -->
      <v-container id="Notification Settings_root">
        <p id="title" class="spotify-green headline pt-6 pl-3 mb-12 d-none d-sm-flex">
          Notification settings
        </p>

        <v-card flat id="formCard" class="pa-4 pb-8 pa-sm-12">
          <!-- Header row -->
          <v-row id="infoBar">
            <v-col cols="6">
              <p class="title font-weight-bold">
                Your Music
              </p>
            </v-col>
          </v-row>
          <!-- Settings -->
          <v-col v-if="loaded">
            <template v-for="(setting, key, i) in settings">
              <v-row
                :key="`row-${i}`"
                :class="$vuetify.breakpoint.mdAndUp ? (i % 2 ? 'pa-4' : 'pa-4 grey lighten-4') : ''"
              >
                <!-- Information -->
                <v-col cols="6" :id="`${key}Text`" class="pa-0 ma-0 mt-4 mb-n3">
                  <p class="subtitle-1 mb-0">
                    {{ setting.title }}
                  </p>
                  <p class="d-none d-md-flex grey--text caption">
                    {{ setting.description }}
                  </p>
                </v-col>
                <v-spacer />
                <!-- Checkbox -->
                <v-col cols="2">
                  <v-checkbox
                    :id="`${key}Push`"
                    color="#1DB954"
                    class="checkbox-centered"
                    v-model="setting.checked"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>
              <hr class="lower-opacity mx-n4 mt-n2 d-flex d-md-none" :key="`hr-${i}`" />
            </template>
            <!-- Buttons -->
            <v-row justify="end" class="pt-8 mb-n8">
              <p v-if="submitted" class="spotify-green font-weight-bold mt-2 mb-n2 pr-6">
                Saved successfully!
              </p>
              <router-link to="/account/overview">
                <v-btn id="cancelBtn" class="mr-4" text rounded>
                  Cancel
                </v-btn>
              </router-link>
              <v-btn id="saveBtn" class="mr-4" color="#1DB954" rounded dark @click="submit">
                Save
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import api from 'api-client';
/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  name: 'NotificationSettings',
  async created() {
    const response = await api.fetchNotificationSettings();
    if (response.status === 200) {
      const status = response.data;
      Object.keys(this.settings).forEach((setting) => {
        this.settings[setting].checked = status[setting] === 1;
      });
    }
    this.loaded = true;
  },
  data: () => ({
    submitted: false,
    loaded: false,
    settings: {
      userFollowed: {
        title: 'Profile Follows',
        description: 'Receive a notification when a user follows you',
        checked: true,
      },
      playlistFollowed: {
        title: 'Playlist Follows',
        description: 'Receive a notification when someone follows your playlist',
        checked: true,
      },
      newArtistTrack: {
        title: 'New Tracks',
        description: 'Receive a notification when a followed artist posts a track',
        checked: true,
      },
      newArtistAlbum: {
        title: 'New Albums',
        description: 'Receive a notification when a followed artist posts an album',
        checked: true,
      },
    },
  }),
  methods: {
    async submit() {
      const notif = {};
      Object.keys(this.settings).forEach((setting) => {
        notif[setting] = this.settings[setting].checked ? 1 : 0;
      });
      const response = await api.setNotificationSettings(notif);
      // 200 OK
      if (response.status !== 200) {
        alert('Error setting notification settings...');
        console.log(response.data.message);
      } else {
        this.submitted = true;
        setTimeout(() => {
          this.submitted = false;
        }, 3000);
      }
    },
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none !important;
}

.checkbox-centered {
  margin: auto !important;
  left: 50%;
  position: relative;
}
.smaller-text {
  font-size: 13px !important;
}

.low-opacity {
  opacity: 0.7 !important ;
}

.lower-opacity {
  opacity: 0.4 !important;
}

.spotify-green {
  color: #1db954 !important;
}
</style>
