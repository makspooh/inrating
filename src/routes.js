import VueRouter from 'vue-router'
import Home from './pages/Home'
import Edit from './pages/Edit'

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/edit',
            component: Edit
        }
    ],
    mode: 'history'
})