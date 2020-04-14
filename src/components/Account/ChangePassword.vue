<template>
<v-app>
<v-content class="grey lighten-4 pa-8">
<!-- Root Container -->
<v-container id="EditProfile_root">
  <p id="title"
     class="spotify-green headline pt-6 pl-3 mb-12">
    Change your password
  </p>

  <v-card flat id="formCard">
    <!-- Error bar -->
    <p
      id="errorBar"
      class="caption red darken-1 white--text text-center py-3 mb-8"
      v-if="!!userInput.incorrect">
      {{ userInput.incorrect }}
    </p>

    <!-- Form -->
    <v-form class="py-12 px-12" ref="changePasswordForm">
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
          <v-btn id="cancelBtn"
                 class="mr-4" text rounded>
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
      // reroute to AccountOverview
      // 200 OK
      if (response.status === 200) {
        // @todo[XL3]: Refer to BE about authorization issues
        console.log(response.data.token);
        this.$router.push({ name: 'AccountOverview' });
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
