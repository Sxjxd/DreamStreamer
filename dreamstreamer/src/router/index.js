import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView.vue';
import HomeView from '../views/HomeView.vue';
import AlbumsView from '../views/AlbumsView.vue';
import BrowseView from '@/views/BrowseView.vue';
import LibraryView from '@/views/LibraryView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import ConfirmSignUpView from "@/views/ConfirmSignUpView.vue";
import AdminDashboard from '@/views/Admin/AdminDashboard.vue';
import ManageAlbums from '@/views/Admin/ManageAlbums.vue';
import ManageArtists from '@/views/Admin/ManageArtists.vue';
import ManageGenres from "@/views/Admin/ManageGenres.vue";
import ManageTracks from "@/views/Admin/ManageTracks.vue";
import EditAlbum from '@/views/Admin/EditAlbum.vue';
import EditArtist from "@/views/Admin/EditArtist.vue";
import EditGenre from "@/views/Admin/EditGenre.vue";
import EditTrack from "@/views/Admin/EditTrack.vue";

const routes = [
  { path: '/', name: 'Landing', component: LandingView },
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/albums', name: 'Albums', component: AlbumsView },
  { path: '/browse', name: 'Browse', component: BrowseView },
  { path: '/library', name: 'Library', component: LibraryView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'SignUp', component: SignUpView },
  { path: '/confirm-signup', name: 'ConfirmSignUp', component: ConfirmSignUpView },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/admin/albums', name: 'ManageAlbums', component: ManageAlbums },
  { path: '/admin/artists', name: 'ManageArtists', component: ManageArtists },
  { path: '/admin/genres', name: 'ManageGenres', component: ManageGenres },
  { path: '/admin/tracks', name: 'ManageTracks', component: ManageTracks },
  { path: '/admin/albums/:albumId', name: 'EditAlbum', component: EditAlbum },
  { path: '/admin/artists/:artistId', name: 'EditArtist', component: EditArtist },
  { path: '/admin/genres/:genreId', name: 'EditGenre', component: EditGenre },
  { path: '/admin/tracks/:trackId', name: 'EditTrack', component: EditTrack },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
