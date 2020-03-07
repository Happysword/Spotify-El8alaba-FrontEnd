import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/MainPage/Main.vue';
import Home from '../views/MainPage/Home.vue';
import SignUp from '../views/Authentication/SignUp.vue';
import LogIn from '../views/Authentication/LogIn.vue';
import Library from '../views/Library/Library.vue';
import LibraryPlaylists from '../views/Library/LibraryPlaylists.vue';
import LibraryAlbums from '../views/Library/LibraryAlbums.vue';
import LibraryArtists from '../views/Library/LibraryArtists.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      {
        path: 'library',
        name: 'library',
        component: Library,
        redirect: { name: 'libraryplaylists' },
        children: [
          { path: 'playlists', name: 'libraryplaylists', component: LibraryPlaylists },
          { path: 'albums', name: 'libraryalbums', component: LibraryAlbums },
          { path: 'artists', name: 'libraryartists', component: LibraryArtists },
        ],
      },
    ],
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
