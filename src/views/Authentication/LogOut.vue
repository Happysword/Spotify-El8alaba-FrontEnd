<template>
  <div id="LogOut_root">
    <p class="headline">Logging out...</p>
  </div>
</template>

<script>
import api from 'api-client';
import fbase from '@/store/modules/firebase';

/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  name: 'LogOut',
  /* istanbul ignore next */
  // Re-route to login if no user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      // Find the loggedIn cookie
      const notLoggedIn = document.cookie.search(/loggedIn=.+/) === -1;

      if (notLoggedIn) {
        next('/login');
      } else {
        next();
      }
    });
  },

  async mounted() {
    // Delete the notification token
    let response;
    const mes = fbase.getMessagingInstance();
    if (mes) {
      const token = await mes.getToken();
      response = await api.deleteNotificationToken(token);
      if (response.status !== 200) {
        alert('Error deleting notification token.');
        console.log(response.data);
      }
    }

    // Remove the current user
    // Remove all cookies
    response = await api.logoutUser();
    if (response.status === 200) {
      this.$router.push('/');
    } else {
      console.log(response.data);
    }
  },
};
</script>
