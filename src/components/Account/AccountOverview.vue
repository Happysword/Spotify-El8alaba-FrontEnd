<template>
<v-app>
<v-content>
  <!-- Title -->
  <p class="display-2 font-weight-bold pt-6 mb-12">
    Account Overview
  </p>

  <v-col>
    <p class="title font-weight-bold">
      Profile
    </p>
    <v-col>
      <div v-for="(entry, i) in profileInfo" :key="i">
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
    <p class="title font-weight-bold">
      Your plan
    </p>
    <v-card flat outlined>
      <div class="purpleGradient mb-n6">
        <p class="ml-4 font-weight-bold display-1 planType text-capitalize">
          Spotify {{ plan }}
        </p>
      </div>
      <v-card-text class="black--text">
        <p class="my-8">
          {{ plans[plan] }}
        </p>
        <v-divider/>
        <p class="my-8 font-weight-bold title text-capitalize">
          {{ plan }}
        </p>
      </v-card-text>
    </v-card>
    <v-btn v-if="plan === 'free'"
          x-large rounded outlined dark
          color="secondary"
          class="mt-3">
      Join Premium
    </v-btn>
  </v-col>

</v-content>
</v-app>
</template>

<script>
import api from 'api-client';

export default {
  name: 'AccountOverview',
  data: () => ({
    profileInfo: [
      { name: 'Username', data: 'lorem' },
      { name: 'Email', data: 'lorem' },
      { name: 'Date of Birth', data: 'lorem' },
      { name: 'Country', data: 'lorem' },
    ],

    plan: '',

    plans: {
      free: 'Free plan description',
      premium: 'Premium plan description',
    },
  }),

  async beforeMount() {
    // Request the user's info
    const response = await api.getCurrentUserProfile();

    // 200 OK
    if (response.status === 200) {
      const userProfile = response.data.data.user;

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
      alert('Something went wrong.');
    }
  },
};
</script>

<style lang="css" scoped>
.purpleGradient {
  margin-top: 0px;
  background-color: #9C27B0;
  background: linear-gradient(#AB47BC, #9C27B0, #AB47BC)
}

.planType {
  color: white;
  line-height: 150px !important;
}
</style>
