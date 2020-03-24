<template>
<v-app>
<v-content class="black">
  <!-- Main app bar -->
  <v-app-bar color="black" class="trans-bar">
    <router-link to="/">
      <v-img src="../../assets/imgs/El-8alaba.png"
             max-height="200"
             max-width="200"
      />
    </router-link>
    <v-spacer/>
    <ul>
      <v-btn v-for="button in buttons"
             :key="button"
             class="btn-green text-none d-none d-sm-table-cell"
             type="li"
             left
             text
             large
             :to="button.route">
        {{ button.name }}
      </v-btn>
    </ul>
  </v-app-bar>

  <!-- Root container -->
  <v-container id="Account_root">
    <v-row justify="center" align="center" class="pt-12">
      <v-col lg="8" class="px-0">
        <!-- Tab layout -->
        <v-tabs v-model="currentTab"
                dark
                color="#1DB954"
                vertical
                :prev-icon="'mdi-arrow-left-bold-box-outline'"
                :next-icon="'mdi-arrow-right-bold-box-outline'">
          <v-tabs-slider/>

          <v-tab  v-for="(tab, i) in tabs"
                  :key="i"
                  @click="$router.push(tab.link)">
            <!-- Display only on md+ -->
            <v-icon class="mr-3 d-none d-md-flex">{{ tab.icon }}</v-icon>
            {{ tab.title }}
            <v-spacer/>
          </v-tab>

          <v-tab-item v-for="(tab, i) in tabs" :key="i">
            <v-card class="pa-4" flat tile>
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
export default {
  name: 'Account',

  data: () => ({
    buttons: [
      { name: 'DOWNLOAD', route: '/download' },
      { name: 'PREMIUM', route: '/premium' },
    ],
    currentTab: 0,
    tabs: [
      { title: 'Account overview', icon: 'mdi-home', link: 'overview' },
      { title: 'Edit profile', icon: 'mdi-pencil', link: 'edit-profile' },
      { title: 'Change password', icon: 'mdi-lock', link: 'change-password' },
      { title: 'Notification settings', icon: 'mdi-bell', link: 'notifications' },
    ],
  }),
};
</script>

<style lang="css" scoped>
.trans-bar {
  position: fixed;
}
.btn-green {
  color: #ffffff;
}
.btn-green:hover {
  color: #20d15e;
}
</style>
