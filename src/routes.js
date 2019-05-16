import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Login = Loadable({
  loader: () => import ('./views/Login'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const GrupPengguna = Loadable({
  loader: () => import('./views/UserManagement/GrupPengguna/GrupPengguna'),
  loading: Loading,
});

const Pengguna = Loadable({
  loader: () => import('./views/UserManagement/Pengguna/Pengguna'),
  loading: Loading,
});

const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/grup_user', name: 'Grup Pengguna', component: GrupPengguna, exact: true },
  { path: '/grup_user/:id/user', name: 'Pengguna', component: Pengguna },
  
];

export default routes;
