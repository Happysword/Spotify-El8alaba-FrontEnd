<template>
  <v-container>
    <v-row class="pa-0">
      <v-col cols="3" class="mt-12 mb-12 pa-0">
        <v-row>
          <div class="display-1 mt-5 grey--text text--darken-1">
            How can we help you?
          </div>
        </v-row>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-row>
          <v-btn
            text
            class="font-weight-light black--text headline text-none mt-5 mb-10 pa-0"
            to="/help/player"
            >Player Features</v-btn
          >
        </v-row>

        <v-row>
          <v-btn
            text
            class="font-weight-light black--text headline text-none mb-10 pa-0"
            to="/help/profile"
            >Edit Profile</v-btn
          >
        </v-row>
        <v-row>
          <v-btn
            text
            class="font-weight-light black--text headline text-none mb-10 pa-0"
            to="/help/website"
            >Website Features</v-btn
          >
        </v-row>

        <v-row>
          <v-btn
            text
            class="font-weight-light black--text headline text-none mb-10 pa-0"
            to="/help/password"
            >Password Reset</v-btn
          >
        </v-row>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="8" class="mt-10 mb-12 ml-10">
        <div class="display-2 font-weight-black mb-12">
          Edit your Profile
        </div>
        <ol class="font-weight-medium body-1 ml-5 mt-5">
          <li>
            Go to
            <router-link
              to="/account/edit-profile"
              style="text-decoration : none"
              >Edit Profile</router-link
            >.
          </li>
          <li>
            Change the Information that you want. (The Others would remain
            unchanged)
          </li>
          <li>Click on Save Profile.</li>
        </ol>
        <v-row align="center" justify="center" class="mb-12">
          <v-img
            class="mt-5"
            max-height="400"
            max-width="400"
            src="../../assets/imgs/Help/editprofile.png"
          ></v-img>
        </v-row>

        <div class="display-2 font-weight-black mb-12">
          Change your Password
        </div>
        <ol class="font-weight-medium body-1 ml-5 mt-5">
          <li>
            Go to
            <router-link
              to="/account/change-password"
              style="text-decoration : none"
              >Change Password</router-link
            >.
          </li>
          <li>
            Type in your current password. If you forgot your password go to
            <router-link
              to="/help/password"
              style="text-decoration : none"
              >Forgot Password</router-link
            >.
          </li>
          <li>Type your new password.</li>
          <li>ReType your new password for Confirmation.</li>
          <li>Click on Set New Password</li>
        </ol>
        <v-row align="center" justify="center">
          <v-img
            class="mt-5"
            max-height="400"
            max-width="400"
            src="../../assets/imgs/Help/changepassword.png"
          ></v-img>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
