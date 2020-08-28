import Layout from '../components/Layout';
import Login from '../components/Login';

export const PUBLIC_ROUTE = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

export const PRIVATE_ROUTE = [
  {
    path: '/',
    name: 'home',
    component: Layout,
  },
];
