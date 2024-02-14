import { Notify } from 'quasar';

const notify = {
  success: (message) => {
    Notify.create({
      type: 'positive',
      message: message || 'Sucesso !',
    });
  },
  error: (message) => {
    Notify.create({
      type: 'negative',
      message: message || 'Erro !',
    });
  },
  info: (message) => {
    Notify.create({
      type: 'info',
      message: message || 'Informação !',
    });
  },
  warning: (message) => {
    Notify.create({
      type: 'warning',
      message: message || 'Aviso !',
    });
  },
};

export default notify;
