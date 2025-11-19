import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

// RTL languages
const RTL_LANGUAGES = ["ar"];

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [direction, setDirection] = useState("ltr");

    useEffect(() => {
        // Load language from localStorage on mount
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de" || savedLanguage === "ar")) {
            setLanguage(savedLanguage);
            setDirection(RTL_LANGUAGES.includes(savedLanguage) ? "rtl" : "ltr");
        }
    }, []);

    useEffect(() => {
        // Update document direction when language changes
        const isRTL = RTL_LANGUAGES.includes(language);
        const newDirection = isRTL ? "rtl" : "ltr";
        setDirection(newDirection);
        
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("dir", newDirection);
            document.documentElement.setAttribute("lang", language);
        }
    }, [language]);

    const changeLanguage = (lang) => {
        if (lang === "en" || lang === "de" || lang === "ar") {
            setLanguage(lang);
            localStorage.setItem("language", lang);
            const isRTL = RTL_LANGUAGES.includes(lang);
            const newDirection = isRTL ? "rtl" : "ltr";
            setDirection(newDirection);
            
            if (typeof document !== "undefined") {
                document.documentElement.setAttribute("dir", newDirection);
                document.documentElement.setAttribute("lang", lang);
            }
        }
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, direction }}>
            {children}
        </LanguageContext.Provider>
    );
};

LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

