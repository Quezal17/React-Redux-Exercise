import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import eng_transl from '../translations/en.json';
import ita_transl from '../translations/it.json';

const resources = {
    en: {
        translation: eng_transl
    },
    it: {
        translation: ita_transl
    }
}

i18n
.use(initReactI18next)
.init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
        escapeValue:false
    }
});

export default i18n;