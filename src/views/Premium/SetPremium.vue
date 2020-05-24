<template>
    <v-app>
        <v-content class="cont py-0" v-if="ready">
            <v-col lg="12" md="12" sm="12" class="col">
                <top-bar></top-bar>
                <section id="top" v-if="request">
                    <div class="announce">
                        <h1 class="black--text display-4 font-weight-bold ma-10">
                            Congratulations!
                        </h1>
                        <h1 class="black--text display-4 font-weight-bold ma-10">
                            You are premium now.
                        </h1>
                        <h4 class="black--text display-2 font-weight-bold ma-10">
                            Start your premium experience now.
                        </h4>
                    </div>
                    <v-btn
                        class="ml-10"
                        color="#1DB954"
                        rounded
                        dark
                        large
                        @click="$router.replace('/home')">
                        Home Page
                    </v-btn>
                </section>
                <section id="top" v-if="!request">
                    <div class="announce">
                        <h1 class="black--text display-4 font-weight-bold ma-10">
                            Opps!
                        </h1>
                        <h1 class="black--text display-4 font-weight-bold ma-10">
                            Something went wrong.
                        </h1>
                        <h4 class="black--text display-2 font-weight-bold ma-10">
                            Please Try Again.
                        </h4>
                    </div>
                    <v-btn
                        class="ml-10"
                        color="#1DB954"
                        rounded
                        dark
                        large
                        @click="$router.replace('/premium')">
                        Get Premium
                    </v-btn>
                </section>
            </v-col>
                <p id="terms">
                    Terms and conditions apply.
                </p>
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
    async setPremium() {
      const response = await client.setPremium(this.$route.params.token);
      if (response === 200) {
        this.request = true;
      } else {
        this.request = false;
      }
    },
  },
  data() {
    return {
      request: false,
      ready: false,
    };
  },
  async created() {
    await this.setPremium();
    this.ready = true;
  },
};
</script>

<style scoped>
.col{
    padding: 0px;
}
.cont{
    background-size: cover;
    background: url(https://campaigns-test.scdn.co/images/premium_dancer.png) right bottom / 450px no-repeat rgb(255, 205, 210);
}
#top{
    padding: 20px;
}
.announce{
    padding-top: 80px;
}
#terms{
    position: absolute;
    bottom: 0px;
    left: 45%;
    color: dimgrey;
    font-size: 10px;
}
</style>
