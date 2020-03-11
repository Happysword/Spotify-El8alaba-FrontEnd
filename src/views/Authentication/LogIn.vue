<template>
  <v-app>
    <v-content>
      <v-container class="LogIn_root py-0">
        <!-- Main row -->
        <v-row justify="center" align="center">
          <v-col sm="8" lg="6" xl="4" class="px-8">
            <!-- Logo -->
            <v-img src="../../assets/imgs/El-8alaba.png" contain height="140" />

            <!-- Incorrect password bar -->
            <p
              class="caption red darken-1 white--text text-center py-3 mb-8"
              v-if="userInput.incorrect"
            >
              Incorrect username or password.
            </p>

            <v-form ref="loginForm">
              <!-- Username -->
              <!-- Minimum username length is 3 -->
              <v-text-field
                color="#1DB954"
                clearable
                outlined
                placeholder="Email address or username"
                v-model="userInput.username"
                :rules="[
                  validation.required('Username'),
                  validation.noSpecialCharacters('Username'),
                  validation.minLength('Username', 3),
                ]"
              />

              <!-- Password -->
              <!-- Minimum password length is 8 -->
              <v-text-field
                color="#1DB954"
                clearable
                outlined
                placeholder="Password"
                v-model="userInput.password"
                :rules="[
                  validation.required('Password'),
                  validation.minLength('Password', 8),
                ]"
                :type="userInput.showPassword ? 'text' : 'password'"
                :append-icon="
                  userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
                @click:append="userInput.showPassword = !userInput.showPassword"
              />

              <v-row>
                <!-- 'Remember me' checkbox -->
                <v-checkbox
                  color="#1DB954"
                  class="mt-0"
                  label="Remember me"
                  v-model="userInput.rememberMe"
                />
                <v-spacer />
                <!-- 'Submit' button -->
                <v-btn
                  color="#1DB954"
                  class="d-none d-sm-flex"
                  rounded
                  dark
                  min-width="160px"
                  @click="submit"
                  >Log In</v-btn
                >
              </v-row>

              <!-- Show only on xs -->
              <v-btn
                color="#1DB954"
                class="mb-3 d-flex d-sm-none"
                rounded
                dark
                block
                @click="submit"
                >Log In</v-btn
              >
            </v-form>

            <!-- 'Forgot your password' link -->
            <v-container class="text-center">
              <!-- TODO[@XL3]: Replace 'font-weight-bold' with a lightening of color -->
              <a
                :class="userInput.onForgot ? 'font-weight-bold' : ''"
                @mouseover="userInput.onForgot = true"
                @mouseleave="userInput.onForgot = false"
                >Forgot your password?</a
              >
            </v-container>
            <v-divider class="my-3" />

            <p class="title text-center font-weight-bold">
              Don't have an account?
            </p>
            <!-- 'Signup' button -->
            <!-- TODO[@XL3]: Replace 'route to' with a method -->
            <v-btn
              color="secondary"
              rounded
              outlined
              block
              large
              route
              to="/signup"
              >Sign Up</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import validation from '@/store/modules/LogIn/validation';
import authentication from '@/store/modules/LogIn/authentication';
import { mapMutations } from 'vuex';

export default {
  name: 'LogIn',

  data() {
    return {
      userInput: {
        username: '',
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
    ...mapMutations(['setCurrentUser']),

    /**
     * Authenticates the user and re-routes them to Home
     */
    async submit() {
      // Validate the form
      if (!this.$refs.loginForm.validate()) return;

      // Locate the user
      const user = await authentication.authenticateUser(
        this.userInput.username,
        this.userInput.password,
      );

      // If the user's found, redirect to home
      // TODO[@XL3]: Keep an authorization token
      if (user.found) {
        this.setCurrentUser(user.data);
        this.$router.push('/home');
      } else {
        this.userInput.incorrect = true;
      }
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
