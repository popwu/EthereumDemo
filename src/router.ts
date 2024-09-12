import { createRouter, createWebHistory } from 'vue-router'
import Layout from './components/Layout.vue'
import Account from './components/Account.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import HelloWorld from './components/HelloWorld.vue'
import Bip39 from './components/bip39.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'account', component: Account },
      { path: 'hello', component: HelloWorld },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'bip39', component: Bip39 },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
