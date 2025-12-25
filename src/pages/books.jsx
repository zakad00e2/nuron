import { useMemo, useState, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/product/layout-04";
import Skeleton from "@components/skeleton";
import Button from "@ui/button";
import SimulationModal from "@components/modals/simulation-modal";
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
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [selectedSimulationList, setSelectedSimulationList] = useState([]);
  const [initialSimulationIndex, setInitialSimulationIndex] = useState(0);

  const booksTitle = getTranslation(language, "common.books");
  const booksCollectionTitle = getTranslation(language, "books.title");

  useEffect(() => {
    let isMounted = true;
    const fetchBooks = async () => {
      setLoading(true);
      try {
        console.log(`Fetching books from ${API_BOOKS_URL}...`);
        const response = await fetch(
          `${API_BOOKS_URL}?populate[book_section][populate][books][populate]=book_cover&locale=${language}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Books API response:", data);

        if (data && data.data) {
          const mappedSections = data.data.map((sectionItem) => {
            const sectionData = sectionItem.book_section;
            if (!sectionData) return null;

            const books = (sectionData.books || []).map((item) => {
              const descriptionText = item.book_description || "";
              const cover = item.book_cover;

              // Use smaller image format if available to improve performance
              const coverUrl = cover?.formats?.small?.url || cover?.formats?.thumbnail?.url || cover?.url;
              const coverWidth = cover?.formats?.small?.width || cover?.formats?.thumbnail?.width || cover?.width;
              const coverHeight = cover?.formats?.small?.height || cover?.formats?.thumbnail?.height || cover?.height;

              return {
                id: item.id,
                title: item.book_title,
                slug: item.slug || item.id.toString(),
                author: item.author_name,
                description: descriptionText,
                websiteUrl: item.book_link,
                coverImage: cover
                  ? {
                      src: coverUrl,
                      width: coverWidth,
                      height: coverHeight,
                      alt: item.book_title,
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

            return {
              id: sectionItem.id,
              title: sectionData.hero_title,
              subtitle: sectionData.hero_subtitle,
              products: books,
            };
          }).filter(Boolean);

          console.log("Mapped sections:", mappedSections);
          if (isMounted) setSections(mappedSections);
        } else {
          console.warn("No data found in API response");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBooks();
    return () => { isMounted = false; };
  }, [language]);

  useEffect(() => {
    sal();
  }, [sections]);

  const handleOpenSimulationModal = (product, productList) => {
    const index = productList.findIndex(p => p.id === product.id);
    setSelectedSimulationList(productList);
    setInitialSimulationIndex(index >= 0 ? index : 0);
    setShowSimulationModal(true);
  };

  return (
    <Wrapper>
      <SEO pageTitle={booksTitle} />
      <Header />
      <main id="main-content">
        <Breadcrumb pageTitle={booksCollectionTitle} currentPage={booksTitle} />
       
        {loading ? (
          <div className="rn-section-gapTop">
            <div className="container">
              <div className="row g-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                  >
                    <Skeleton type="card" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          sections.map((section, index) => (
            <div key={section.id}>
              {index > 0 && (
                <div className="container">
                  <hr className="rn-section-divider" />
                </div>
              )}
              <div className="rn-books-area rn-section-gapTop">
                <div className="container">
                  <div className="row mb--10">
                    <div className="col-lg-12">
                      <div className="section-title text-center">
                        {section.title && (
                          <h2
                            className="title"
                            dangerouslySetInnerHTML={{ __html: section.title }}
                          />
                        )}
                        {section.subtitle && (
                          <p className="subtitle">{section.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <ProductArea
                  data={{
                    products: section.products,
                  }}
                  space={0}
                  authorLabel={index === 1 ? (language === "ar" ? "المطور" : "Developer") : null}
                  onOpenModal={index === 1 ? (product) => handleOpenSimulationModal(product, section.products) : null}
                  buttonText={index === 1 ? (language === "ar" ? "فتح المحاكاة" : "Open Simulations") : null}
                  imageHeight={index === 1 ? 300 : null}
                />
              </div>
            </div>
          ))
        )}
      </main>
      <Footer />
      <SimulationModal 
        show={showSimulationModal} 
        handleModal={() => setShowSimulationModal(false)} 
        externalSimulations={selectedSimulationList}
        initialIndex={initialSimulationIndex}
      />
    </Wrapper>
  );
};

export default BooksPage;
