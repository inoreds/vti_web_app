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
  loader: () => import('./views/Dashboard/Dashboard'),
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

const Hotel = Loadable({
  loader: () => import('./views/Master/Hotel/Hotel'),
  loading: Loading,
});

const Airline = Loadable({
  loader: () => import('./views/Master/Airline/Airline'),
  loading: Loading,
});

const Batch = Loadable({
  loader: () => import('./views/Master/Batch/Batch'),
  loading: Loading,
});

const Kaos = Loadable({
  loader: () => import('./views/Master/Kaos/Kaos'),
  loading: Loading,
});

const Meal = Loadable({
  loader: () => import('./views/Master/Meal/Meal'),
  loading: Loading,
});

const DataTourReward = Loadable({
  loader: () => import('./views/DataTour/DataTourReward'),
  loading: Loading,
});

const DataTourRewardDetail = Loadable({
  loader: () => import('./views/DataTour/DataTourRewardDetail'),
  loading: Loading,
});

const Reward = Loadable({
  loader: () => import('./views/Reward/Reward'),
  loading: Loading,
})

const User = Loadable({
  loader: () => import('./views/User/User'),
  loading: Loading,
})

const DataUmum = Loadable({
  loader: () => import('./views/Report/DataUmum'),
  loading: Loading,
})

const DataKTP = Loadable({
  loader: () => import('./views/Report/DataKTP'),
  loading: Loading,
})

const DataPassport = Loadable({
  loader: () => import('./views/Report/DataPassport'),
  loading: Loading,
})

const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, exact: true  },
  { path: '/dashboard/:reward_id/tour_reward', name: 'Data Tour Reward', component: DataTourReward, exact: true  },
  { path: '/dashboard/:reward_id/tour_reward/:id', name: 'Reward Detail', component: DataTourRewardDetail, exact: true  },
  { path: '/reward', name: 'Reward', component: Reward, exact: true  },
  { path: '/reward/:reward_id/tour_reward', name: 'Data Tour Reward', component: DataTourReward, exact: true  },
  { path: '/reward/:reward_id/tour_reward/:id', name: 'Reward Detail', component: DataTourRewardDetail, exact: true  },
  { path: '/grup_user', name: 'Grup Pengguna', component: GrupPengguna, exact: true },
  { path: '/grup_user/:id/user', name: 'Pengguna', component: Pengguna },
  { path: '/master/hotel', name: 'Master Hotel', component: Hotel },
  { path: '/master/kaos', name: 'Master Kaos', component: Kaos },
  { path: '/master/batch', name: 'Master Batch', component: Batch },
  { path: '/master/meal', name: 'Master Meal', component: Meal },
  { path: '/master/airline', name: 'Master Airline', component: Airline },
  { path: '/user', name: 'Data User', component: User },
  { path: '/report/data_umum', name: 'Report Umum', component: DataUmum },
  { path: '/report/data_ktp', name: 'Report KTP', component: DataKTP },
  { path: '/report/data_passport', name: 'Report Passport', component: DataPassport },
];

export default routes;
