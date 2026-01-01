import { useMemo, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-01";
import BrandStrip from "@containers/brand-strip";
import FaqArea from "@containers/faq";
import { normalizedData } from "@utils/methods";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import homepageData from "../data/homepages/home-01.json";

// API base URLs
const API_HOMEPAGE_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/homepage";
const API_QUESTIONS_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/questions";
const API_IMAGE_SLIDERS_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/image-sliders";

export async function getStaticProps() {
    const locales = ['ar', 'en', 'de'];
    const initialData = {};

    try {
        await Promise.all(locales.map(async (locale) => {
            const [homepageRes, faqRes, brandRes] = await Promise.all([
                fetch(`${API_HOMEPAGE_URL}?locale=${locale}&populate=Super_image`),
                fetch(`${API_QUESTIONS_URL}?locale=${locale}`),
                fetch(`${API_IMAGE_SLIDERS_URL}?locale=${locale}&populate=addImages`)
            ]);

            initialData[locale] = {
                homepage: homepageRes.ok ? (await homepageRes.json()).data : null,
                faq: faqRes.ok ? (await faqRes.json()).data : [],
                brandStrip: brandRes.ok ? (await brandRes.json()).data : []
            };
        }));
    } catch (error) {
        console.error("Error in getStaticProps:", error);
    }

    return { 
        props: { 
            className: "template-color-1",
            initialData
        },
        revalidate: 60
    };
}

const Home = ({ initialData }) => {
    const { language } = useLanguage();
    
    useEffect(() => {
        sal();
    }, []);

    const currentData = initialData?.[language] || initialData?.['en'] || {};
    const apiHomepageData = currentData.homepage;
    const apiFaqData = currentData.faq;
    const apiBrandStripData = currentData.brandStrip;

    const content = normalizedData(homepageData?.content || []);

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
    }, [language, content, apiHomepageData, apiFaqData]);

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

    return (
        <Wrapper>
            <SEO 
                pageTitle={language === 'ar' ? "الرئيسية" : "Home"} 
                description={translatedContent["hero-section"].texts[0].content}
                image={translatedContent["hero-section"].images[0]?.src}
            />
            <Header />
            <main id="main-content">
                <HeroArea data={translatedContent["hero-section"]} />
                <BrandStrip data={brandStripData} />
                <FaqArea data={translatedContent["faq-section"]} />
            </main>
            <Footer copyright={translatedContent.copyrightText} />
        </Wrapper>
    );
};

export default Home;