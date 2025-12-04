import { useMemo, useState, useEffect } from "react";
import sal from "sal.js";
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
import Skeleton from "@components/skeleton";
import { normalizedData } from "@utils/methods";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import homepageData from "../data/homepages/home-01.json";
import productData from "../data/products.json";
import sellerData from "../data/sellers.json";
import collectionsData from "../data/collections.json";

// API base URLs
const API_HOMEPAGE_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/homepage";
const API_QUESTIONS_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/questions";
const API_IMAGE_SLIDERS_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/image-sliders";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const { language } = useLanguage();
    const [apiHomepageData, setApiHomepageData] = useState(null);
    const [apiFaqData, setApiFaqData] = useState(null);
    const [apiBrandStripData, setApiBrandStripData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFaqLoading, setIsFaqLoading] = useState(true);
    const [isBrandLoading, setIsBrandLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch homepage data from API
    useEffect(() => {
        const fetchHomepageData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Support Arabic, German, and English locales
                const locale = language === "ar" ? "ar" : (language === "de" ? "de" : "en");
                const response = await fetch(`${API_HOMEPAGE_URL}?locale=${locale}&populate=Super_image`);
                
                if (!response.ok) {
                    console.warn(`Failed to fetch homepage data: ${response.statusText}`);
                    setApiHomepageData(null);
                    return;
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
            setIsFaqLoading(true);
            try {
                // Support Arabic, German, and English locales
                const locale = language === "ar" ? "ar" : (language === "de" ? "de" : "en");
                // Always include locale parameter for consistency
                const url = `${API_QUESTIONS_URL}?locale=${locale}`;
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    console.warn(`Failed to fetch FAQ data: ${response.statusText}`);
                    setApiFaqData(null);
                    return;
                }
                
                const result = await response.json();
                setApiFaqData(result.data || []);
            } catch (err) {
                console.error("Error fetching FAQ data:", err);
                // Fallback to null, will use static data
                setApiFaqData(null);
            } finally {
                setIsFaqLoading(false);
            }
        };

        fetchFaqData();
    }, [language]);

    // Fetch Brand Strip data from API
    useEffect(() => {
        const fetchBrandStripData = async () => {
            setIsBrandLoading(true);
            try {
                const locale = language === "ar" ? "ar" : (language === "de" ? "de" : "en");
                const url = `${API_IMAGE_SLIDERS_URL}?locale=${locale}&populate=addImages`;
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    console.warn(`Failed to fetch Brand Strip data: ${response.statusText}`);
                    setApiBrandStripData(null);
                    return;
                }
                
                const result = await response.json();
                setApiBrandStripData(result.data || []);
            } catch (err) {
                console.error("Error fetching Brand Strip data:", err);
                setApiBrandStripData(null);
            } finally {
                setIsBrandLoading(false);
            }
        };

        fetchBrandStripData();
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
        // Normalize API data to handle both flattened and nested (attributes) structure
        const apiData = apiHomepageData?.attributes ? apiHomepageData.attributes : apiHomepageData;

        // Use API data if available, otherwise fall back to translations
        const heroHeading = apiData?.hero_title 
            ? apiData.hero_title 
            : getTranslation(language, "homepage.hero.heading");
        const heroText = apiData?.hero_subtitle 
            ? apiData.hero_subtitle 
            : getTranslation(language, "homepage.hero.text");
        
        // Handle image structure (Strapi v4 nested vs flattened)
        let heroImageUrl = null;
        if (apiData?.Super_image?.url) {
            heroImageUrl = apiData.Super_image.url;
        } else if (apiData?.Super_image?.data?.attributes?.url) {
            heroImageUrl = apiData.Super_image.data.attributes.url;
        }

        const heroImage = heroImageUrl 
            ? { src: heroImageUrl } 
            : null;

        const copyrightText = apiData?.Property_Rights || null;
        
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
                images: heroImage ? [heroImage] : content["hero-section"].images,
            },
            "faq-section": {
                ...content["faq-section"],
                section_title: {
                    title: faqTitle,
                    subtitle: faqSubtitle,
                },
                items: faqItems,
            },
            copyrightText,
        };
    }, [language, content, apiHomepageData, apiFaqData, apiBrandStripData]);

    // Process Brand Strip data
    const brandStripData = useMemo(() => {
        if (apiBrandStripData && apiBrandStripData.length > 0) {
            // Flatten all addImages from all sliders into a single list of items
            const items = apiBrandStripData.flatMap(slider => 
                (slider.addImages || []).map(img => ({
                    id: img.id,
                    title: img.name, // Or any other title field if available
                    image: {
                        src: img.url,
                        alt: img.name || "Brand Logo",
                        width: img.width,
                        height: img.height
                    }
                }))
            );
            
            return {
                items: items
            };
        }
        
        // Fallback to static content
        return content["brand-strip-section"];
    }, [apiBrandStripData, content]);

    useEffect(() => {
        if (!isLoading && !isFaqLoading && !isBrandLoading) {
            sal();
        }
    }, [isLoading, isFaqLoading, isBrandLoading]);

    if (isLoading || isFaqLoading || isBrandLoading) {
        return (
            <Wrapper>
                <SEO pageTitle="Home" />
                <Header />
                <main id="main-content">
                    <div className="slider-one rn-section-gapTop">
                        <div className="container">
                            <div className="row row-reverce-sm align-items-center">
                                <div className="col-lg-5 col-md-6 col-sm-12 mt_sm--50">
                                    <Skeleton type="title" className="mb--20" style={{ height: '50px', width: '80%' }} />
                                    <Skeleton type="text" count={3} className="mb--20" />
                                    <div className="button-group">
                                        <Skeleton type="text" className="mb--20" style={{ height: '50px', width: '150px', display: 'inline-block', marginRight: '20px' }} />
                                        <Skeleton type="text" className="mb--20" style={{ height: '50px', width: '150px', display: 'inline-block' }} />
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-6 col-sm-12 offset-lg-1">
                                    <Skeleton type="image" style={{ height: '500px', width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <HeroArea data={translatedContent["hero-section"]} />
                <BrandStrip data={brandStripData} />
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
            <Footer copyright={translatedContent.copyrightText} />
        </Wrapper>
    );
};

export default Home;