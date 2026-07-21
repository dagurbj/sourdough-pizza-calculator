import { createRouter, createWebHistory } from 'vue-router';
import PizzaCalculator from '../PizzaCalculator.vue';
import BreadCalculator from '../BreadCalculator.vue';

const SITE_NAME = 'Sourdough Pizza Calculator';
const SITE_DESCRIPTION = 'Sourdough pizza and bread calculator for creating perfect dough recipes with a sourdough starter.';
const SITE_URL = 'https://sourdoughpizza.cloud';

function updateHeadElement(selector, createTag, attributes, value) {
  if (typeof document === 'undefined') {
    return;
  }

  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement(createTag);
    Object.entries(attributes).forEach(([key, attributeValue]) => {
      element.setAttribute(key, attributeValue);
    });
    document.head.appendChild(element);
  }

  element.setAttribute('content', value);
}

function updateCanonical(href) {
  if (typeof document === 'undefined') {
    return;
  }

  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

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
  const title = to.meta.title || SITE_NAME;
  const description = to.meta.description || SITE_DESCRIPTION;
  const canonicalUrl = new URL(to.path, SITE_URL).href;

  if (typeof document !== 'undefined') {
    document.title = title;
  }

  updateHeadElement('meta[name="description"]', 'meta', { name: 'description' }, description);
  updateHeadElement('meta[property="og:title"]', 'meta', { property: 'og:title' }, title);
  updateHeadElement('meta[property="og:description"]', 'meta', { property: 'og:description' }, description);
  updateHeadElement('meta[property="og:type"]', 'meta', { property: 'og:type' }, 'website');
  updateHeadElement('meta[property="og:url"]', 'meta', { property: 'og:url' }, canonicalUrl);
  updateCanonical(canonicalUrl);
});

export default router;
