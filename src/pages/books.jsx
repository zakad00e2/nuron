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

const API_BOOKS_URL =
  "https://brilliant-boot-036dae9a94.strapiapp.com/api/books";

const BooksPage = () => {
  const { language } = useLanguage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiTitles, setApiTitles] = useState(null);

  const booksTitle = getTranslation(language, "common.books");
  const booksCollectionTitle = getTranslation(language, "books.title");
  const discoverTitle = getTranslation(
    language,
    "common.discoverBookCollection"
  );
  const exploreSubtitle = getTranslation(language, "common.exploreBooks");

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(
          `https://brilliant-boot-036dae9a94.strapiapp.com/api/title-and-subtitle?locale=${language}`
        );
        const data = await response.json();
        if (data && data.data) {
          setApiTitles(data.data);
        }
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };
    fetchTitles();
  }, [language]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        console.log(`Fetching books from ${API_BOOKS_URL}...`);
        const response = await fetch(
          `${API_BOOKS_URL}?locale=${language}&populate=cover&fields[0]=title&fields[1]=slug&fields[2]=author_name&fields[3]=description&fields[4]=book_link`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Books API response:", data);

        if (data && data.data) {
          const mappedBooks = data.data.map((item) => {
            // Extract text from rich text description
            let descriptionText = "";
            if (Array.isArray(item.description)) {
              descriptionText = item.description
                .map((block) => {
                  if (block.type === "paragraph" && block.children) {
                    return block.children.map((child) => child.text).join("");
                  }
                  return "";
                })
                .join("\n");
            } else {
              descriptionText = item.description || "";
            }

            const cover =
              item.cover && item.cover.length > 0 ? item.cover[0] : null;

            // Use smaller image format if available to improve performance
            const coverUrl = cover?.formats?.small?.url || cover?.formats?.thumbnail?.url || cover?.url;
            const coverWidth = cover?.formats?.small?.width || cover?.formats?.thumbnail?.width || cover?.width;
            const coverHeight = cover?.formats?.small?.height || cover?.formats?.thumbnail?.height || cover?.height;

            return {
              id: item.id,
              title: item.title,
              slug: item.slug,
              author: item.author_name,
              description: descriptionText,
              websiteUrl: item.book_link,
              coverImage: cover
                ? {
                    src: coverUrl,
                    width: coverWidth,
                    height: coverHeight,
                    alt: item.title,
                  }
                : null,
              // Map to Product component expected format
              images: cover ? [{ src: coverUrl }] : [],
              image: cover ? { src: coverUrl } : null,
              latestBid: "Free",
              price: { amount: 0, currency: "USD" },
              likeCount: 0,
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
        <Breadcrumb pageTitle={booksCollectionTitle} currentPage={booksTitle} />
       
        <div className="rn-books-area rn-section-gapTop">
          <div className="container">
            <div className="row mb--50">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h2 className="title">
                    {apiTitles?.book_hero_title || discoverTitle}
                  </h2>
                  <p className="subtitle">
                    {apiTitles?.book_hero_subtitle || exploreSubtitle}
                  </p>
                </div>
              </div>
            </div>
            {loading ? (
              <div className="row g-5">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                  >
                    <Skeleton type="card" />
                  </div>
                ))}
              </div>
            ) : (
              <ProductArea data={{ products: books }} className="pt--0" />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </Wrapper>
  );
};

export default BooksPage;
