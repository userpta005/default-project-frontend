import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  /* PUBLIC */
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/not-allowed',
    name: 'not-allowed',
    component: () => import('pages/ErrorNotAllowed.vue'),
  },
  {
    path: '/email-not-verified',
    name: 'email-not-verified',
    component: () => import('pages/ErrorEmailNotVerified.vue'),
  },
  {
    path: '/dev',
    name: 'dev',
    component: () => import('src/pages/DevPage.vue'),
  },

  /* GUEST */
  {
    path: '/',
    component: () => import('src/layouts/guest/MainLayout.vue'),
    children: [
      {
        path: '',
        meta: { guest: true },
        component: () => import('src/pages/guest/LoginPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        meta: { guest: true },
        component: () => import('src/pages/guest/LoginPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        meta: { guest: true },
        component: () => import('src/pages/guest/ForgotPassword.vue'),
      },
      {
        path: 'password-reset/:token',
        name: 'password-reset',
        meta: { guest: true },
        component: () => import('src/pages/guest/PasswordReset.vue'),
      },
      {
        path: '/verify-email/:id/:hash',
        name: 'verify-email',
        component: () => import('src/pages/guest/VerifyEmail.vue'),
      },
    ],
  },

  /* FRONTOFFICE */
  {
    path: '/',
    meta: { auth: true, verified_email_required: true, permission: 'frontoffice_domain' },
    component: () => import('src/layouts/auth/frontoffice/MainLayout.vue'),
    children: [
      {
        path: '',
        meta: { permission: 'frontoffice.painel_page' },
        component: () => import('src/pages/auth/frontoffice/PainelPage.vue'),
      },
      {
        path: 'painel',
        name: 'frontoffice.painel',
        meta: { permission: 'frontoffice.painel_page' },
        component: () => import('src/pages/auth/frontoffice/PainelPage.vue'),
      },
    ],
  },

  /* BACKOFFICE */
  {
    path: '/admin',
    meta: { auth: true, verified_email_required: true, permission: 'backoffice_domain' },
    component: () => import('src/layouts/auth/backoffice/MainLayout.vue'),
    children: [
      {
        path: '',
        meta: { permission: 'backoffice.painel_page' },
        component: () => import('src/pages/auth/backoffice/PainelPage.vue'),
      },
      {
        path: 'painel',
        name: 'backoffice.painel',
        meta: { permission: 'backoffice.painel_page' },
        component: () => import('src/pages/auth/backoffice/PainelPage.vue'),
      },
    ],
  },
];

export default routes;
