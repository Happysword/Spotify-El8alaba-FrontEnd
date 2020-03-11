import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/MainPage/Main.vue';
import Home from '../views/MainPage/Home.vue';
import SignUp from '../views/Authentication/SignUp.vue';
import LogIn from '../views/Authentication/LogIn.vue';
import Landing from '../views/Landing.vue';
import Queue from '../views/MainPage/Queue.vue';
import Search from '../views/Search/Search.vue';
import Genres from '../views/Genres/Genres.vue';
import LikedTracks from '../views/PlayLists/LikedTracks.vue';
import Library from '../views/Library/Library.vue';
import LibraryPlaylists from '../views/Library/LibraryPlaylists.vue';
import LibraryAlbums from '../views/Library/LibraryAlbums.vue';
import LibraryArtists from '../views/Library/LibraryArtists.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/home',
    name: 'Main',
    component: Main,
    children: [
      { path: '/home', name: 'home', component: Home },
      { path: '/home/queue', name: 'queue', component: Queue },
      { path: '/home/search', name: 'search', component: Search },
      { path: '/home/genre/:id', name: 'genres', component: Genres },
      {
        path: '/home/library/tracks',
        name: 'LikedTracks',
        component: LikedTracks,
      },
      {
        path: '/home/library',
        name: 'library',
        component: Library,
        redirect: { name: 'libraryplaylists' },
        children: [
          {
            path: '/home/playlists',
            name: 'libraryplaylists',
            component: LibraryPlaylists,
          },
          {
            path: '/home/albums',
            name: 'libraryalbums',
            component: LibraryAlbums,
          },
          {
            path: '/home/artists',
            name: 'libraryartists',
            component: LibraryArtists,
          },
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
