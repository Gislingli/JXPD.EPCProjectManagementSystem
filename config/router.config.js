export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'owner','projectDesign','projectLeader','leader'],
    routes: [
      {path:'/',redirect:'/workplace/workplace'},
      {
        path:'/workplace',
        name:'工作台',
        icon:'laptop',
        routes:[
          {
            path:'/workplace/workplace',
            name:'个人面板',
            locale:'menu.workplace.workplace',
            component:'./Workplace/Workplace',
            hideInMenu:true
          },
          {
            path:'/workplace/analysis',
            name:'建设概况',
            locale:'menu.workplace.analysis',
            component:'./Workplace/Analysis'
          },
          {
            path:'/workplace/setting',
            name:'账户设置',
            component:'./Workplace/Setting'
          }
        ]
      },
      {
        path:'/cluster',
        name:'综合目录',
        icon:'bars',
        component:'./Cluster/Catalog'
      },
      {
        path:'/projects',
        name:'项目',
        icon:'home',
        routes:[
          {
            path:'/projects/list',
            name:'项目清单',
            component:'./Projects/List',
       
          }
          ,
          {
            path:'/projects/list/add',
            name:'项目新增',
            component:'./Projects/Add',
            hideInMenu:true
          }
          ,
          {
            path:'/projects/list/details/edit/:id',
            name:'项目编辑',
            component:'./Projects/Edit',
            hideInMenu:true,
          },
          {
            path:'/projects/list/details/:id',
            name:'项目详情',
            component:'./Projects/Details',
            hideInMenu:true
          }
          ,
          {
            path:'/projects/list/details/progress/:id',
            name:'进程管理',
            component:'./Projects/Progress',
            hideInMenu:true
          }
        ]
      },
      {
        path:'/engineering',
        name:'工程管理',
        icon:'home',
        routes:[
          {
            path:'/engineering/list',
            name:'工程清单',
            component:'./Engineering/List'
          },
          {
            path:'/engineering/add',
            name:'工程新增',
            component:'./Engineering/Add'
          },
          {
            path:'/engineering/details/:id',
            name:'工程详情',
            component:'./Engineering/Details',
            hideInMenu:true
          },
          {
            path:'/engineering/edit/:id',
            name:'工程编辑',
            component:'./Engineering/Edit',
            hideInMenu:true
          }
        ]
      },
      {
        path:'/bidSection',
        name:'标段管理',
        icon:'snippets',
        hideInMenu:true,
        routes:[
          {
            path:'/bidSection/list/:id',
            name:'标段清单',
            component:'./BidSection/List'
          },
          {
            path:'/bidSection/add',
            name:'标段新增',
            component:'./BidSection/Add'
          },
          {
            path:'/bidSection/details/:id',
            name:'标段详情',
            component:'./BidSection/Details',
          },
          {
            path:'/bidSection/edit/:id',
            name:'标段编辑',
            component:'./BidSection/Edit',
          },
          {
            path:'/bidSection/doc/:id',
            name:'资料管理',
            hideInMenu:false,
            component:'./BidSection/Doc',
          },
          {
            path:'/bidSection/progress/:id',
            name:'进度管理',
            component:'./BidSection/Progress',
          },
          {
            path:'/bidSection/sec/:id',
            name:'质安管理',
            component:'./BidSection/Sec',
          },
          {
            path:'/bidSection/design/:id',
            name:'设计管理',
            component:'./BidSection/Design',
          }
        ]
      }
      ,
      {
        path:'/contacts',
        name:'通讯录管理',
        icon:'read',
        routes:[
          {
            path:'/contacts/users',
            name:'人员管理',
            component:'./Contacts/Users'
          },
          {
            path:'/contacts/userAdd',
            name:'人员新增',
            component:'./Contacts/UserAdd'
          },
          {
            path:'/contacts/userEdit/:id',
            name:'人员编辑',
            component:'./Contacts/UserEdit',
            hideInMenu:true,
          },
          {
            path:'/contacts/groups',
            name:'单位组织管理',
            component:'./Contacts/Groups'
          },
          {
            path:'/contacts/groupAdd',
            name:'单位组织新增',
            component:'./Contacts/GroupAdd'
          },
          {
            path:'/contacts/groupEdit',
            name:'单位组织编辑',
            component:'./Contacts/GroupEdit',
            hideInMenu:true,
          }
        ]
      },
      {
        path:'/warehouse',
        name:'资料库管理',
        icon:'folder',
        routes:[
          {
            path:'/warehouse/eglist',
            name:'工程资料库',
            component:'./Warehouse/EGList'
          },
          {
            path:'/warehouse/bidlist',
            name:'标段资料库',
            component:'./Warehouse/BidList'
          },
          {
            path:'/warehouse/pjlist',
            name:'项目资料库',
            component:'./Warehouse/PjList'
          }
        ]
      },
      {
        path:'/config',
        name:'配置管理',
        icon:'setting',
        routes:[
          {
            path:'/setting/progressNodes',
            name:'项目进度节点',
            component:'./Setting/ProgressNodes'
          },
          {
            path:'/setting/groups',
            name:'单位组织类型',
            component:'./Setting/Groups'
          },
          {
            path:'/setting/doc',
            name:'资料管理模块',
            component:'./Setting/Doc'
          },
          {
            path:'/setting/design',
            name:'设计管理模块',
            component:'./Setting/Design'
          },
          {
            path:'/setting/sec',
            name:'质安管理模块',
            component:'./Setting/Sec'
          }
        ]
      },
      // {
      //   path:'/UserCenter',
      //   name:'个人中心',
      //   icon:'user',
      //   routes:[
      //     {
      //       path:'/UserCenter/Messages',
      //       name:'个人消息',
      //       component:'/UserCenter/Messages'
      //     },
      //     {
      //       path:'/UserCenter/Settings',
      //       name:'账户设置',
      //       component:'/UserCenter/Settings'
      //     }
      //   ]
      // },
      // dashboard
      // { path: '/', redirect: '/dashboard/analysis' },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      // // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //         {
      //           path: '/list/search/applications',
      //           name: 'applications',
      //           component: './List/Applications',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   icon: 'profile',
      //   routes: [
      //     // profile
      //     {
      //       path: '/profile/basic',
      //       name: 'basic',
      //       component: './Profile/BasicProfile',
      //     },
      //     {
      //       path: '/profile/advanced',
      //       name: 'advanced',
      //       authority: ['admin'],
      //       component: './Profile/AdvancedProfile',
      //     },
      //   ],
      // },
      // {
      //   name: 'result',
      //   icon: 'check-circle-o',
      //   path: '/result',
      //   routes: [
      //     // result
      //     {
      //       path: '/result/success',
      //       name: 'success',
      //       component: './Result/Success',
      //     },
      //     { path: '/result/fail', name: 'fail', component: './Result/Error' },
      //   ],
      // },
      {
        name: '异常处理',
        icon: 'warning',
        path: '/exception',
        hideInMenu:true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: '暂无权限',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: '页面缺失',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: '服务端异常',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: '异常触发',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      // {
      //   name: 'account',
      //   icon: 'user',
      //   path: '/account',
      //   routes: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: './Account/Center/Center',
      //       routes: [
      //         {
      //           path: '/account/center',
      //           redirect: '/account/center/articles',
      //         },
      //         {
      //           path: '/account/center/articles',
      //           component: './Account/Center/Articles',
      //         },
      //         {
      //           path: '/account/center/applications',
      //           component: './Account/Center/Applications',
      //         },
      //         {
      //           path: '/account/center/projects',
      //           component: './Account/Center/Projects',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: './Account/Settings/Info',
      //       routes: [
      //         {
      //           path: '/account/settings',
      //           redirect: '/account/settings/base',
      //         },
      //         {
      //           path: '/account/settings/base',
      //           component: './Account/Settings/BaseView',
      //         },
      //         {
      //           path: '/account/settings/security',
      //           component: './Account/Settings/SecurityView',
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           component: './Account/Settings/BindingView',
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           component: './Account/Settings/NotificationView',
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },
];
