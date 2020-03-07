<template>
  <v-app-bar color="#0C0C0C" dense dark app>
    <v-btn color="#040404" small fab class="mx-2" flat>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn color="#040404" small fab class="mx-2" flat>
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn rounded depressed large outlined class="mx-2" route to="/premium"
      >Upgrade</v-btn
    >

    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            rounded
            depressed
            color="grey darken-4"
            v-on="on"
            class="mx-4 text-user"
            ><v-avatar size="35"
              ><v-img :src="UserInfo.photo"></v-img
            ></v-avatar>
            <div>
              {{ UserInfo.name }}
            </div>
            <v-avatar size="20">
              <v-icon>mdi-chevron-down</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Topbar',
  data: () => ({
    UserInfo: {
      name: 'Seif ElSaeed',
      photo:
        'https://images.pexels.com/photos/2444429/pexels-photo-2444429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    items: [
      {
        title: 'Account',
      },
      {
        title: 'Log Out',
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
</style>
