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
            height="140">
          </v-img>
        </router-link>

        <!-- Error bar -->
        <p
          id="errorBar"
          class="caption red darken-1 white--text text-center py-3 mb-8"
          v-if="userInput.incorrect"
          >Error. Something went wrong.
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
              (data) => (!!data && data === userInput.email)
                || 'Email address doesn\'t match',
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
            :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
            :rules="[validation.required('This field')]"
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
                v-model="userInput.dob.year"
                :rules="[validation.validYear()]"
              />
            </v-col>
          </v-row>

          <!-- Gender -->
          <v-radio-group id="genderRadio" mandatory row v-model="userInput.gender">
            <v-radio label="Male" value="m"/>
            <v-radio label="Female" value="f"/>
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
              >Sign Up
            </v-btn>
          </v-row>
        </v-form>

        <p id="loginPrompt" class="text-center mt-4">
          Already have an account?
          <router-link to="/login">
            <span class="link">Log in</span>
          </router-link>
        </p>

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
  name: 'SignUp',
  created() {
    document.title = 'Sign up - Spotify El8alaba';
  },

  // Re-route to home if a user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        next('/home');
      } else {
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

        if (parseInt(day, 10) < 10) {
          day = `0${day}`;
        }

        return `${dob.year}-${dob.month}-${day}`;
      };

      // Send the request
      const response = await api.signupUser({
        name: this.userInput.name,
        email: this.userInput.email,
        password: this.userInput.password,
        // @todo[XL3] See if we're going to add this
        passwordConfirm: this.userInput.password,
        gender: this.userInput.gender,
        birthdate: formatDob(this.userInput.dob),
        type: 'user',
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

    /**
     * Validates that both email fields match
     */
    validateConfirmEmail() {
      this.$refs.confirmEmail.validate();
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
