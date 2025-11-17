import { useMemo } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import BookCard from "@components/book/book-card";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import booksData from "../data/books.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const BooksPage = () => {
    const { language } = useLanguage();
    const booksTitle = getTranslation(language, "common.books");
    const booksCollectionTitle = getTranslation(language, "books.title");
    const discoverTitle = getTranslation(language, "common.discoverBookCollection");
    const exploreSubtitle = getTranslation(language, "common.exploreBooks");
    const translatedBooks = getTranslation(language, "books.items");

    const booksWithTranslations = useMemo(() => {
        return booksData.map((book, index) => ({
            ...book,
            title: translatedBooks[index]?.title || book.title,
            author: translatedBooks[index]?.author || book.author,
            description: translatedBooks[index]?.description || book.description,
        }));
    }, [language, translatedBooks]);

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
                        <div className="row g-5">
                            {booksWithTranslations.map((book) => (
                                <div
                                    key={book.id}
                                    className="col-lg-4 col-md-6 col-12"
                                    data-sal="slide-up"
                                    data-sal-delay="150"
                                    data-sal-duration="800"
                                >
                                    <BookCard
                                        title={book.title}
                                        slug={book.slug}
                                        author={book.author}
                                        description={book.description}
                                        coverImage={book.coverImage}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default BooksPage;
