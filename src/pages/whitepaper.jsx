import { useState, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import Skeleton from "@components/skeleton";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Whitepaper data will be loaded from API

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const WhitepaperPage = () => {
    const { language } = useLanguage();
    const [whitepaperSections, setWhitepaperSections] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const whitepaperTitle = getTranslation(language, "whitepaper.title");
    const contentsLabel = getTranslation(language, "common.contents");
    // const whitepaperSections = getTranslation(language, "whitepaper.sections");

    useEffect(() => {
        const fetchWhitepapers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/white-papers?locale=${language}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data && data.data) {
                    // Assuming the API returns a list of sections or a single entry with sections
                    // If it's a collection type "white-papers", it returns an array of entries.
                    // Let's assume each entry is a section for now, or we might need to inspect the data.
                    // Based on the current UI, it expects an array of { title, content }.
                    
                    const mappedSections = data.data.map(item => {
                        // Handle rich text for content if needed
                        let contentText = "";
                        if (Array.isArray(item.content)) {
                            contentText = item.content
                                .map(block => {
                                    if (block.type === 'paragraph' && block.children) {
                                        return block.children.map(child => child.text).join("");
                                    }
                                    return "";
                                })
                                .join("\n");
                        } else {
                            contentText = item.content || "";
                        }

                        return {
                            title: item.title,
                            content: contentText
                        };
                    });
                    setWhitepaperSections(mappedSections);
                }
            } catch (error) {
                console.error("Error fetching whitepapers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWhitepapers();
    }, [language]);

    useEffect(() => {
        sal();
    }, [whitepaperSections]);

    const scrollToSection = (id) => {
        const element = document.getElementById(`section-${id}`);
        if (element) {
            const headerOffset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <Wrapper>
            <SEO pageTitle={whitepaperTitle} />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle={whitepaperTitle} currentPage={whitepaperTitle} />
                <div className="rn-whitepaper-area rn-section-gapTop">
                    <div className="container">
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-lg-3 d-none d-lg-block">
                                <div className="whitepaper-sidebar">
                                    <h4 className="sidebar-title">{contentsLabel}</h4>
                                    <div className="sidebar-content">
                                        {whitepaperSections.map((entry, index) => (
                                            <div
                                                key={index + 1}
                                                className="sidebar-item"
                                            >
                                                <a
                                                    onClick={() =>
                                                        scrollToSection(
                                                            index + 1
                                                        )
                                                    }
                                                    className="sidebar-link"
                                                >
                                                    {entry.title}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-lg-9">
                                <div className="whitepaper-content">
                                    {loading ? (
                                        <div className="whitepaper-loading">
                                            {Array.from({ length: 4 }).map((_, index) => (
                                                <div key={index} className="mb-5">
                                                    <Skeleton type="title" className="mb-3" />
                                                    <Skeleton type="text" count={5} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        whitepaperSections.map((entry, index) => (
                                            <div
                                                key={index + 1}
                                                id={`section-${index + 1}`}
                                                className="whitepaper-section"
                                                data-sal="slide-up"
                                                data-sal-delay="150"
                                                data-sal-duration="800"
                                            >
                                                <h2 className="section-title">
                                                    {entry.title}
                                                </h2>
                                                <p className="section-content">
                                                    {entry.content}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default WhitepaperPage;
