import { useMemo, useState, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/product/layout-04";
import Skeleton from "@components/skeleton";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
// import booksData from "../data/books.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const BooksPage = () => {
    const { language } = useLanguage();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const booksTitle = getTranslation(language, "common.books");
    const booksCollectionTitle = getTranslation(language, "books.title");
    const discoverTitle = getTranslation(language, "common.discoverBookCollection");
    const exploreSubtitle = getTranslation(language, "common.exploreBooks");
    
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                console.log("Fetching books from /api/books...");
                const response = await fetch(`/api/books?locale=${language}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Books API response:", data);
                
                if (data && data.data) {
                    const mappedBooks = data.data.map(item => {
                        // Extract text from rich text description
                        let descriptionText = "";
                        if (Array.isArray(item.description)) {
                            descriptionText = item.description
                                .map(block => {
                                    if (block.type === 'paragraph' && block.children) {
                                        return block.children.map(child => child.text).join("");
                                    }
                                    return "";
                                })
                                .join("\n");
                        } else {
                            descriptionText = item.description || "";
                        }

                        const cover = item.cover && item.cover.length > 0 ? item.cover[0] : null;

                        return {
                            id: item.id,
                            title: item.title,
                            slug: item.slug,
                            author: item.author_name,
                            description: descriptionText,
                            websiteUrl: item.book_link,
                            coverImage: cover ? {
                                src: cover.url,
                                width: cover.width,
                                height: cover.height,
                                alt: item.title
                            } : null,
                            // Map to Product component expected format
                            images: cover ? [{ src: cover.url }] : [],
                            image: cover ? { src: cover.url } : null,
                            latestBid: "Free",
                            price: { amount: 0, currency: "USD" },
                            likeCount: 0
                        };
                    });
                    console.log("Mapped books:", mappedBooks);
                    setBooks(mappedBooks);
                } else {
                    console.warn("No data found in API response");
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [language]);

    useEffect(() => {
        sal();
    }, [books]);

    return (
        <Wrapper>
            <SEO pageTitle={booksTitle} />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle={booksCollectionTitle}
                    currentPage={booksTitle}
                />
                <div className="rn-books-area rn-section-gapTop">
                    <div className="container">
                         <div className="row mb--50">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title">
                                        {discoverTitle}
                                    </h2>
                                    <p className="subtitle">
                                        {exploreSubtitle}
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
                                data={{ products: books }} 
                                className="pt--0"
                            />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default BooksPage;
