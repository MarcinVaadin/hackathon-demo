import { Router } from '@vaadin/router';
import { routes } from './routes.js';
import { appStore } from './stores/app-store.js';
import './component-helper';
export const router = new Router(document.querySelector('#outlet'));
import { Buffer } from 'buffer/'

// fix for missing Buffer
window.Buffer = Buffer as any

router.setRoutes(routes);

window.addEventListener('vaadin-router-location-changed', (e) => {
  appStore.setLocation((e as CustomEvent).detail.location);
  const title = appStore.currentViewTitle;
  if (title) {
    document.title = title + ' | ' + appStore.applicationName;
  } else {
    document.title = appStore.applicationName;
  }
});
