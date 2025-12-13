import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import PrivacyPolicyArea from "@containers/privacy-policy";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

const API_LEGAL_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/legal-page";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const PrivacyPolicy = () => {
    const { language } = useLanguage();
    const [privacyContent, setPrivacyContent] = useState("");
    const [loading, setLoading] = useState(true);
    const privacyData = getTranslation(language, "privacy");

    useEffect(() => {
        const fetchPrivacy = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_LEGAL_URL}?locale=${language}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data && data.data) {
                    // Based on inspection, the Privacy Policy content seems to be in the 'TermsOfService' field
                    // and it is a raw HTML string.
                    const privacyContent = data.data.TermsOfService || data.data.attributes?.TermsOfService || "";
                    setPrivacyContent(privacyContent);
                }
            } catch (error) {
                console.error("Error fetching privacy policy:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrivacy();
    }, [language]);

    return (
        <Wrapper>
            <SEO pageTitle={privacyData.title} />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle={privacyData.title}
                    currentPage={privacyData.title}
                />
                <PrivacyPolicyArea content={privacyContent} loading={loading} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default PrivacyPolicy;
