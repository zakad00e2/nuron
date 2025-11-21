import { useState, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import PublisherCard from "@components/publisher/publisher-card";
import Skeleton from "@components/skeleton";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const PublishersPage = () => {
    const { language } = useLanguage();
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);

    const pageTitle = getTranslation(language, "publishers.pageTitle");
    const breadcrumbTitle = getTranslation(language, "publishers.breadcrumbTitle");
    const sectionTitle = getTranslation(language, "publishers.sectionTitle");
    const sectionSubtitle = getTranslation(language, "publishers.sectionSubtitle");

    useEffect(() => {
        const fetchPublishers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/publishers?locale=${language}`);
                const data = await response.json();

                if (data && data.data) {
                    const mappedPublishers = data.data.map((item) => {
                        // Extract text from rich text description
                        let descriptionText = "";
                        if (Array.isArray(item.Description)) {
                            descriptionText = item.Description
                                .map(block => {
                                    if (block.type === 'paragraph' && block.children) {
                                        return block.children.map(child => child.text).join("");
                                    }
                                    return "";
                                })
                                .join("\n");
                        } else {
                            descriptionText = item.Description || "";
                        }

                        const logo = item.Logo;

                        return {
                            id: item.id,
                            name: item.Name,
                            slug: item.Slug,
                            description: descriptionText,
                            website: item.Website,
                            logo: logo ? {
                                src: logo.url,
                                alt: item.Name,
                                width: logo.width,
                                height: logo.height
                            } : null,
                            booksCount: 0 // Default as API doesn't provide this yet
                        };
                    });
                    setPublishers(mappedPublishers);
                }
            } catch (error) {
                console.error("Error fetching publishers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPublishers();
    }, [language]);

    useEffect(() => {
        sal();
    }, [publishers]);

    return (
        <Wrapper>
            <SEO pageTitle={pageTitle} />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle={breadcrumbTitle}
                    currentPage={pageTitle}
                />
                <div className="rn-publishers-area rn-section-gapTop">
                    <div className="container">
                        <div className="row mb--50">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title">
                                        {sectionTitle}
                                    </h2>
                                    <p className="subtitle">
                                        {sectionSubtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row g-5">
                            {loading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 col-12">
                                        <Skeleton type="card" />
                                    </div>
                                ))
                            ) : (
                                publishers.map((publisher) => (
                                    <div
                                        key={publisher.id}
                                        className="col-lg-4 col-md-6 col-12"
                                        data-sal="slide-up"
                                        data-sal-delay="150"
                                        data-sal-duration="800"
                                    >
                                        <PublisherCard
                                            name={publisher.name}
                                            // slug={`/publisher/${publisher.slug}`}
                                            description={publisher.description}
                                            logo={publisher.logo}
                                            booksCount={publisher.booksCount}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default PublishersPage;
