import { api } from 'src/boot/axios';
import dayjs from 'src/composables/dayjs';

const helpers = class {
  static getUrl() {
    return process.env.api;
  }

  static floatToMoney(float) {
    return parseFloat(float).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  static moneyToFloat(str) {
    if (this.isMoney(str)) {
      const cleanStr = str.replace(/[R$ .]/g, '');
      const floatStr = cleanStr.replace(',', '.');
      return parseFloat(floatStr);
    }
    return this.isNumber(str) ? parseFloat(str) : 0;
  }

  static isMoney(value) {
    const pattern = /^[R$]?[ ]?\d{1,3}(\.\d{3})*,[0-9]{2}$/;
    return pattern.test(value);
  }

  static isNumber(value) {
    if (!value) return false;
    return !isNaN(Number(value));
  }

  static convertToInteger(valor) {
    if (this.isNumber(valor)) {
      return parseInt(valor);
    } else {
      return 0;
    }
  }

  static limitString(str, num) {
    if (str.length > num) {
      return str.substring(0, num) + '...';
    }
    return str;
  }

  static brDate(str) {
    if (this.isValidDate(str)) {
      return dayjs(str).format('DD/MM/YYYY');
    }
    return null;
  }

  static brDateTime(str) {
    if (this.isValidDate(str)) {
      return dayjs(str).format('DD/MM/YYYY HH:mm:ss');
    }
    return null;
  }

  static usDate(str) {
    if (this.isValidDate(str)) {
      return dayjs(str).format('YYYY-MM-DD');
    }
    return null;
  }

  static usDateTime(str) {
    if (this.isValidDate(str)) {
      return dayjs(str).format('YYYY-MM-DD HH:mm:ss');
    }
  }

  static isValidDate(value, format = undefined) {
    if (value) {
      return dayjs(value, format).isValid();
    }
    return false;
  }

  static nifMask(str) {
    if (!str) {
      return null;
    }

    let mask;
    if (str.length === 11) {
      mask = '###.###.###-##';
    } else {
      mask = '##.###.###/####-##';
    }

    str = str.replace(/\s/g, '');

    for (let i = 0; i < str.length; i++) {
      mask = mask.replace(/#/, str.charAt(i));
    }

    return mask;
  }

  static phoneMask(str) {
    if (!str) {
      return null;
    }

    let mask = '(##) #####-####';

    str = str.replace(/\s/g, '');

    for (let i = 0; i < str.length; i++) {
      mask = mask.replace(/#/, str.charAt(i));
    }

    return mask;
  }

  static zipCodeMask(str) {
    if (!str) {
      return null;
    }

    let mask = '#####-###';

    str = str.replace(/\s/g, '');

    for (let i = 0; i < str.length; i++) {
      mask = mask.replace(/#/, str.charAt(i));
    }

    return mask;
  }

  static removeMask(str) {
    if (!str) {
      return str;
    }

    return str.replace(/[^A-Za-z0-9]/g, '');
  }

  static cpfCnpj(nif) {
    nif = this.removeMask(nif);

    if (nif.length === 11) {
      const result = this.validateCpf(nif);
      return result;
    } else {
      const result = this.validateCnpj(nif);
      return result;
    }
  }

  static validateCpf(cpf) {
    if (!cpf) {
      return true;
    }

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let mod;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    mod = (sum * 10) % 11;

    if (mod === 10 || mod === 11) {
      mod = 0;
    }

    if (mod !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    mod = (sum * 10) % 11;

    if (mod === 10 || mod === 11) {
      mod = 0;
    }

    if (mod !== parseInt(cpf.substring(10))) {
      return false;
    }

    return true;
  }

  static validateCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) {
      return false;
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * (i < 4 ? 5 - i : 13 - i);
    }
    let mod = sum % 11;
    const digit1 = mod < 2 ? 0 : 11 - mod;
    if (parseInt(cnpj.charAt(12)) !== digit1) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * (i < 5 ? 6 - i : 14 - i);
    }
    mod = sum % 11;
    const digit2 = mod < 2 ? 0 : 11 - mod;
    if (parseInt(cnpj.charAt(13)) !== digit2) {
      return false;
    }

    return true;
  }

  static async convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64File = reader.result;
        const fileName = file.name;

        resolve({ base64File, fileName });
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  static async convertFilesToBase64(files) {
    const filesArray = Array.isArray(files) ? files : [files];
    const validFiles = filesArray.filter((file) => file instanceof File);

    if (validFiles.length === 0) {
      return null;
    }

    const convertedFiles = await Promise.all(
      filesArray.map(async (file) => {
        const base64File = await this.convertFileToBase64(file);
        return base64File;
      })
    );

    return convertedFiles;
  }

  static validateEmail(email) {
    if (!email) {
      return true;
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
  }

  static async downloadFile(fileUrl, filename) {
    try {
      const response = await api({
        method: 'get',
        url: fileUrl,
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }

  static isHexColor(str) {
    const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
    return hexColorRegex.test(str);
  }
};

export default helpers;
