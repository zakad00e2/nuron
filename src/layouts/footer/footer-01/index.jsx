import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";
import { ItemType } from "@utils/types";

// Demo data
import footerData from "../../../data/general/footer-01.json";
import contactData from "../../../data/general/contact.json";

const Footer = ({ space = 1, className, data, copyright }) => {
    const { language } = useLanguage();
    const [apiFacebookLink, setApiFacebookLink] = useState(null);
    const currentYear = new Date().getFullYear();
    
    const pagesTitle = getTranslation(language, "footer.pagesTitle");
    const followUsTitle = getTranslation(language, "footer.followUsTitle");
    const facebookTitle = getTranslation(language, "footer.facebook") || "Facebook";
    const copyrightText = copyright || getTranslation(language, "footer.copyrightText") || footerData.copyright_text;
    
    const footerLinks = footerData["quicklink-widget"]?.menu || [];
    const facebookLink = contactData.socials.find(social => social.title === "Facebook");

    useEffect(() => {
        let isMounted = true;
        const fetchFooterLinks = async () => {
            try {
                const response = await fetch(`https://brilliant-boot-036dae9a94.strapiapp.com/api/homepage?locale=${language}&populate=*`);
                if (response.ok) {
                    const data = await response.json();
                    if (isMounted && data.data && data.data.footer_links) {
                        const fbLink = data.data.footer_links.find(link => link.Label.toLowerCase() === "facebook");
                        if (fbLink) {
                            setApiFacebookLink(fbLink.URL);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching footer links:", error);
            }
        };
        fetchFooterLinks();
        return () => { isMounted = false; };
    }, [language]);

    return (
        <>
            {data?.items && (
                <div className="footer-top bg-color--1">
                    <div className="container">
                        <div className="row">
                            <ul className="nu-brand-area">
                                {data.items.map(({ id, image }) => (
                                    <li key={id}>
                                        {image?.src && (
                                            <Image
                                                src={image.src}
                                                alt={
                                                    image?.alt ||
                                                    "nuron-brand_nft"
                                                }
                                                sizes="200px"
                                                fill
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            
            <footer
                className={clsx(
                    "rn-footer-enhanced bg-color--1 border-top-footer",
                    space === 1 && "mt--100 mt_md--80 mt_sm--80",
                    space === 2 && "mt--80",
                    space === 3 && "mt--100 mt_md--80 mt_sm--80",
                    className
                )}
            >
                <div className="container py--60">
                    <div className="row g-5">
                        {/* Links Section */}
                        <div className="col-lg-6 col-md-6 col-6">
                            <div className="footer-section">
                                <h3 className="footer-section-title">{pagesTitle}</h3>
                                <div className="footer-links-grid">
                                    {footerLinks.map((link) => (
                                        <Anchor
                                            key={link.id}
                                            path={link.path}
                                            className="footer-link-item"
                                        >
                                            {getTranslation(language, `footer.pages.${link.text.toLowerCase()}`)}
                                        </Anchor>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Social Section */}
                        <div className="col-lg-6 col-md-6 col-6">
                            <div className="footer-section">
                                <h3 className="footer-section-title">{followUsTitle}</h3>
                                {facebookLink && (
                                    <a
                                        href={apiFacebookLink || facebookLink.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-link"
                                    >
                                        <i className={facebookLink.icon}></i>
                                        <span>{facebookTitle}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="row mt--40">
                        <div className="col-12">
                            <div className="footer-copyright">
                                <p>{copyrightText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

Footer.propTypes = {
    space: PropTypes.oneOf([1, 2, 3]),
    className: PropTypes.string,
    data: PropTypes.shape({
        items: PropTypes.arrayOf(ItemType),
    }),
};

export default Footer;
