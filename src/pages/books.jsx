import { useMemo } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/product/layout-04";
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
            websiteUrl: book.websiteUrl || `https://example.com/books/${book.slug}`,
            // Map to Product component expected format
            images: book.images || (book.coverImage ? [book.coverImage] : []),
            image: book.image || book.coverImage,
        }));
    }, [language, translatedBooks]);

    return (
        <Wrapper>
            <SEO pageTitle={booksTitle} />
            <Header />
            <main id="main-content">
                {/* <Breadcrumb
                    pageTitle={booksCollectionTitle}
                    currentPage={booksTitle}
                /> */}
                <div className="rn-books-area rn-section-gapTop">
                    <div className="container">
                        <ProductArea 
                            data={{ products: booksWithTranslations }} 
                            className="pt--0"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default BooksPage;
