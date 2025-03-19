const routes = [
  {
    path: "/",
    component: () => import("pages/IndexPage.vue"),
  },
  {
    path: "/about",
    component: () => import("pages/AboutPage.vue"),
  },
  {
    path: "/registration",
    component: () => import("pages/RegistrationPage.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/createFile",
    component: () => import("pages/CreateFilePage.vue"),
  },
  {
    path: "/createNote",
    component: () => import("pages/CreateNote.vue"),
  },
  {
    path: "/files",
    component: () => import("src/components/Files/ViewFilesPage.vue"),
  },
  {
    path: "/viewNotes/:fileId",
    component: () => import("components/Notes/ViewNotes.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
