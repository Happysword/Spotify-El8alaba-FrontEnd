<template>
<v-app>
<v-content>
  <v-container id="LogIn_root" class="py-0">
    <!-- Main row -->
    <v-row justify="center" align="center">
      <v-col sm="8" lg="6" xl="4" class="px-8">
        <!-- Logo -->
        <router-link to="/">
          <v-img
            id="logo"
            src="../../assets/imgs/El-8alaba.png"
            contain
            height="140">
          </v-img>
        </router-link>

        <v-col class="text-center">
          <v-btn id="fbLoginBtn"
                 color="#1877F2"
                 rounded
                 x-large
                 dark
                 @click="fbLogin">
            <v-img
              src="../../assets/imgs/fb-logo.png"
              class="mr-4 mt-n1 ml-n4"
              contain
              max-height="38"
              max-width="38">
            </v-img>
            Log in with Facebook
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
          <router-link to="/password-reset">
            <span id="forgotPasswordPrompt" class="link">
              Forgot your password?
            </span>
          </router-link>
        </v-container>

        <v-divider class="my-3"/>
        <p class="title text-center font-weight-bold">
          Don't have an account?
        </p>
        <!-- 'Signup' button -->
        <v-btn id="signupBtn"
               color="secondary"
               rounded outlined block large
               to="/signup">
          Sign Up
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-content>
</v-app>
</template>

<script>
import validation from '@/store/modules/auth/validation';
import cookies from '@/store/modules/auth/cookies';
import api from 'api-client';
import apiURL from '../../common/config';

/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 * @todo[XL3] Change processing of currentUser from localStorage to cookies
 * to leverage the 'expiration' property
 */
export default {
  name: 'LogIn',
  created() {
    document.title = 'Log in - Spotify El8alaba';
  },

  // Re-route to home if a user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      // Find the loggedIn cookie
      const loggedIn = document.cookie.search(/loggedIn=.+/) !== -1;

      if (loggedIn) {
        next('/home');
      } else {
        // Remove the current user
        // Remove the loggedIn cookie
        // Continue
        cookies.clearData(['currentUser'], ['loggedIn']);
        next();
      }
    });
  },

  mounted() {
  },

  data() {
    return {
      userInput: {
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false,
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

      // If the request was successful,
      // add the currentUser to localStorage
      // and route to home
      // 200 OK
      if (response.status === 200) {
        const currentUser = {
          token: response.data.token,
          data: response.data.data.user,
        };
        if (currentUser.data.userInfo) {
          Object.keys(currentUser.data.userInfo).forEach((key) => {
            currentUser.data[key] = currentUser.data.userInfo[key];
          });
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // If the user didn't opt to be remembered
        // Set the expiration date of the cookie to session
        if (!this.userInput.rememberMe) {
          cookies.setCookiesToSession(['loggedIn']);
        }

        this.$router.push('/home');
      } else {
        this.userInput.incorrect = true;
      }
    },

    // @todo[XL3] Integrate with the backend
    fbLogin() {
      window.open(`${apiURL}/api/v1/authentication/facebook`, '_self');
    },
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none !important;
}

.link {
  text-decoration: none !important;
  color: #1db954 !important;
}

.link:hover {
  color: #2bdb69 !important;
}
</style>
