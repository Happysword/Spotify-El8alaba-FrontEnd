<template>
  <v-app>
    <v-content>
      <v-container id="SignUp_root" class="py-0">
        <!-- Main row -->
        <v-row justify="center" align="center">
          <v-col sm="8" lg="6" xl="4" class="px-8">
            <!-- Logo -->
            <router-link to="/">
              <v-img
                id="logo"
                src="../../assets/imgs/El-8alaba.png"
                contain
                height="140"
              ></v-img>
            </router-link>

            <v-col class="text-center">
              <v-btn
                id="fbSignupBtn"
                color="#1877F2"
                rounded
                x-large
                dark
                @click="fbSignup"
              >
                <v-img
                  src="../../assets/imgs/fb-logo.png"
                  class="mr-4 mt-n1 ml-n4"
                  contain
                  max-height="38"
                  max-width="38"
                />
                Sign Up with Facebook
              </v-btn>
            </v-col>

            <v-row>
              <v-col>
                <v-divider class="my-3 mb-6" />
              </v-col>
              <v-col cols="1">
                <p class="text-center font-weight-bold title">OR</p>
              </v-col>
              <v-col>
                <v-divider class="my-3 mb-6" />
              </v-col>
            </v-row>

            <!-- Error bar -->
            <!-- @todo[XL3] Reach out to BE about error messages -->
            <p
              id="errorBar"
              class="caption red darken-1 white--text text-center py-3 mb-8"
              v-if="userInput.incorrect"
            >
              {{ userInput.incorrect }}
            </p>

            <!-- Form -->
            <v-form ref="signupForm">
              <!-- Email -->
              <v-text-field
                id="emailField"
                color="#1DB954"
                outlined
                label="Email"
                v-model="userInput.email"
                :rules="[
                  validation.required('Email'),
                  validation.minLength('Email', 3),
                  validation.validEmail(),
                ]"
                @change="validateConfirmEmail"
              />

              <!-- Confirm Email -->
              <v-text-field
                id="confirmEmailField"
                color="#1DB954"
                outlined
                label="Confirm email"
                ref="confirmEmail"
                v-model="userInput.confirmEmail"
                :rules="[
                  (data) =>
                    (!!data && data === userInput.email) ||
                    'Email address doesn\'t match',
                ]"
                @change="validateConfirmEmail"
              />

              <!-- Password -->
              <!-- Minimum password length is 8 -->
              <v-text-field
                id="passwordField"
                color="#1DB954"
                outlined
                label="Password"
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

              <!-- What should we call you? -->
              <v-text-field
                id="nameField"
                color="#1DB954"
                outlined
                label="Name"
                placeholder="What should we call you?"
                v-model="userInput.name"
                :rules="[
                  validation.required('This field'),
                  validation.noSpecialCharacters('This field'),
                  validation.validName(),
                ]"
              />

              <!-- Date of Birth -->
              <p class="subtitle-2 grey--text text--darken-1">Date of Birth</p>
              <v-row class="mt-n6 mb-n10">
                <!-- Day -->
                <v-col cols="3">
                  <v-text-field
                    id="dobDayField"
                    color="#1DB954"
                    outlined
                    label="Day"
                    type="number"
                    v-model="userInput.dob.day"
                    :rules="[validation.validDay()]"
                  />
                </v-col>
                <!-- Month -->
                <v-col>
                  <v-select
                    id="dobMonthSelect"
                    color="#1DB954"
                    outlined
                    label="Month"
                    :items="months"
                    v-model="userInput.dob.month"
                    :rules="[validation.required('Month')]"
                  />
                </v-col>
                <!-- Year -->
                <v-col cols="3">
                  <v-text-field
                    id="dobYearField"
                    color="#1DB954"
                    outlined
                    label="Year"
                    type="number"
                    v-model="userInput.dob.year"
                    :rules="[validation.validYear()]"
                  />
                </v-col>
              </v-row>

              <!-- Gender -->
              <v-radio-group
                id="genderRadio"
                mandatory
                row
                v-model="userInput.gender"
              >
                <v-radio label="Male" value="m" />
                <v-radio label="Female" value="f" />
              </v-radio-group>

              <!-- Sign Up -->
              <v-row justify="center" align="center">
                <v-btn
                  id="signupBtn"
                  color="#1DB954"
                  rounded
                  dark
                  @click="submit"
                  min-width="60%"
                  x-large
                >
                  Sign Up
                </v-btn>
              </v-row>
            </v-form>

            <p id="loginPrompt" class="text-center mt-4">
              Already have an account?
              <router-link to="/login">
                <span class="link">Log in</span>
              </router-link>
            </p>
            <v-overlay :value="userInput.submitted" opacity="0.95">
              <p class="title text-center link">
                You have been signed up successfully! A message has been sent to
                your email address.<br />
                Please follow the instructions in it to confirm your email.
              </p>
            </v-overlay>
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
 */
export default {
  name: 'SignUp',
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

  data() {
    return {
      months: [
        { text: 'January', value: '01' },
        { text: 'February', value: '02' },
        { text: 'March', value: '03' },
        { text: 'April', value: '04' },
        { text: 'May', value: '05' },
        { text: 'June', value: '06' },
        { text: 'July', value: '07' },
        { text: 'August', value: '08' },
        { text: 'September', value: '09' },
        { text: 'October', value: '10' },
        { text: 'November', value: '11' },
        { text: 'December', value: '12' },
      ],

      userInput: {
        email: '',
        confirmEmail: '',
        password: '',
        showPassword: false,
        name: '',
        dob: {
          day: '',
          month: '',
          year: '',
        },
        gender: '',
        incorrect: false,
        submitted: false,
      },

      validation,
    };
  },

  methods: {
    /**
     * Signups the user and re-routes them to Home
     */
    async submit() {
      if (!this.$refs.signupForm.validate()) return;

      /**
       * Utility function to format the Date of Birth
       * @param  {Object} dob The object containing the Date of birth
       * @return {String}     The formatted Date of Birth
       */
      const formatDob = (dob) => {
        let { day } = dob;
        if (parseInt(day, 10) < 10) day = `0${day}`;
        return `${dob.year}-${dob.month}-${day}`;
      };

      // Send the request
      const response = await api.signupUser({
        name: this.userInput.name,
        email: this.userInput.email,
        password: this.userInput.password,
        passwordConfirm: this.userInput.password,
        gender: this.userInput.gender,
        birthdate: formatDob(this.userInput.dob),
        type: 'user',
      });

      // If the request was successful,
      // tell the user they need to confirm their email,
      // 200 OK
      if (response.status === 200) {
        this.userInput.submitted = true;
        // @note[XL3] The signup endpoint sets the loggedIn cookie, which conflicts
        // with route guards, which is why I'm clearing it manually
        cookies.clearData(['currentUser'], ['loggedIn']);
      } else {
        this.userInput.incorrect = response.data.message;
      }
    },

    /**
     * Validates that both email fields match
     */
    validateConfirmEmail() {
      return this.$refs.confirmEmail.validate();
    },

    /* istanbul ignore next */
    fbSignup() {
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
  color: #1db954 !important;
}

.link:hover {
  color: #2bdb69 !important;
}
</style>
