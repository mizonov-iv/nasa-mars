import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import RoverSelectView from "../views/RoverSelectView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomeView
        },
        {
            path: '/',
            component: RoverSelectView
        },
    ]
})