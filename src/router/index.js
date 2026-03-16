import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectView from '@/views/ProjectView.vue'
import ProjectsDisplay from '@/components/Projects/ProjectsDisplay.vue'
import ProjectsShowcase from '@/components/Projects/ProjectsShowcase.vue'
import SkillsView from '@/views/SkillsView.vue'
import BlogView from '@/views/BlogView.vue'
import ContatoView from '@/views/ContatoView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
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
      children: [
        {
          path: '',
          redirect: { name: 'projetos-carrossel' },
        },
        {
          path: 'carrossel',
          name: 'projetos-carrossel',
          component: ProjectsDisplay,
        },
        {
          path: 'detalhe',
          name: 'projetos-detalhe',
          component: ProjectsShowcase,
        },
      ],
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
      path: '/blog/:id',
      name: 'blog-post',
      component: BlogPostView,
    },
    {
      path: '/contato',
      name: 'contato',
      component: ContatoView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
  ],
})

router.beforeEach((to) => {
  if (to.name === 'admin') {
    const token = sessionStorage.getItem('token')
    if (!token) {
      return { name: 'login' }
    }
  }
})

export default router
