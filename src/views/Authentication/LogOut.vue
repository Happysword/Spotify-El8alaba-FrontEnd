<template>
  <pre>Logging out...</pre>
</template>

<script>
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
    localStorage.removeItem('currentUser');

    // Remove all cookies
    const cookies = document.cookie;
    cookies.split(';').forEach((cookie) => {
      const key = cookie.split('=')[0];
      document.cookie = `${key}=; expires = Thu, 01 Jan 1970 00:00:00 UTC`;
    });
    this.$router.push('/');
  },
};
</script>
