import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todo from '../views/Todo.vue'
import LeafMap from '../views/LeafMap.vue'
import Expenses from '../views/Expenses.vue'
import Cantavit from '../views/Cantavit.vue'
// import Analysis from '../views/Analysis.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/leafmap',
    name: 'LeafMap',
    component: LeafMap
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
    // children: [
    //   {
    //     path: 'analysis',
    //     name: 'Analysis',
    //     component: Analysis
    //   }
    // ],
  },
  {
    path: '/cantavit',
    name: 'Cantavit',
    component: Cantavit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
