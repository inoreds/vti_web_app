import "./assets/tokopedia/tokopedia.css";

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    // {
    //   name: 'Data Tour',
    //   url: '/tour',
    //   icon: 'icon-basket-loaded',
    // },
    {
      name: 'Reward',
      url: '/reward',
      icon: 'fa fa-dollar',
    },
    {
      name: 'Master',
      url: '/master',
      icon: 'icon-briefcase',
      children: [
        {
          name: 'Hotel',
          url: '/master/hotel',
          icon: 'icon-puzzle',
        },
        {
          name: 'Meal',
          url: '/master/meal',
          icon: 'icon-puzzle',
        },
        {
          name: 'Batch',
          url: '/master/batch',
          icon: 'icon-puzzle',
        },
        {
          name: 'Kaos',
          url: '/master/kaos',
          icon: 'icon-puzzle',
        },
        {
          name: 'Airline',
          url: '/master/airline',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Report',
      url: '/report',
      icon: 'icon-note',
      children : [
        {
          name: 'Data Umum',
          url : '/report/data_umum',
          icon : 'icon-puzzle'
        },
        {
          name : 'Data KTP',
          url : '/report/data_ktp',
          icon : 'icon-puzzle'
        },
        {
          name : 'Data Passport',
          url : '/report/data_passport',
          icon : 'icon-puzzle'
        }
      ]
    },  
    {
      name: 'User',
      url: '/user',
      icon: 'icon-people',
    },    
  ]
};
