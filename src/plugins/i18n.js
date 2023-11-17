// import Vue from 'vue';
import { createI18n } from "vue-i18n";

// Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context(
    "@/locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const matched = key.match(/([A-Za-z0-9-_]+)\//i);
      const matchedModule = key.match(/([A-Za-z0-9-_]+)\./i);
      if (
        matched &&
        matched.length > 1 &&
        matched &&
        matchedModule.length > 1
      ) {
        const locale = matched[1];
        const module = matchedModule[1];
        if (!messages[locale]) messages[locale] = {};
        messages[locale][module] = locales(key);
      }
    }
  });
  return messages;
}

// const getLng = localStorage.getItem("lng");
// const currentLng = getLng === "kh" ? getLng : "en";
// import { useI18nStore } from "@/lib/state/i18n/i18n";
// import { storeToRefs } from "pinia";
// const { lng } = storeToRefs(useI18nStore());

const i18n = createI18n({
  locale: 'en', // set locale
  // fallbackLocale: "kh",
  messages: loadLocaleMessages(), // set locale messages
});

export default i18n;

export const t = (key) => {
  return i18n.global.t(key);
};

// export const lng = currentLng;