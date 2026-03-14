import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectView from '@/views/ProjectView.vue'
import SkillsView from '@/views/SkillsView.vue'
import BlogView from '@/views/BlogView.vue'
import ContatoView from '@/views/ContatoView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: AboutView,
    },
    {
      path: '/projetos',
      name: 'projetos',
      component: ProjectView,
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
    },
    {
      path: '/contato',
      name: 'contato',
      component: ContatoView,
    },
  ],
})

export default router
