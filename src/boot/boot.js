import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/auth';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

export default boot(({ app, store, router }) => {
  app.component('QuillEditor', QuillEditor);

  const auth = useAuthStore(store);

  router.beforeEach(async (to) => {
    if (!auth.isAuthenticated) {
      if (!!to.meta.auth) {
        return { name: 'login' };
      }
    }

    if (!!auth.isAuthenticated) {
      if (!!to.meta.guest) {
        return { name: 'frontoffice.painel' };
      }

      if (!auth.user?.email_verified_at && !!to.meta.verified_email_required) {
        return { name: 'email-not-verified' };
      }

      if ('permission' in to.meta && !auth.hasPermission(to.meta.permission)) {
        return { name: 'not-allowed' };
      }
    }
  });
});
