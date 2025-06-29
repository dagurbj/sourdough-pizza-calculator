import { createRouter, createWebHistory } from 'vue-router';
import PizzaCalculator from '../PizzaCalculator.vue';
import BreadCalculator from '../BreadCalculator.vue';

const routes = [
  {
    path: '/',
    name: 'PizzaCalculator',
    component: PizzaCalculator,
    meta: {
      title: 'Sourdough Pizza Dough Calculator',
      description: 'Online calculator for scaling sourdough pizza dough recipes.'
    }
  },
  {
    path: '/bread',
    name: 'BreadCalculator',
    component: BreadCalculator,
    meta: {
      title: 'Sourdough Bread Calculator',
      description: 'Create and scale Tartine style sourdough bread recipes.'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  const defaultTitle = 'Sourdough Pizza Calculator';
  document.title = to.meta.title || defaultTitle;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || 'Sourdough pizza and bread dough calculator.');
  }
});

export default router;
