<template>
  <pre>Logging out...</pre>
</template>

<script>
/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
import cookies from '@/store/modules/auth/cookies';

export default {
  name: 'LogOut',
  // Re-route to login if no user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) {
        next('/login');
      } else {
        next();
      }
    });
  },

  mounted() {
    // Remove the current user
    // Remove all cookies
    cookies.clearData(['currentUser'], ['jwt']);

    this.$router.push('/');
  },
};
</script>
