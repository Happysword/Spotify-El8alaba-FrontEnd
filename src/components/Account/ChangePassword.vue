<template>
<v-app>
<v-content class="grey lighten-4 pa-0 pa-sm-8">
<!-- Root Container -->
<v-container id="EditProfile_root">
  <p id="title"
     class="spotify-green headline pt-6 pl-3 mb-12 d-none d-sm-flex">
    Change your password
  </p>

  <v-card flat id="formCard"
          class="pa-4 pb-8 pa-sm-12">
    <!-- Error bar -->
    <p
      id="errorBar"
      class="caption red darken-1 white--text text-center py-3 mb-8"
      v-if="!!userInput.incorrect">
      {{ userInput.incorrect }}
    </p>

    <!-- Form -->
    <v-form ref="changePasswordForm">
      <!-- Current password -->
      <v-text-field id="currentPwField"
                    color="#1DB954"
                    outlined
                    label="Current password"
                    v-model="userInput.currentPw"
                    :rules="[
                      validation.required('Password'),
                      validation.minLength('Password', 8),
                    ]"
                    :type="userInput.showPassword ? 'text' : 'password'"
                    :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="userInput.showPassword = !userInput.showPassword"
      />
      <!-- New password -->
      <v-text-field id="newPwField"
                    color="#1DB954"
                    outlined
                    label="New password"
                    v-model="userInput.newPw"
                    :rules="[
                      validation.required('Password'),
                      validation.minLength('Password', 8),
                      (data) => (data !== userInput.currentPw) || 'Don\'t use the same password',
                    ]"
                    :type="userInput.showPassword ? 'text' : 'password'"
                    :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="userInput.showPassword = !userInput.showPassword"
                    @change="validateRetypeNewPw"
      />
      <!-- Retype new password -->
      <v-text-field id="retypeNewPwField"
                    color="#1DB954"
                    outlined
                    label="Retype new password"
                    ref="retypeNewPw"
                    v-model="userInput.retypeNewPw"
                    :rules="[
                      (data) => (!!data && data === userInput.newPw)
                        || 'Password doesn\'t match',
                    ]"
                    :type="userInput.showPassword ? 'text' : 'password'"
                    :append-icon="userInput.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="userInput.showPassword = !userInput.showPassword"
      />

      <v-row justify="end">
        <router-link to="/account/overview">
          <v-btn id="cancelBtn" class="mr-4" text rounded>
            Cancel
          </v-btn>
        </router-link>
        <v-btn id="saveBtn"
               class="mr-4" color="#1DB954" rounded dark
               @click="submit">
          Set new password
        </v-btn>
      </v-row>
    </v-form>
  </v-card>

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
  name: 'ChangePassword',
  data: () => ({
    userInput: {
      currentPw: '',
      newPw: '',
      retypeNewPw: '',
      showPassword: false,
      incorrect: false,
    },
    validation,
  }),
  methods: {
    /**
     * Submits user data and updates their password
     */
    async submit() {
      if (!this.$refs.changePasswordForm.validate()) return;

      const response = await api.updatePassword({
        password: this.userInput.currentPw,
        newPassword: this.userInput.newPw,
        newPasswordConfirm: this.userInput.retypeNewPw,
      });

      // If the request was successful,
      // re-login the user,
      // update localStorage,
      // and route to Account Overview
      // 200 OK
      if (response.status === 200) {
        const { data: { data: { user } } } = response;
        // Handling artist objects
        if (user.userInfo) user.email = user.userInfo.email;
        const loginRes = await api.loginUser({
          email: user.email,
          password: this.userInput.newPw,
        });

        // Update localStorage token
        // Set the logged in cookie to session
        // Route to Account Overview
        // 200 OK
        if (loginRes.status === 200) {
          const currentUser = JSON.parse(localStorage.currentUser);
          currentUser.token = loginRes.data.token;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));

          cookies.setCookiesToSession(['loggedIn']);
          this.$router.push({ name: 'AccountOverview' });
        } else {
          this.userInput.incorrect = response.data.message;
        }
      } else {
        this.userInput.incorrect = response.data.message;
      }
    },

    /**
     * Validates that both password fields match
     */
    validateRetypeNewPw() {
      return this.$refs.retypeNewPw.validate();
    },
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none !important;
}

.spotify-green {
  color: #1DB954 !important;
}
</style>
