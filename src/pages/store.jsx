import { useState, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductCard from "@components/store/product-card";
import ProductArea from "@containers/product/layout-04";
import PricingArea from "@containers/pricing/layout-01";
import HeroArea from "@containers/hero/layout-01";
import Skeleton from "@components/skeleton";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
// import storeProductsData from "../data/store-products.json";
// import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const API_STORE_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/store";
const API_HOMEPAGE_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/homepage";

const StorePage = () => {
    const { language } = useLanguage();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [heroDataState, setHeroDataState] = useState(null);
    const [pricingData, setPricingData] = useState(null);
    const [copyright, setCopyright] = useState(null);
    const [apiTitles, setApiTitles] = useState(null);
    const [calendlyUrl, setCalendlyUrl] = useState(null);
    
    const pageTitle = getTranslation(language, "store.pageTitle");
    const breadcrumbTitle = getTranslation(language, "store.breadcrumbTitle");
    const storeTitle = getTranslation(language, "store.sectionTitle");
    const storeSubtitle = getTranslation(language, "store.sectionSubtitle");

    const defaultHeroData = {
        headings: [{ content: storeTitle }],
        texts: [{ content: storeSubtitle, id: 1 }],
        images: [{ src: "/images/banner/banner-06.png" }]
    };

    useEffect(() => {
        let isMounted = true;
        const fetchCalendly = async () => {
            try {
                const response = await fetch(`https://brilliant-boot-036dae9a94.strapiapp.com/api/candlies?populate=*&locale=${language}`);
                const data = await response.json();
                if (isMounted && data && data.data) {
                    // Find the item with valid code
                    const validItem = data.data.find(item => item.candly_code && item.candly_code.code && item.candly_code.code.includes('Calendly.initPopupWidget'));
                    if (validItem) {
                        const code = validItem.candly_code.code;
                        const match = code.match(/url:\s*['"]([^'"]+)['"]/);
                        if (match && match[1]) {
                            setCalendlyUrl(match[1]);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching calendly:", error);
            }
        };
        fetchCalendly();
        return () => { isMounted = false; };
    }, [language]);

    useEffect(() => {
        let isMounted = true;
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const locale = language === "ar" ? "ar" : (language === "de" ? "de" : "en");
                const queryParams = `?populate[interface][populate]=image&populate[product_section][populate][products][populate]=product_image&populate[Redbubble]=*&populate[subscriptions_section][populate][subscriptions][populate]=subscriptions_details&locale=${locale}`;
                const response = await fetch(`${API_STORE_URL}${queryParams}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (isMounted && data && data.data) {
                    const storeData = data.data;

                    // Map Titles
                    const titles = {};
                    if (storeData.product_section) {
                        titles.product_hero_title = storeData.product_section.product_hero_title;
                        titles.product_hero_subtitle = storeData.product_section.product_hero_subtitle;
                    }
                    if (storeData.subscriptions_section) {
                        titles.subscriptions_hero_title = storeData.subscriptions_section.subscriptions_hero_title;
                        titles.subscriptions_hero_subtitle = storeData.subscriptions_section.subscriptions_hero_subtitle;
                    }
                    setApiTitles(titles);

                    // Map Products
                    if (storeData.product_section && storeData.product_section.products) {
                        const mappedProducts = storeData.product_section.products.map(item => ({
                            id: item.id,
                            title: item.product_name,
                            slug: item.id,
                            description: item.product_description,
                            price: { amount: item.price, currency: "USD" },
                            purchaseUrl: item.product_link,
                            images: item.product_image ? [{ src: item.product_image.url }] : [],
                            image: item.product_image ? { src: item.product_image.url, width: item.product_image.width, height: item.product_image.height } : null,
                            likeCount: 0,
                            latestBid: `${item.price} USD`
                        }));
                        setProducts(mappedProducts);
                    }

                    // Map Hero Data
                    if (storeData.interface) {
                         setHeroDataState({
                            headings: [{ content: storeData.interface.hero_title }],
                            texts: [{ content: storeData.interface.hero_subtitle, id: 1 }],
                            images: storeData.interface.image ? [{ src: storeData.interface.image.url }] : []
                        });
                    }

                    // Map Pricing Data
                    if (storeData.subscriptions_section && storeData.subscriptions_section.subscriptions) {
                        const mappedPlans = storeData.subscriptions_section.subscriptions.map(sub => ({
                            id: sub.id,
                            title: sub.subscriptions_type,
                            price: sub.subscriptions_price,
                            features: sub.subscriptions_details ? sub.subscriptions_details.map(d => d.detail) : [],
                            link: sub.subscriptions_link
                        }));
                        setPricingData({ 
                            plans: mappedPlans,
                            section_title: {
                                title: storeData.subscriptions_section.subscriptions_hero_title,
                                subtitle: storeData.subscriptions_section.subscriptions_hero_subtitle
                            }
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching store products:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProducts();
        return () => { isMounted = false; };
    }, [language]);

    useEffect(() => {
        const fetchCopyright = async () => {
            try {
                const locale = language === "ar" ? "ar" : (language === "de" ? "de" : "en");
                const response = await fetch(`${API_HOMEPAGE_URL}?locale=${locale}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.data && data.data.Property_Rights) {
                        setCopyright(data.data.Property_Rights);
                    }
                }
            } catch (error) {
                console.error("Error fetching copyright:", error);
            }
        };
        fetchCopyright();
    }, [language]);

    useEffect(() => {
        sal();
    }, [products]);

    return (
        <Wrapper>
            <SEO pageTitle={pageTitle} />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle={breadcrumbTitle} currentPage={breadcrumbTitle} />
                {loading ? (
                    <div className="slider-one rn-section-gapTop" style={{ minHeight: "500px", display: "flex", alignItems: "center" }}>
                        <div className="container">
                            <div className="row row-reverce-sm align-items-center">
                                <div className="col-lg-5 col-md-6 col-sm-12 mt_sm--50">
                                    <Skeleton type="title" className="mb--20" />
                                    <Skeleton type="text" count={3} />
                                </div>
                                <div className="col-lg-5 col-md-6 col-sm-12 offset-lg-1">
                                    <Skeleton type="image" style={{ height: '400px', width: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <HeroArea 
                        data={heroDataState || defaultHeroData} 
                        showScheduleButton={true}
                        calendlyUrl={calendlyUrl}
                    />
                )}

                <hr className="rn-section-divider" />

                <div className="rn-store-area rn-section-gapTop">
                    <div className="container">
                         <div className="row mb--5">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title">
                                        {apiTitles?.product_hero_title || storeTitle}
                                    </h2>
                                    <p className="subtitle">
                                        {apiTitles?.product_hero_subtitle || storeSubtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            <div className="row g-5">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
                                        <Skeleton type="card" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ProductArea 
                                data={{ products: products }} 
                                className="pt--0"
                            />
                            
                        )}

                        <hr className="rn-section-divider" />

                        {/* Pricing section below products */}
                        <div className="rn-section-gapTop">
                            {loading ? (
                                <div className="rn-pricing-area">
                                    <div className="container">
                                        <div className="row mb--50">
                                            <div className="col-lg-12">
                                                <div className="section-title text-center">
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Skeleton type="title" className="mb--20" style={{ width: '40%' }} />
                                                        <Skeleton type="text" style={{ width: '60%' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-5">
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <div key={index} className="col-lg-4 col-md-6 col-12">
                                                    <Skeleton type="card" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <PricingArea data={pricingData} />
                            )}
                        </div>

                    </div>
                </div>
            </main>
            <Footer copyright={copyright} />
        </Wrapper>
    );
};

export default StorePage;
