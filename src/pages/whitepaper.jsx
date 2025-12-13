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

const API_WHITEPAPERS_URL = "https://brilliant-boot-036dae9a94.strapiapp.com/api/white-papers";

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
                const response = await fetch(`${API_WHITEPAPERS_URL}?locale=${language}`);
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
                        let contentText = "";
                        if (Array.isArray(item.new_content)) {
                            contentText = item.new_content
                                .map(block => {
                                    if (block.type === 'paragraph' && block.children) {
                                        const text = block.children.map(child => {
                                            let t = child.text;
                                            if (child.bold) t = `<strong>${t}</strong>`;
                                            if (child.italic) t = `<em>${t}</em>`;
                                            if (child.underline) t = `<u>${t}</u>`;
                                            if (child.strikethrough) t = `<del>${t}</del>`;
                                            if (child.code) t = `<code>${t}</code>`;
                                            return t;
                                        }).join("");
                                        return text ? `<p>${text}</p>` : "<br/>";
                                    }
                                    
                                    if (block.type === 'heading' && block.children) {
                                        const level = block.level || 2;
                                        const text = block.children.map(child => child.text).join("");
                                        return `<h${level}>${text}</h${level}>`;
                                    }

                                    if (block.type === 'list' && block.children) {
                                        const tag = block.format === 'ordered' ? 'ol' : 'ul';
                                        const items = block.children.map(item => `<li>${item.children.map(c => c.text).join("")}</li>`).join("");
                                        return `<${tag}>${items}</${tag}>`;
                                    }

                                    if (block.type === 'image') {
                                        console.log('Image Block Found:', block);
                                        const imgData = block.image || block;
                                        let { url, alternativeText, width, height } = imgData;
                                        
                                        if (url) {
                                            if (url.startsWith('/')) {
                                                url = `https://brilliant-boot-036dae9a94.strapiapp.com${url}`;
                                            }
                                            return `<div class="block-image my-4"><img src="${url}" alt="${alternativeText || ''}" width="${width}" height="${height}" style="max-width: 100%; height: auto;" /></div>`;
                                        }
                                    }

                                    return "";
                                })
                                .join("");
                        } else {
                            contentText = item.new_content || "";
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

    useEffect(() => {
        const handleCopy = (e) => {
            e.preventDefault();
        };

        document.addEventListener("copy", handleCopy);
        document.addEventListener("cut", handleCopy);

        return () => {
            document.removeEventListener("copy", handleCopy);
            document.removeEventListener("cut", handleCopy);
        };
    }, []);

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
            <main id="main-content" style={{ userSelect: "none" }}>
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
                                                <div 
                                                    className="section-content"
                                                    dangerouslySetInnerHTML={{ __html: entry.content }}
                                                />
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
