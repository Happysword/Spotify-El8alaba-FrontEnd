<template>
    <v-app>
        <v-content class="cont py-0">
            <v-col lg="12" md="12" sm="12" class="col">
                <top-bar></top-bar>
                <section id="top">
                    <div class="announce">
                        <h1 class="white--text display-4 font-weight-bold ma-10">
                            Get Premium Now
                        </h1>
                        <h4 class="white--text display-2 font-weight-bold ma-10">
                            Just EGP 49.99/month. Cancel anytime.
                        </h4>
                    </div>
                    <v-btn
                        v-if="request != 1"
                        class="ml-10"
                        color="#1DB954"
                        rounded
                        dark
                        large
                        @click="requestPremium()">
                        Get Premium
                    </v-btn>
                    <div v-if="request != 0">
                        <h1
                            v-if="request == 1"
                            class="white--text display-1 font-weight-bold ma-10">
                                Please Check your e-mail
                        </h1>
                        <h1
                            v-if="request == 2"
                            class="white--text display-1 font-weight-bold ma-10">
                            Something went wrong, Please try again later
                        </h1>
                    </div>
                    <div class="announce">
                        <span class="white--text ml-10">Terms and conditions apply.</span>
                    </div>
                </section>
                <section>
                    <h1 class="why">Why go Premium?</h1>
                    <v-row >
                        <v-col lg="3" md="6" sm="6" xs="12" align-self="baseline"
                        v-for="reason in reasons" :key="reason.text">
                            <v-row align="center" justify="center" >
                                <v-img
                                max-width="150"
                                max-height="150"
                                :src="reason.image"></v-img>
                            </v-row>
                            <v-row align="center" justify="center">
                                <p class="reasons mt-7">{{ reason.title }}</p>
                            </v-row>
                                <p style="text-align: center; font-size: 18px;">
                                    {{ reason.text }}
                                </p>
                        </v-col>
                    </v-row>
                </section>
                <p style="text-align: center; color: dimgrey; font-size: 10px;">
                    Terms and conditions apply.
                </p>
            </v-col>
        </v-content>
    </v-app>
</template>

<script>
import client from 'api-client';
import TopBar from '../../components/TopBar.vue';

export default {
  name: 'premium',
  components: {
    TopBar,
  },
  methods: {
    async requestPremium() {
      if (document.cookie.search(/loggedIn=.+/) === -1) {
        this.$router.push('/login');
      } else {
        const response = await client.premiumRequest();
        if (response === 200) {
          this.request = 1;
        } else {
          this.request = 2;
        }
      }
    },
  },
  data() {
    return {
      request: 0,
      reasons: [
        {
          title: 'Download music.',
          text: 'Listen anywhere.',
          image: 'https://campaigns.scdn.co/images/benefit_1.png',
        },
        {
          title: 'No ad interruptions.',
          text: 'Enjoy nonstop music.',
          image: 'https://campaigns.scdn.co/images/benefit_2.png',
        },
        {
          title: 'Play any song.',
          text: 'Even on mobile.',
          image: 'https://campaigns.scdn.co/images/benefit_3.png',
        },
        {
          title: 'Unlimited skips.',
          text: 'Just hit next.',
          image: 'https://campaigns.scdn.co/images/benefit_4.png',
        },
      ],
    };
  },
};
</script>

<style scoped>
.reasons{
    font-size: 25px;
    font-weight: bold;
}
.why{
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 10px;
    font-size: 60px;
    color: black;
}
.col{
    padding: 0px;
}
.cont{
    background-size: cover;
}
#top{
    background: url(https://campaigns-test.scdn.co/images/premium_dancer.png) right bottom / 450px no-repeat rgb(80, 155, 245);
    padding: 20px;
}
.announce{
    padding-top: 80px;
}
</style>
