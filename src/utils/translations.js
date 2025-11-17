import enTranslations from "../locales/en.json";
import deTranslations from "../locales/de.json";

const translations = {
    en: enTranslations,
    de: deTranslations,
};

export const getTranslation = (language, path) => {
    const keys = path.split(".");
    let value = translations[language] || translations.en;

    for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
            value = value[key];
        } else {
            // Fallback to English if translation not found
            value = translations.en;
            for (const fallbackKey of keys) {
                if (value && typeof value === "object" && fallbackKey in value) {
                    value = value[fallbackKey];
                } else {
                    return path; // Return path if translation not found
                }
            }
            return path;
        }
    }

    return value;
};

export default translations;

