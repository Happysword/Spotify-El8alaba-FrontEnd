<template>
<v-app>
<v-content class="pa-4">
  <!-- Title -->
  <p id="title"
     class="display-2 font-weight-bold pt-6 pl-3 mb-12">
    Account Overview
  </p>

  <!-- Main column -->
  <v-col>
    <!-- Profile -->
    <p class="title font-weight-bold">
      Profile
    </p>
    <v-col>
      <div v-for="(entry, i) in profileInfo" :key="i"
           :id="`${entry.id}Entry`">
        <v-row justify="space-between">
          <p class="subtitle-1 grey--text">
            {{ entry.name }}
          </p>
          <p class="body-1">
            {{ entry.data }}
          </p>
        </v-row>
        <v-divider class="mb-3"/>
      </div>
    </v-col>

    <p class="my-8"></p>

    <!-- Plan details -->
    <p class="title font-weight-bold">
      Your plan
    </p>
    <v-card flat outlined id="planCard">
      <div class="purple-gradient mb-n6">
        <p class="ml-4 font-weight-bold display-1 plan-type text-capitalize">
          Spotify {{ plan }}
        </p>
      </div>
      <v-card-text class="black--text">
        <p class="my-8">
          {{ description[plan] }}
        </p>
        <v-divider/>
        <p class="my-8 font-weight-bold title text-capitalize">
          {{ plan }}
        </p>
      </v-card-text>
    </v-card>
    <v-btn id="toPremiumBtn"
           v-if="plan === 'free'"
           x-large rounded outlined dark
           color="secondary"
           class="mt-3"
           to="/premium">
      Join Premium
    </v-btn>

  </v-col>
</v-content>
</v-app>
</template>

<script>
import api from 'api-client';

/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  name: 'AccountOverview',
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
  data: () => ({
    profileInfo: [
      { id: 'username', name: 'Username', data: 'lorem' },
      { id: 'email', name: 'Email', data: 'lorem' },
      { id: 'dob', name: 'Date of Birth', data: 'lorem' },
      { id: 'country', name: 'Country', data: 'lorem' },
    ],

    plan: '',

    description: {
      free: 'Free plan description',
      premium: 'Premium plan description',
    },
  }),

  async beforeCreate() {
    // Request the user's info
    const response = await api.getCurrentUserProfile();

    // 200 OK
    if (response.status === 200) {
      const userProfile = response.data;

      // Username
      this.profileInfo[0].data = userProfile.id;

      // Email
      this.profileInfo[1].data = userProfile.email;

      // Date of Birth
      const dob = new Date(userProfile.birthdate);
      this.profileInfo[2].data = `${dob.getUTCDate()}/${dob.getUTCMonth() + 1}/${dob.getUTCFullYear().toString().substr(2, 2)}`;

      // Country
      this.profileInfo[3].data = userProfile.country;

      // Free or Premium
      this.plan = userProfile.product;
    } else {
      // eslint-disable-next-line no-alert
      alert('No user is currently logged in');
    }
  },
};
</script>

<style lang="css" scoped>
.purple-gradient {
  margin-top: 0px;
  background-color: #9C27B0;
  background: linear-gradient(#AB47BC, #9C27B0, #AB47BC)
}

.plan-type {
  color: white;
  line-height: 150px !important;
}
</style>
