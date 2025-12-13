import { useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TermsAndConditionsArea from "@containers/terms-condition";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

const API_LEGAL_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/legal-page";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const TermsAndConditions = () => {
    const { language } = useLanguage();
    const [termsContent, setTermsContent] = useState("");
    const [loading, setLoading] = useState(true);
    const termsData = getTranslation(language, "terms");

    useEffect(() => {
        const fetchTerms = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_LEGAL_URL}?locale=${language}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data && data.data) {
                    // Based on inspection, the Terms content seems to be in the 'CookiePolicy' field
                    // and it is a raw HTML string.
                    const termsContent = data.data.CookiePolicy || data.data.attributes?.CookiePolicy || "";
                    setTermsContent(termsContent);
                }
            } catch (error) {
                console.error("Error fetching terms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTerms();
    }, [language]);

    return (
        <Wrapper>
            <SEO pageTitle={termsData.title} />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle={termsData.title}
                    currentPage={termsData.title}
                />
                <TermsAndConditionsArea content={termsContent} loading={loading} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default TermsAndConditions;
