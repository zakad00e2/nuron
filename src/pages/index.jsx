import { useMemo, useState, useEffect } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-01";
import LiveExploreArea from "@containers/live-explore/layout-01";
import ServiceArea from "@containers/services/layout-01";
import NewestItmesArea from "@containers/product/layout-04";
import TopSellerArea from "@containers/top-seller/layout-01";
import ExploreProductArea from "@containers/explore-product/layout-01";
import CollectionArea from "@containers/collection/layout-01";
import BrandStrip from "@containers/brand-strip";
import FaqArea from "@containers/faq";
import { normalizedData } from "@utils/methods";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import homepageData from "../data/homepages/home-01.json";
import productData from "../data/products.json";
import sellerData from "../data/sellers.json";
import collectionsData from "../data/collections.json";

// API base URLs
const API_HOMEPAGE_URL = "https://books-blog-production-7ac3.up.railway.app/api/homepage";
const API_QUESTIONS_URL = "https://books-blog-production-7ac3.up.railway.app/api/questions";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const { language } = useLanguage();
    const [apiHomepageData, setApiHomepageData] = useState(null);
    const [apiFaqData, setApiFaqData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch homepage data from API
    useEffect(() => {
        const fetchHomepageData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Support Arabic, German, and English locales
                const locale = language === "ar" ? "ar" : (language === "de" ? "de" : "en");
                const response = await fetch(`${API_HOMEPAGE_URL}?locale=${locale}`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch homepage data: ${response.statusText}`);
                }
                
                const result = await response.json();
                setApiHomepageData(result.data);
            } catch (err) {
                console.error("Error fetching homepage data:", err);
                setError(err.message);
                // Fallback to null, will use static data
                setApiHomepageData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHomepageData();
    }, [language]);

    // Fetch FAQ data from API
    useEffect(() => {
        const fetchFaqData = async () => {
            try {
                // Support Arabic, German, and English locales
                const locale = language === "ar" ? "ar" : (language === "de" ? "de" : "en");
                // Always include locale parameter for consistency
                const url = `${API_QUESTIONS_URL}?locale=${locale}`;
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch FAQ data: ${response.statusText}`);
                }
                
                const result = await response.json();
                setApiFaqData(result.data || []);
            } catch (err) {
                console.error("Error fetching FAQ data:", err);
                // Fallback to null, will use static data
                setApiFaqData(null);
            }
        };

        fetchFaqData();
    }, [language]);

    const content = normalizedData(homepageData?.content || []);
    const liveAuctionData = productData.filter(
        (prod) =>
            prod?.auction_date && new Date() <= new Date(prod?.auction_date)
    );
    const newestData = productData
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 5);

    // Get translated content
    const translatedContent = useMemo(() => {
        // Use API data if available, otherwise fall back to translations
        const heroHeading = apiHomepageData?.hero_title 
            ? apiHomepageData.hero_title 
            : getTranslation(language, "homepage.hero.heading");
        const heroText = apiHomepageData?.hero_subtitle 
            ? apiHomepageData.hero_subtitle 
            : getTranslation(language, "homepage.hero.text");
        
        const faqTitle = getTranslation(language, "homepage.faq.title");
        const faqSubtitle = getTranslation(language, "homepage.faq.subtitle");
        
        // Helper function to process mixed Arabic/English text and wrap English parts in bdi
        const processMixedText = (text) => {
            if (!text || language !== "ar") return text;
            
            // Match English acronyms (2+ uppercase letters), numbers, and English words
            // This handles cases like "الـ NFT" or "ما هو NFT؟"
            const parts = text.split(/([A-Z]{2,}|[A-Za-z]+|\d+)/g);
            
            return parts.map((part, index) => {
                // If it's an English acronym (2+ uppercase), number, or English word, wrap in bdi
                if (/^[A-Z]{2,}$/.test(part) || /^\d+$/.test(part) || /^[A-Za-z]+$/.test(part)) {
                    return `<bdi dir="ltr">${part}</bdi>`;
                }
                return part;
            }).join("");
        };
        
        // Use API FAQ data if available, otherwise fall back to translations
        let faqItems;
        if (apiFaqData && apiFaqData.length > 0) {
            // Map API data to expected format and process mixed text
            faqItems = apiFaqData.map((item, index) => ({
                id: item.id || index,
                title: processMixedText(item.Question || ""),
                description: processMixedText(item.Answer || ""),
            }));
        } else {
            // Fallback to translations and process mixed text
            const translatedFaqItems = getTranslation(language, "homepage.faq.items");
            faqItems = translatedFaqItems.map((item, index) => ({
                id: index,
                title: processMixedText(item.title),
                description: processMixedText(item.description),
            }));
        }

        return {
            "hero-section": {
                ...content["hero-section"],
                headings: [
                    {
                        id: 1,
                        content: heroHeading,
                    },
                ],
                texts: [
                    {
                        id: 1,
                        content: heroText,
                    },
                ],
            },
            "faq-section": {
                ...content["faq-section"],
                section_title: {
                    title: faqTitle,
                    subtitle: faqSubtitle,
                },
                items: faqItems,
            },
        };
    }, [language, content, apiHomepageData, apiFaqData]);

    return (
        <Wrapper>
            <SEO pageTitle="Home Khaled" />
            <Header />
            <main id="main-content">
                <HeroArea data={translatedContent["hero-section"]} />
                <BrandStrip data={content["brand-strip-section"]} />
                <FaqArea data={translatedContent["faq-section"]} />
                {/* <LiveExploreArea
                    data={{
                        ...content["live-explore-section"],
                        products: liveAuctionData,
                    }}
                /> */}
                {/* <ServiceArea data={content["service-section"]} /> */}
                {/* <NewestItmesArea
                    data={{
                        ...content["newest-section"],
                        products: newestData,
                    }}
                /> */}
                {/* <TopSellerArea
                    data={{
                        ...content["top-sller-section"],
                        sellers: sellerData,
                    }}
                /> */}
                {/* <ExploreProductArea
                    data={{
                        ...content["explore-product-section"],
                        products: productData,
                    }}
                /> */}

                {/* <CollectionArea
                    data={{
                        ...content["collection-section"],
                        collections: collectionsData.slice(0, 4),
                    }}
                /> */}
              
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home;
