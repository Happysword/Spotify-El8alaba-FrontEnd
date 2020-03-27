<template>
  <v-app-bar color="#0C0C0C00" flat dense dark app height="60">
    <v-container>
      <v-row>
        <v-btn color="#04040470" small fab class="mx-2" @click="changeRoute(-1)">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn color="#04040470" small fab class="mx-2" @click="changeRoute(1)">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <v-text-field
          prepend-inner-icon="mdi-magnify"
          rounded
          background-color="white"
          height="30"
          class="searchbar-pos"
          light
          v-show="$store.state.searching"
          v-model="$store.state.InputSearch"
          v-on:input="searching()"
        >
        </v-text-field>

        <v-spacer></v-spacer>

        <v-btn
          rounded
          outlined
          class="mx-4"
          route
          to="/premium"
          id="upgrade-btn"
          >Upgrade</v-btn
        >

        <div class="text-center" id="user-btn">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                rounded
                depressed
                color="#27272797"
                v-on="on"
                class=" text-user text-none ml-0"
                small
                id="inner-user-btn"
                ><v-avatar size="25" class="mr-1 ml-0"
                  ><v-img :src="UserInfo.photo"></v-img
                ></v-avatar>
                <!--TODO[@Seif] fix the data for the user -->
                <div>
                  {{ $store.state.currentUser.username }}
                </div>
                <v-avatar size="20" class="mx-1">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-avatar>
              </v-btn>
            </template>

            <v-list dense color="grey darken-4" dark>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :to="item.route"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Topbar',
  data: () => ({
    input: '',
    UserInfo: {
      name: 'John Doe',
      photo:
        'https://images.pexels.com/photos/2444429/pexels-photo-2444429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    items: [
      {
        title: 'Account',
        route: '/account',
      },
      {
        title: 'Log Out',
        route: '/logout',
      },
    ],
  }),
  methods: {
    changeRoute(direction) {
      this.$router.go(direction);
    },
    searching() {
      this.input = this.$store.state.InputSearch;
      this.$router.push(`/home/search/${this.input}`);
    },
  },
};
</script>

<style scoped>
.text-user {
  color: white;
  font-weight: bold;
  float: right;
}
.searchbar-pos {
  position: fixed;
  margin-left: 120px;
  width: 400px;
}
#upgrade-btn {
  border: 2px solid white;
  font-size: 12px;
  width: 12%;
  float: right;
}
#upgrade-btn:hover {
  background-color: rgba(43, 43, 43, 0.329);
}
#user-btn {
  display: flex;
  align-items: center;
}
#inner-user-btn {
  padding: 5px 3px 5px 3px;
  height: 90%;
}
.div {
  font-family: spotify-circular, spotify-circular-cyrillic,
    spotify-circular-arabic, spotify-circular-hebrew, Helvetica Neue, Helvetica,
    Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif;
}
</style>
