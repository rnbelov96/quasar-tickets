import { isAuthenticated } from "src/middlewares";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/IndexPage.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isAuthenticated],
      breadcrumbs: [
        {
          text: "Главная",
        },
      ],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/LoginPage.vue"),
    meta: { layout: "AppLayoutSimple" },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import("../pages/ProfilePage.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isAuthenticated],
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "Профиль",
        },
      ],
    },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: () => import("../pages/IndexPage.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isAuthenticated],
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "Мои тикеты",
        },
      ],
    },
  },
  {
    path: "/tickets/:id",
    name: "Ticket",
    component: () => import("../pages/TicketPage.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isAuthenticated],
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "Тикет",
        },
      ],
    },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
