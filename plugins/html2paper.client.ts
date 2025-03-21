import VueHtmlToPaper from 'vue-html-to-paper';

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    name: '_blank',
    specs: [
      'fullscreen=yes',
      'titlebar=yes',
      'scrollbars=yes',
    ],
    styles: [
      'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
    ],
    timeout: 1000,
    autoClose: false,
    windowTitle: window.document.title,
  };

  // const htmlToPaper: Plugin = VueHtmlToPaper as unknown as Plugin;
  nuxtApp.vueApp.use(VueHtmlToPaper, options);
});