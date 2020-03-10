<template>
  <v-app-bar color="#0C0C0C" dense dark app height="60">
    <v-container>
      <v-row>
        <v-btn color="#040404" small fab class="mx-2">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn color="#040404" small fab class="mx-2">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn
          rounded
          depressed
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
                color="#272727"
                v-on="on"
                class=" text-user text-none ml-0"
                small
                id="inner-user-btn"
                ><v-avatar size="25" class="mr-1 ml-0"
                  ><v-img :src="UserInfo.photo"></v-img
                ></v-avatar>
                <div>
                  {{ UserInfo.name }}
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
};
</script>

<style scoped>
.text-user {
  color: white;
  font-weight: bold;
  float: right;
}
#upgrade-btn {
  border: 2px solid white;
  font-size: 12px;
  background-color: black;
  width: 12%;
  float: right;
}
#upgrade-btn:hover {
  background-color: rgba(48, 46, 46, 0.329);
}
#user-btn {
  display: flex;
  align-items: center;
}
#inner-user-btn {
  padding: 3px;
}
.div {
  font-family: spotify-circular, spotify-circular-cyrillic,
    spotify-circular-arabic, spotify-circular-hebrew, Helvetica Neue, Helvetica,
    Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif;
}
</style>
