import Vue from 'vue';

Vue.filter('shorten', (value) => `${value.substring(0, 45)} ...`);
