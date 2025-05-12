import { createRouter, createWebHistory } from 'vue-router';
import PizzaCalculator from '../PizzaCalculator.vue';
import BreadCalculator from '../BreadCalculator.vue';

const routes = [
  {
    path: '/',
    name: 'PizzaCalculator',
    component: PizzaCalculator
  },
  {
    path: '/bread',
    name: 'BreadCalculator',
    component: BreadCalculator
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
