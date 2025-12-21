import React, { useState, useEffect } from 'react';
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import PricingArea from "@containers/pricing/layout-01";
import { useLanguage } from "@contexts/LanguageContext";

const API_STORE_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/stores";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const PricingPage = () => {
    const { language } = useLanguage();
    const [pricingData, setPricingData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchPricing = async () => {
            try {
                const locale = language === "ar" ? "ar" : (language === "de" ? "de" : "en");
                const queryParams = `?locale=${locale}&populate[subscriptions][populate]=*`;
                const response = await fetch(`${API_STORE_URL}${queryParams}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (isMounted && data && data.data && data.data.length > 0) {
                    const storeData = data.data[0];
                    if (storeData.subscriptions) {
                        const mappedPlans = storeData.subscriptions.map(sub => ({
                            id: sub.id,
                            title: sub.subscriptions_type,
                            price: sub.subscriptions_price,
                            features: sub.subscriptions_details ? sub.subscriptions_details.map(d => d.detail) : [],
                            link: sub.subscriptions_link
                        }));
                        setPricingData({ plans: mappedPlans });
                    }
                }
            } catch (error) {
                console.error("Error fetching pricing:", error);
            }
        };

        fetchPricing();
        return () => { isMounted = false; };
    }, [language]);

    return (
        <Wrapper>
            <SEO pageTitle="Pricing Plans" />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle="Pricing Plans" currentPage="Pricing" />
                <PricingArea data={pricingData} />
            </main>
            <Footer />
        </Wrapper>
    );
};

export default PricingPage;
