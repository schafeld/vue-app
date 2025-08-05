import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const pageStore = usePageStore();
  
  // Reset page title before navigation
  pageStore.resetTitle();
  
  // Ensure the session is updated before a navigation guard runs
  await authStore.getSession();

  const isAuthPage = ['/login', '/register'].includes(to.path);

  if (!authStore.user && !isAuthPage) {
    return { name: '/login' }
  }

  if (authStore.user && isAuthPage) {
    return { name: '/' }
  }
})

// Optional: Auto-set page titles based on route meta or route name
router.afterEach((to) => {
  const pageStore = usePageStore();
  
  // If route has a meta title, use it as fallback
  if (to.meta?.title && !pageStore.pageData.title) {
    pageStore.setPageTitle(to.meta.title as string);
  }
  
  // You can also set default titles based on route names
  const routeTitles: Record<string, string> = {
    '/': 'Homepage',
    '/projects': 'Projects',
    '/tasks': 'Tasks',
    '/builder': 'Builder',
    '/login': 'Login',
    '/register': 'Register',
  };
  
  if (!pageStore.pageData.title && routeTitles[to.path]) {
    pageStore.setPageTitle(routeTitles[to.path]);
  }
})

export default router
