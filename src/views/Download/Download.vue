<template>
    <v-app style='background: black;'>
        <v-container class="cont py-0">
            <top-bar></top-bar>
            <v-content class="mt-10">
                <v-row justify="center" align="center">
                    <v-col sm="8" lg="6" xl="4" class="px-8">
                        <v-img
                            max-height="500"
                            max-width="500"
                            contain
                            src="https://open.scdn.co/cdn/images/devices/mac.80dcea83.png">
                        </v-img>
                    </v-col>
                </v-row>
                <v-row justify="center" align="center" >
                    <v-col sm="10" lg="8" xl="6" >
                        <p class="white--text display-1 font-weight-bold Download">
                            Download our free app</p>
                        <p class="white--text Download">Listen to the music you love with ease.
                            Download the Spotify El Ghalaba app for your computer.</p>
                        <v-row justify="center" align="center">
                            <v-btn
                                color="#1DB954"
                                rounded
                                dark
                                large>
                                DOWNLOAD THE COMPUTER APP
                            </v-btn>
                        </v-row>
                    </v-col>
                </v-row>
                </v-content>
        </v-container>
    </v-app>
</template>

<script>
import analyze from 'rgbaster';
import EventBus from '../../EventBus';
import TopBar from '../../components/TopBar.vue';

export default {
  name: 'download',
  components:
  {
    TopBar,
  },
  async created() {
    const result = await analyze('https://open.scdn.co/cdn/images/devices/mac.80dcea83.png');
    EventBus.$emit('changeColor', result[100].color);
  },
};
</script>

<style scoped>
.cont{
    justify-content: center;
}
.Download{
    text-align: center;
    background-color: black;
}
</style>
