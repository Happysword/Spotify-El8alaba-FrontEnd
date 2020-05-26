<template>
  <v-app>
    <v-content>
      <v-container id="ConfirmEmail_root" class="py-0">
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
              />
            </router-link>
            <p class="mb-12 text-center font-weight-bold display-1">
              Confirm your email
            </p>

            <p v-if="!incorrect" class="body-1 text-center">
              Your email address has been confirmed successfully! You can now
              <router-link to="/login">
                <span class="link">log in</span>.
              </router-link>
            </p>
            <!-- Error bar -->
            <p
              v-else
              id="errorBar"
              class="red darken-1 white--text text-center py-3"
            >
              {{ incorrect }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import cookies from '@/store/modules/auth/cookies';
import api from 'api-client';

/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  name: 'ConfirmEmail',
  async created() {
    // Store the confirmation token
    const { confirmToken } = this.$route.params;
    if (confirmToken) {
      // Call the API wrapper
      const response = await api.confirmEmail(confirmToken);

      // 200 OK
      if (response.status === 200) {
        this.incorrect = false;
      } else {
        console.log(response);
        // Set the incorrect message properly
        this.incorrect = response.data.message;
      }
    }
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

  data: () => ({ incorrect: 'ERROR' }),
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
