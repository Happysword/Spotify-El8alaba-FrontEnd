import api from 'api-client';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/MainPage/Main.vue';
import Home from '../views/MainPage/Home.vue';
import SignUp from '../views/Authentication/SignUp.vue';
import LogIn from '../views/Authentication/LogIn.vue';
import LogOut from '../views/Authentication/LogOut.vue';
import PasswordReset from '../views/Authentication/PasswordReset.vue';
import ConfirmEmail from '../views/Authentication/ConfirmEmail.vue';
import Account from '../views/Account/Account.vue';
import AccountOverview from '../components/Account/AccountOverview.vue';
import EditProfile from '../components/Account/EditProfile.vue';
import ChangePassword from '../components/Account/ChangePassword.vue';
import NotificationSettings from '../components/Account/NotificationSettings.vue';
import Landing from '../views/Landing.vue';
import Queue from '../views/MainPage/Queue.vue';
import Search from '../views/Search/Search.vue';
import Genres from '../views/Genres/Genres.vue';
import LikedTracks from '../views/PlayLists/LikedTracks.vue';
import Library from '../views/Library/Library.vue';
import LibraryPlaylists from '../views/Library/LibraryPlaylists.vue';
import LibraryAlbums from '../views/Library/LibraryAlbums.vue';
import LibraryArtists from '../views/Library/LibraryArtists.vue';
import InputSearch from '../views/Search/InputSearch.vue';
import Artist from '../views/Artist/Artist.vue';
import ArtistManage from '../views/Artist/ArtistManage.vue';
import ArtistOverview from '../views/Artist/ArtistOverview.vue';
import ArtistRelated from '../views/Artist/ArtistRelated.vue';
import ArtistAbout from '../views/Artist/ArtistAbout.vue';
import SearchType from '../views/Search/SearchType.vue';
import RecentSearch from '../views/Search/RecentSearch.vue';
import UserPage from '../views/Users/UserPage.vue';
import store from '../store/index';
import Download from '../views/Download/Download.vue';
import Premium from '../views/Premium/Premium.vue';

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
    meta: {},
    children: [
      { path: '/home', name: 'home', component: Home },
      { path: '/home/queue', name: 'queue', component: Queue },
      { path: '/home/search', name: 'search', component: Search },
      {
        path: '/home/search/history/showRecent',
        name: 'recentSearch',
        component: RecentSearch,
      },
      { path: '/home/search/:id', name: 'inputSearch', component: InputSearch },
      { path: '/genre/:id-page', name: 'genres', component: Genres },
      {
        path: '/home/search/:id/:type',
        name: 'searchType',
        component: SearchType,
      },
      { path: '/album/:id', name: 'album', component: LikedTracks },
      { path: '/playlist/:id', name: 'playlist', component: LikedTracks },
      { path: '/track/:id', name: 'track' },
      { path: '/download', name: 'download', component: Download },
      { path: '/home/user/:id', name: 'user', component: UserPage },
      { path: '/home/artist/manage', name: 'manage', component: ArtistManage },
      {
        path: '/home/library/tracks',
        name: 'LikedTracks',
        component: LikedTracks,
      },
      {
        path: '/home/library/playlists',
        name: 'library',
        component: Library,
        redirect: { name: 'libraryplaylists' },
        children: [
          {
            path: '/home/library/playlists',
            name: 'libraryplaylists',
            component: LibraryPlaylists,
          },
          {
            path: '/home/library/albums',
            name: 'libraryalbums',
            component: LibraryAlbums,
          },
          {
            path: '/home/library/artists',
            name: 'libraryartists',
            component: LibraryArtists,
          },
        ],
      },
      {
        path: '/home/artist/:id',
        name: 'artist',
        component: Artist,
        redirect: { name: 'artistOverview' },
        children: [
          {
            path: '/home/artist/:id',
            name: 'artistOverview',
            component: ArtistOverview,
          },
          {
            path: '/home/artist/:id/related',
            name: 'artistRelated',
            component: ArtistRelated,
          },
          {
            path: '/home/artist/:id/about',
            name: 'artistAbout',
            component: ArtistAbout,
          },
        ],
      },
    ],
  },
  {
    path: '/premium',
    name: 'premium',
    component: Premium,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    meta: { title: 'Log in' },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { title: 'Sign up' },
  },
  {
    path: '/confirm-email/:confirmToken?',
    name: 'ConfirmEmail',
    component: ConfirmEmail,
    meta: { title: 'Confirm Email' },
  },
  {
    path: '/password-reset/:resetToken?',
    name: 'PasswordReset',
    component: PasswordReset,
    meta: { title: 'Reset your password' },
  },
  {
    path: '/logout',
    name: 'LogOut',
    component: LogOut,
    meta: { title: 'Log out' },
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    redirect: { name: 'AccountOverview' },
    children: [
      {
        path: 'overview',
        name: 'AccountOverview',
        component: AccountOverview,
        meta: { title: 'Account Overview' },
      },
      {
        path: 'edit-profile',
        name: 'EditProfile',
        component: EditProfile,
        meta: { title: 'Edit Profile' },
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: ChangePassword,
        meta: { title: 'Change Password' },
      },
      {
        path: 'notifications',
        name: 'NotificationSettings',
        component: NotificationSettings,
        meta: { title: 'Notification Settings' },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/**
 * Refreshes the data stored in localStorage on route enter
 */
router.beforeEach(async (to, from, next) => {
  const refresh = to.matched.some((m) => m.meta.refreshCurrentUser);
  if (refresh) {
    const tokenRes = await api.fetchToken();
    const profileRes = await api.getCurrentUserProfile();
    if (tokenRes.status === 200 && profileRes.status === 200) {
      // Processing different user types
      const currentUser = { token: tokenRes.data.token, data: profileRes.data };
      if (currentUser.data.userInfo) {
        Object.keys(currentUser.data.userInfo).forEach((key) => {
          currentUser.data[key] = currentUser.data.userInfo[key];
        });
      }
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      next();
    } else {
      // eslint-disable-next-line no-alert
      alert(
        `${tokenRes.data.message || profileRes.data.message}\n
        You will now be redirected.`,
      );
      const { status } = await api.logoutUser();
      if (status === 200) next('/');
    }
  } else next();
});

/**
 * Adjusts each route's title in the browser
 */
router.afterEach((to, from) => {
  let defaultTitle = 'Spotify El8alaba';
  Vue.nextTick(() => {
    if (to.meta && to.meta.title) {
      defaultTitle = `${defaultTitle} - ${to.meta.title}`;
    }
    document.title = defaultTitle;
  });
  store.state.prevRoute = from.fullPath;
});

export default router;
