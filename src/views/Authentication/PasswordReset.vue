<template>
<v-app>
<v-content>
  <v-container id="PasswordReset_root" class="py-0">
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

        <p class="text-center font-weight-bold display-1"
          >Password Reset
        </p>
        <template v-if="!succeeded">
          <p class="body-1 text-center">
            Enter your <span class="font-weight-bold">email address</span>
            that you used to register.
            We'll send you an email with your username and a link to reset your password.
          </p>

          <!-- Error bar -->
          <!-- @todo[XL3]: Change this error message -->
          <p
            id="errorBar"
            class="caption red darken-1 white--text text-center py-3 mb-8"
            v-if="userInput.incorrect"
            >Error. Email address not found.
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
                @click="submit"
                min-width="40%"
                x-large
                >Send
              </v-btn>
            </v-row>
          </v-form>
        </template>
        <template v-else>
          <p class="body-1 text-center">
            A message has been sent to you by email with instructions on how to reset your password.
          </p>
        </template>
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
  name: 'PasswordReset',
  created() {
    document.title = 'Reset your password - Spotify El8alaba';
  },

  data() {
    return {
      userInput: {
        email: '',
        incorrect: false,
      },
      succeeded: false,
      validation,
    };
  },

  methods: {
    /**
     * Submits user input
     */
    async submit() {
      if (!this.$refs.passwordResetForm.validate()) return;

      const response = await api.forgotPassword({
        email: this.userInput.email,
      });

      /**
       * If the request was successful,
       * display the success message, and
       * clear input data.
       */
      if (response.status === 'success') {
        this.succeeded = true;

        this.userInput.email = '';
        this.userInput.incorrect = false;
      } else {
        this.userInput.incorrect = true;
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>
