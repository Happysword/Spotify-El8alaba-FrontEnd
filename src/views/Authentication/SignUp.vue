<template>
  <v-app>
    <v-content>
      <v-container class="SignUp_root py-0">
        <!-- Main row -->
        <v-row justify="center" align="center">
          <v-col sm="8" lg="6" xl="4" class="px-8">
            <!-- Logo -->
            <v-img src="../../assets/imgs/El-8alaba.png" contain height="140" />
            <!-- Email -->
            <v-form ref="signupForm">
              <v-text-field
                color="#1DB954"
                outlined
                placeholder="Email"
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
                color="#1DB954"
                outlined
                placeholder="Confirm email"
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
                :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="userInput.showPassword = !userInput.showPassword"
              />
              <!-- What should we call you? -->
              <v-text-field
                color="#1DB954"
                outlined
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
                    color="#1DB954"
                    outlined
                    placeholder="Day"
                    v-model="userInput.dob.day"
                    :rules="[validation.validDay()]"
                  />
                </v-col>
                <!-- Month -->
                <v-col>
                  <v-select
                    color="#1DB954"
                    outlined
                    placeholder="Month"
                    :items="months"
                    v-model="userInput.dob.month"
                    :rules="[validation.required('Month')]"
                  />
                </v-col>
                <!-- Year -->
                <v-col cols="3">
                  <v-text-field
                    color="#1DB954"
                    outlined
                    placeholder="Year"
                    v-model="userInput.dob.year"
                    :rules="[validation.validYear()]"
                  />
                </v-col>
              </v-row>
              <!-- Gender -->
              <v-radio-group row v-model="userInput.gender">
                <v-radio label="Male" value="male"/>
                <v-radio label="Female" value="female"/>
              </v-radio-group>

              <!-- Sign Up -->
              <v-row justify="center" align="center">
                <v-btn
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

            <p class="text-center mt-4">
              Already have an account?
              <span>
                <a
                  href="/login"
                  :class="userInput.onLogin ? 'font-weight-bold' : ''"
                  @mouseover="userInput.onLogin = true"
                  @mouseleave="userInput.onLogin = false"
                  >Log in
                </a>
              </span>
            </p>

          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import validation from '@/store/modules/auth/validation';

export default {
  name: 'SignUp',

  data() {
    return {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
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
        onLogin: false,
      },

      validation,
    };
  },

  methods: {
    // @todo[XL3]: Implement this
    async submit() {
      console.log('submit!');
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
  text-decoration: none;
  color: #1db954 !important;
}
</style>
