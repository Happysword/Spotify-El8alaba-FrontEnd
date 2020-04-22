<template>
  <v-container class="cont py-0">
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
  </v-container>
</template>

<script>
import analyze from 'rgbaster';
import EventBus from '../../EventBus';

export default {
  name: 'download',
  async created() {
    console.log('downloading');
    const result = await analyze('https://open.scdn.co/cdn/images/devices/mac.80dcea83.png');
    EventBus.$emit('changeColor', result[100].color);
    console.log('downloaded');
  },
};
</script>

<style scoped>
.cont{
    justify-content: center;
}
.Download{
    text-align: center;
}
</style>
