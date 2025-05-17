const routes = [
  {
    path: "/",
    component: () => import("pages/IndexPage.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/RegistrationPage.vue"),
  },
  {
    path: "/create-file",
    component: () => import("pages/File/CreateFile.vue"),
  },
  {
    path: "/get-file",
    component: () => import("pages/File/GetFile.vue"),
  },
  {
    path: "/trash",
    component: () => import("pages/File/TrashedFile.vue"),
  },
  {
    path: "/create-document",
    component: () => import("pages/Document/CreateDocument.vue"),
  },
  {
    path: "/view-notes/:id",
    component: () => import("pages/Document/ViewDocument.vue"),
  },
  {
    path: '/update-note/:id',
    component: () => import("pages/Document/UpdateDocument.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
