import home from '@/components/Home/home'
import myMusic from '@/components/MyMusic/myMusic'
import newMusic from '@/components/NewMusic/newMusic'
import musicDetail from '@/components/MusicDetail/musicDetail'
import Player from '@/components/Player/Player'
import playervideo from '@/components/PlayerVideo/playervideo'
import searchdata from '@/components/SearchData/searchdata'
import comment from '@/components/Comment/comment'

const routes = [
  { path: '/', redirect: 'home/selfdom'},
  { path: '/home', redirect: 'home/selfdom'},
  { path: '/home/:type', component: home},
  { path: '/myMusic', component: myMusic},
  { path: '/newMusic', component: newMusic},
  { path: '/musicDetail/:id', component: musicDetail},
  { path: '/Player/:id', component: Player},
  { path: '/Player/', component: Player},
  { path: '/playervideo/:id', component: playervideo},
  { path: '/searchdata/:key', component: searchdata},
  { path: '/searchdata/', component: searchdata},
  { path: '/comment/:id', component: comment}
]

export default routes
