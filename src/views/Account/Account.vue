<template>
<v-app>
<v-content class="wrap cover">
  <!-- Main app bar -->
  <v-app-bar color="black" class="trans-bar">
    <router-link to="/">
      <v-img id="logo"
             src="../../assets/imgs/El-8alaba.png"
             class="mt-4"
             contain
             max-height="200"
             max-width="200">
      </v-img>
    </router-link>
    <v-spacer/>
    <ul>
      <v-btn v-for="(button, i) in buttons" :key="i"
             :id="`${button.name}Btn`"
             class="btn-green text-none d-none d-sm-table-cell"
             type="li"
             left
             text
             large
             :to="button.route">
        <span class="text-uppercase">{{ button.name }}</span>
      </v-btn>
    </ul>
  </v-app-bar>

  <!-- Root container -->
  <v-container id="Account_root">
    <v-row justify="center" align="center" class="mt-n6">
      <v-col lg="10" xl="8" class="px-0">
        <!-- Tab layout -->
        <!-- Vertical on medium and higher breakpoints -->
        <v-tabs id="tabs"
                v-model="currentTab"
                dark
                color="#1DB954"
                :vertical="$vuetify.breakpoint.mdAndUp"
                show-arrows>
          <!-- Avatar -->
          <v-img id="avatar"
                 :src="image"
                 class="my-4 rounded-img d-none d-md-flex"
                 contain
                 max-height="64"
                 max-width="64">
          </v-img>

          <!-- Route each tab to its respective path -->
          <!-- For example: change-password-tab -->
          <v-tab v-for="(tab, i) in tabs" :key="i"
                 :id="`${tab.link}-tab`"
                 @click="$router.push(tab.link)">
            <!-- Display only on md+ -->
            <v-icon class="mr-3 d-none d-md-flex">
              {{ tab.icon }}
            </v-icon>

            {{ tab.title }}
            <v-spacer/>
          </v-tab>

          <!-- Route content -->
          <v-tab-item v-for="(tab, i) in tabs" :key="i">
            <v-card class="pa-4" flat tile id="tab-content">
              <router-view/>
            </v-card>
          </v-tab-item>

        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</v-content>
</v-app>
</template>

<script>
import avatar from '../../assets/imgs/avatar.png';

export default {
  name: 'Account',
  // Re-route to login if no user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        next('/login');
      } else {
        next();
      }
    });
  },

  created() {
    // Set the chosen tab to the current route
    const route = this.$route.name;

    this.tabs.some((t) => {
      this.currentTab += 1;
      return t.title.replace(' ', '') === route;
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const { image } = currentUser.data.userInfo;
    if (image) {
      this.image = image;
    }
  },

  data: () => ({
    image: avatar,
    buttons: [
      { name: 'home', route: '/home' },
      { name: 'download', route: '/download' },
      { name: 'premium', route: '/premium' },
    ],
    currentTab: -1,
    tabs: [
      { title: 'Account Overview', icon: 'mdi-home', link: 'overview' },
      { title: 'Edit Profile', icon: 'mdi-pencil', link: 'edit-profile' },
      { title: 'Change Password', icon: 'mdi-lock', link: 'change-password' },
      { title: 'Notification Settings', icon: 'mdi-bell', link: 'notifications' },
    ],
  }),
};
</script>

<style lang="css" scoped>
.rounded-img {
  margin: auto !important;
  border-radius: 50% !important;
}
.trans-bar {
  position: static;
}
.btn-green {
  color: #ffffff;
}
.btn-green:hover {
  color: #20d15e;
}
.wrap {
  background: linear-gradient(#1f2538, #070d24);
}
.cover {
  width: 100%;
  height: 100%;
}
</style>
