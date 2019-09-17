/* eslint-disable */

const routes = [
  {
    path: '/',
    redirect: '/findmusic/recommend'
  },
  {
    path: '/findmusic',
    component: resolve => require(['../components/findMusic/findMusic.vue'], resolve),
    children: [
      {
        name: 'findmusic',
        path: '/',
        redirect: 'recommend'
      },
      {
        name: 'recommend',
        path: 'recommend',
        component: resolve => {
          require(['../components/recommend/recommend.vue'], resolve);
        }
      },
      {
        name: 'playlist',
        path: 'playlist',
        component: resolve => {
          require(['../components/playList/playList.vue'], resolve);
        }
      }
    ]
  },
  {
    name: 'mymusic',
    path: '/mymusic',
    component: resolve => require(['../components/myMusic/myMusic.vue'], resolve)
  }
]

export default routes;
