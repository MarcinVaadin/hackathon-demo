import { Flow } from '@vaadin/flow-frontend';
import type { Route } from '@vaadin/router';
import './views/main-layout';

const { serverSideRoutes } = new Flow({
  imports: () => import('Frontend/generated/flow/generated-flow-imports'),
});

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // Place routes below (more info https://hilla.dev/docs/routing)
  {
    path: 'hello-world',
    component: 'hello-world-view',
    icon: 'globe-solid',
    title: 'Hello World',
    action: async (_context, _command) => {
      await import('./views/helloworld/hello-world-view.js');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [
      ...views,
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];
