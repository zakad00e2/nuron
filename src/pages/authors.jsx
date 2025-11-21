import { useState, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import AuthorCard from "@components/author/author-card";
import Skeleton from "@components/skeleton";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const AuthorsPage = () => {
    const { language } = useLanguage();
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    const authorsTitle = getTranslation(language, "authors.title");
    const authorsSubtitle = getTranslation(language, "authors.subtitle");
    const authorsPageTitle = getTranslation(language, "authors.pageTitle") || "Our Authors";
    const authorsCurrentPage = getTranslation(language, "authors.currentPage") || "Authors";

    useEffect(() => {
        const fetchAuthors = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/authors?locale=${language}`);
                const data = await response.json();

                if (data && data.data) {
                    const mappedAuthors = data.data.map((item) => {
                        // parse bio: Strapi returns rich text blocks - extract plain text
                        let bioText = "";
                        if (Array.isArray(item.bio)) {
                            bioText = item.bio
                                .map((block) => {
                                    if (block.type === 'paragraph' && block.children) {
                                        return block.children.map((child) => child.text).join("");
                                    }
                                    return "";
                                })
                                .join("\n");
                        } else {
                            bioText = item.bio || "";
                        }

                        const photo = item.photo;

                        return {
                            id: item.id,
                            name: item.name,
                            slug: item.slug,
                            bio: bioText,
                            booksCount: item.booksCount || 0,
                            isVerified: item.isVerified || false,
                            image: photo ? { 
                                src: photo.url, 
                                alt: item.name || "", 
                                width: photo.width, 
                                height: photo.height 
                            } : null,
                        };
                    });
                    setAuthors(mappedAuthors);
                }
            } catch (error) {
                console.error('Error fetching authors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, [language]);

    useEffect(() => {
        sal();
    }, [authors]);

    return (
        <Wrapper>
            <SEO pageTitle="Authors" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle={authorsPageTitle}
                    currentPage={authorsCurrentPage}
                />
                <div className="rn-authors-area rn-section-gapTop">
                    <div className="container">
                        <div className="row mb--50">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title">
                                        {authorsTitle}
                                    </h2>
                                    <p className="subtitle">
                                        {authorsSubtitle}
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
                                authors.map((author) => (
                                    <div
                                        key={author.id}
                                        className="col-lg-4 col-md-6 col-12"
                                        data-sal="slide-up"
                                        data-sal-delay="150"
                                        data-sal-duration="800"
                                    >
                                        <AuthorCard
                                            name={author.name}
                                            // slug={`/author/${author.slug}`}
                                            bio={author.bio}
                                            image={author.image}
                                            isVerified={author.isVerified}
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

export default AuthorsPage;
