import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView.vue';
import HomeView from '../views/HomeView.vue';
import AlbumsView from '../views/AlbumsView.vue';
import BrowseView  from "@/views/BrowseView.vue";
import LibraryView from "@/views/LibraryView.vue";
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';

const routes = [
  { path: '/', name: 'Landing', component: LandingView },
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/albums', name: 'Albums', component: AlbumsView },
  { path: '/browse', name: 'Browse', component: BrowseView },
  { path: '/library', name: 'Library', component: LibraryView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'SignUp', component: SignUpView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.name === 'Login' || to.name === 'SignUp') && isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;
