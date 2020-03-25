<template>
<v-app>
<v-content>
  <v-container id="LogIn_root" class="py-0">
    <!-- Main row -->
    <v-row justify="center" align="center">
      <v-col sm="8" lg="6" xl="4" class="px-8">
        <!-- Logo -->
        <a><v-img
          id="logo"
          src="../../assets/imgs/El-8alaba.png"
          contain
          height="140"
          @click="$router.push('/')"
        /></a>

        <v-col>
          <v-btn
            id="googleSignInBtn"
            color="secondary"
            rounded
            block
            x-large
            @click="googleSignIn"
            >Sign in using Google
          </v-btn>
        </v-col>

        <v-row>
          <v-col>
            <v-divider class="my-3 mb-6"/>
          </v-col>
          <v-col cols="1">
            <p class="text-center font-weight-bold title"
              >OR
            </p>
          </v-col>
          <v-col>
            <v-divider class="my-3 mb-6"/>
          </v-col>
        </v-row>

        <!-- Incorrect password bar -->
        <p
          id="errorBar"
          class="caption red darken-1 white--text text-center py-3 mb-8"
          v-if="userInput.incorrect"
          >Incorrect email or password.
        </p>

        <!-- Form -->
        <v-form ref="loginForm">
          <!-- Email -->
          <v-text-field
            id="emailField"
            color="#1DB954"
            outlined
            placeholder="Email address"
            v-model="userInput.email"
            :rules="[
              validation.required('Email'),
              validation.minLength('Email', 3),
              validation.validEmail(),
            ]"
          />

          <!-- Password -->
          <!-- Minimum password length is 8 -->
          <v-text-field
            id="passwordField"
            color="#1DB954"
            outlined
            placeholder="Password"
            v-model="userInput.password"
            :rules="[
              validation.required('Password'),
              validation.minLength('Password', 8),
            ]"
            :type="userInput.showPassword ? 'text' : 'password'"
            :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="userInput.showPassword = !userInput.showPassword"
          />

          <v-row>
            <!-- 'Remember me' checkbox -->
            <v-col>
              <v-checkbox
                id="rememberCheck"
                color="#1DB954"
                class="mt-0"
                label="Remember me"
                v-model="userInput.rememberMe"
              />
            </v-col>
            <v-spacer/>
            <!-- 'Submit' button -->
            <v-col cols="12" sm="5">
              <v-btn
                id="loginBtn"
                color="#1DB954"
                rounded
                dark
                block
                @click="submit"
                >Log In
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- 'Forgot your password' link -->
        <v-container class="text-center">
          <!-- @todo[XL3] Replace 'font-weight-bold' with a lightening of color -->
          <a
            id="forgotPasswordPrompt"
            :class="userInput.onForgot ? 'font-weight-bold' : ''"
            @mouseover="userInput.onForgot = true"
            @mouseleave="userInput.onForgot = false"
            @click="$router.push('/password-reset')"
            >Forgot your password?
          </a>
        </v-container>

        <v-divider class="my-3"/>
        <p class="title text-center font-weight-bold">
          Don't have an account?
        </p>
        <!-- 'Signup' button -->
        <!-- @todo[XL3] Replace 'route to' with a method -->
        <v-btn
          id="signupBtn"
          color="secondary"
          rounded
          outlined
          block
          large
          route
          to="/signup"
          >Sign Up
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-content>
</v-app>
</template>

<script>
import validation from '@/store/modules/auth/validation';
import api from 'api-client';

export default {
  name: 'LogIn',
  created() {
    document.title = 'Log in - Spotify El8alaba';
  },

  mounted() {
    // Import the Google Platform Library
    const googlePlatformLibrary = document.createElement('script');
    googlePlatformLibrary.src = 'https://apis.google.com/js/platform.js';
    /* eslint-disable */
    googlePlatformLibrary.onload = () => gapi.load('auth2', () => gapi.auth2.init());
    /* eslint-enable */
    document.head.appendChild(googlePlatformLibrary);

    // Add the Client ID meta tag
    const loginClientID = document.createElement('meta');
    loginClientID.name = 'google-signin-client_id';
    loginClientID.content = `${process.env.VUE_APP_GOOGLE_SIGNIN_CLIENT_ID}`;
    document.head.appendChild(loginClientID);
  },

  data() {
    return {
      userInput: {
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false,
        onForgot: false,
        incorrect: false,
      },
      validation,
    };
  },

  methods: {
    /**
     * Authenticates the user and re-routes them to Home
     */
    async submit() {
      // Validate the form
      if (!this.$refs.loginForm.validate()) return;

      // Send the request
      const response = await api.loginUser({
        email: this.userInput.email,
        password: this.userInput.password,
      });

      /**
       * If the request was successful,
       * add the currentUser to localStorage
       * and route to home
       */
      // 200 OK
      if (response.status === 200) {
        const currentUser = {
          token: response.data.token,
          data: response.data.data.user,
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        this.$router.push('/home');
      } else {
        this.userInput.incorrect = true;
      }
    },

    async googleSignIn() {
      /* eslint-disable */
      const auth2 = gapi.auth2.getAuthInstance();
      /* eslint-enable */
      const googleUser = await auth2.signIn();

      console.log(googleUser.getBasicProfile());
    },
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none;
  color: #1db954 !important;
}
</style>
