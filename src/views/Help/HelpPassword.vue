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
          Reset your Password
        </div>
        <div class="headline font-weight-light">
          An elephant never forgets. For everyone else there's password reset.
        </div>
        <ol class="font-weight-medium body-1 ml-5 mt-5">
          <li>
            Go to
            <router-link to="/password-reset" style="text-decoration : none"
              >password reset</router-link
            >.
          </li>
          <li>Enter your email address and click SEND.</li>
          <li>
            Go to your email inbox and find an email from us <br />
            Tip: If you don’t see it, check your junk/spam folders or any other
            filtered folders (e.g. If you use Gmail, it might be in the Social
            or Promotions tabs).
          </li>
          <li>
            Click the Reset password link in the email. A new web page will
            open. Type your new password in both fields and click SEND.
          </li>
          <li>
            Go back to the app and log in with the email address you used to
            reset your password and the new password.
          </li>
        </ol>
        <v-row align="center" justify="center">
          <v-img
            max-height="400"
            max-width="400"
            src="../../assets/imgs/Help/forgotpass.png"
          ></v-img>
        </v-row> </v-col
    ></v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
