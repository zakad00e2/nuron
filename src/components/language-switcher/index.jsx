import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useLanguage } from "@contexts/LanguageContext";

const LanguageSwitcher = ({ className }) => {
    const { language, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "de", name: "Deutsch", flag: "🇩🇪" },
    ];

    const currentLanguage = languages.find((lang) => lang.code === language);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div
            className={clsx("language-switcher", isOpen && "open", className)}
            ref={dropdownRef}
        >
            <div className="icon-box">
                <button
                    type="button"
                    className="language-switcher-button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Change language"
                >
                    <span className="language-flag">{currentLanguage?.flag}</span>
                    <span className="language-name">{currentLanguage?.name}</span>
                    <i className="feather-chevron-down" />
                </button>
            </div>
            {isOpen && (
                <div className="language-switcher-dropdown">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            className={clsx(
                                "language-switcher-item",
                                language === lang.code && "active"
                            )}
                            onClick={() => handleLanguageChange(lang.code)}
                        >
                            <span className="language-flag">{lang.flag}</span>
                            <span className="language-name">{lang.name}</span>
                            {language === lang.code && (
                                <i className="feather-check" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

LanguageSwitcher.propTypes = {
    className: PropTypes.string,
};

export default LanguageSwitcher;

