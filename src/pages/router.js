import * as VueRouter from 'vue-router';

// import Index from './Index.vue';
import JavaClass from './JavaClass.vue';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory('/'),
    routes: [
        {
            path: '/',
            component: JavaClass,
            // component: Index,
        },
        {
            path: '/class',
            component: JavaClass,
        },
    ],
});

export default router;