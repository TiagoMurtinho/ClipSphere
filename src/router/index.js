import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShortsView from '@/views/ShortsView.vue'
import SubscriptionsView from '@/views/SubscriptionsView.vue'
import TrendingView from '@/views/TrendingView.vue'
import MusicView from '@/views/MusicView.vue'
import MoviesView from '@/views/MoviesView.vue'
import GamingView from '@/views/GamingView.vue'
import SportsView from '@/views/SportsView.vue'
import PodcastsView from '@/views/PodcastsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/shorts',
      name: 'shorts',
      component: ShortsView
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: SubscriptionsView
    },
    {
      path: '/trending',
      name: 'trending',
      component: TrendingView
    },
    {
      path: '/music',
      name: 'music',
      component: MusicView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/gaming',
      name: 'gaming',
      component: GamingView
    },
    {
      path: '/sports',
      name: 'sports',
      component: SportsView
    },
    {
      path: '/podcasts',
      name: 'podcasts',
      component: PodcastsView
    }
  ]
})

export default router
