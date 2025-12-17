import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@contexts/LanguageContext';
import { getTranslation } from '@utils/translations';

const PrivacyConsent = () => {
    const [show, setShow] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        const consent = localStorage.getItem('privacy-consent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('privacy-consent', 'true');
        setShow(false);
    };

    if (!show) return null;

    const text = getTranslation(language, 'privacyConsent.text') || "We use cookies to improve your experience. By using our site, you agree to our";
    const terms = getTranslation(language, 'privacyConsent.terms') || "Terms & Conditions";
    const and = getTranslation(language, 'privacyConsent.and') || "and";
    const privacy = getTranslation(language, 'privacyConsent.privacy') || "Privacy Policy";
    const accept = getTranslation(language, 'privacyConsent.accept') || "Accept";

    return (
        <div className="privacy-consent-banner">
            <div className="content">
                <p>
                    {text} <Link href="/terms-condition" className="consent-link">{terms}</Link> {and} <Link href="/privacy-policy" className="consent-link">{privacy}</Link>.
                </p>
            </div>
            <button className="btn btn-primary-alta" onClick={handleAccept}>{accept}</button>
            <style jsx>{`
                .privacy-consent-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: var(--background-color-4);
                    border-top: 1px solid var(--color-border);
                    padding: 20px;
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
                    gap: 20px;
                }
                .content p {
                    margin: 0;
                    font-size: 14px;
                    color: var(--color-body);
                }
                .consent-link {
                    color: var(--color-primary);
                    text-decoration: underline;
                    cursor: pointer;
                }

                /* Light Mode Overrides */
                :global(html[data-theme="light"]) .privacy-consent-banner {
                    background-color: var(--color-white);
                    border-top: 1px solid var(--color-light);
                    box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
                }
                :global(html[data-theme="light"]) .content p {
                    color: var(--color-light-body);
                }

                /* Light Mode: make links black for better contrast */
                :global(html[data-theme="light"]) .privacy-consent-banner .consent-link {
                    color: #000000;
                }
                :global(html[data-theme="light"]) .privacy-consent-banner .consent-link:hover {
                    color: #000000;
                    text-decoration: underline;
                }

                @media (max-width: 768px) {
                    .privacy-consent-banner {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default PrivacyConsent;
