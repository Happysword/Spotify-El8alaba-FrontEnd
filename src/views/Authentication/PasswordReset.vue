<template>
  <v-app>
    <v-content>
      <v-container id="PasswordReset_root" class="py-0">
        <v-row justify="center" align="center">
          <v-col sm="8" lg="6" xl="4" class="px-8">
            <!-- Logo -->
            <router-link to="/">
              <v-img id="logo" src="../../assets/imgs/El-8alaba.png" contain height="140"> </v-img>
            </router-link>

            <p class="mb-12 text-center font-weight-bold display-1">
              Password Reset
            </p>
            <!-- Error bar -->
            <p
              id="errorBar"
              class="caption red darken-1 white--text text-center py-3 mb-8"
              v-if="!!userInput.incorrect"
            >
              {{ userInput.incorrect }}
            </p>

            <!-- If the route contains a reset token -->
            <template v-if="!!resetToken">
              <v-form ref="passwordResetForm">
                <!-- Password -->
                <!-- Minimum password length is 8 -->
                <v-text-field
                  id="passwordField"
                  color="#1DB954"
                  outlined
                  label="New Password"
                  v-model="userInput.password"
                  :rules="[validation.required('Password'), validation.minLength('Password', 8)]"
                  :type="userInput.showPassword ? 'text' : 'password'"
                  :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="userInput.showPassword = !userInput.showPassword"
                />
                <v-text-field
                  id="confirmPasswordField"
                  color="#1DB954"
                  outlined
                  label="Retype New Password"
                  ref="confirmPassword"
                  v-model="userInput.confirmPassword"
                  :rules="[
                    (data) => (!!data && data === userInput.password) || 'Password doesn\'t match',
                  ]"
                  :type="userInput.showPassword ? 'text' : 'password'"
                  :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="userInput.showPassword = !userInput.showPassword"
                  @change="validateConfirmPassword"
                />

                <!-- Send Password button -->
                <!-- @note[XL3]
                  Both `submitEmail` and `submitPassword` use a button with the same id `sendBtn`.
                  They're never rendered together as they're surrounded by contradicting v-ifs,
                  so this solution is valid.
                -->
                <v-row justify="center" align="center">
                  <v-btn
                    id="sendBtn"
                    color="#1DB954"
                    rounded
                    dark
                    x-large
                    min-width="40%"
                    @click="submitPassword"
                  >
                    Send
                  </v-btn>
                </v-row>
              </v-form>
            </template>

            <template v-else>
              <template v-if="!succeeded">
                <p class="body-1 text-center">
                  Enter your <span class="font-weight-bold">email address</span>
                  that you used to register. We'll send you an email with your username and a link
                  to reset your password.
                </p>

                <v-form ref="passwordResetForm">
                  <!-- Email -->
                  <v-text-field
                    id="emailField"
                    color="#1DB954"
                    outlined
                    label="Email address"
                    v-model="userInput.email"
                    :rules="[
                      validation.required('Email'),
                      validation.minLength('Email', 3),
                      validation.validEmail(),
                    ]"
                  />
                  <!-- Send -->
                  <v-row justify="center" align="center">
                    <v-btn
                      id="sendBtn"
                      color="#1DB954"
                      rounded
                      dark
                      @click="submitEmail"
                      min-width="40%"
                      x-large
                      >Send
                    </v-btn>
                  </v-row>
                </v-form>
              </template>

              <template v-else>
                <p class="body-1 text-center">
                  A message has been sent to you by email with instructions on how to reset your
                  password.
                </p>
              </template>
            </template>
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

/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  name: 'PasswordReset',
  created() {
    // Store the reset token
    this.resetToken = this.$route.params.resetToken;
  },
  /* istanbul ignore next */
  // Re-route to home if a user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      // Find the loggedIn cookie
      const loggedIn = document.cookie.search(/loggedIn=.+/) !== -1;

      if (loggedIn) {
        next('/home');
      } else {
        // Remove the current user
        // Remove all cookies
        // Continue
        cookies.clearData(['currentUser'], ['loggedIn']);
        next();
      }
    });
  },

  data: () => ({
    userInput: {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      incorrect: false,
    },
    succeeded: false,
    resetToken: undefined,
    validation,
  }),

  methods: {
    /**
     * Submits user input and sends an email with instructions on how to reset
     * the user's password
     */
    async submitEmail() {
      if (!this.$refs.passwordResetForm.validate()) return;

      const response = await api.forgotPassword({
        email: this.userInput.email,
      });

      // If the request was successful,
      // display the success message, and
      // clear input data.
      // 200 OK
      if (response.status === 200) {
        this.succeeded = true;

        this.userInput.email = '';
        this.userInput.incorrect = false;
      } else {
        this.userInput.incorrect = response.data.message;
      }
    },

    /**
     * Submits user input and resets their password
     */
    async submitPassword() {
      if (!this.$refs.passwordResetForm.validate()) return;

      const response = await api.resetPassword(
        {
          password: this.userInput.password,
          passwordConfirm: this.userInput.confirmPassword,
        },
        this.resetToken,
      );

      // If the request was successful,
      // re-login the user,
      // set localStorage,
      // and route to home
      // 200 OK
      if (response.status === 200) {
        const currentUser = {
          data: response.data.data.user,
        };
        // Handling artist objects
        if (currentUser.data.userInfo) {
          Object.keys(currentUser.data.userInfo).forEach((key) => {
            currentUser.data[key] = currentUser.data.userInfo[key];
          });
        }

        const loginRes = await api.loginUser({
          email: currentUser.data.email,
          password: this.userInput.password,
        });

        // Set localStorage token
        // Set the logged in cookie to session
        // Route to home
        // 200 OK
        if (loginRes.status === 200) {
          currentUser.token = loginRes.data.token;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));

          cookies.setCookiesToSession(['loggedIn']);
          this.$router.push('/home');
          /* istanbul ignore else */
        } else {
          this.userInput.incorrect = response.data.message;
        }
      } else {
        this.userInput.incorrect = response.data.message;
      }
    },

    /**
     * Validates that both email fields match
     */
    validateConfirmPassword() {
      return this.$refs.confirmPassword.validate();
    },
  },
};
</script>

<style lang="css" scoped></style>
