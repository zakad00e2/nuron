import { useState, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductCard from "@components/store/product-card";
import ProductArea from "@containers/product/layout-04";
import Skeleton from "@components/skeleton";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
// import storeProductsData from "../data/store-products.json";
// import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const StorePage = () => {
    const { language } = useLanguage();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const pageTitle = getTranslation(language, "store.pageTitle");
    const breadcrumbTitle = getTranslation(language, "store.breadcrumbTitle");
    const storeTitle = getTranslation(language, "store.sectionTitle");
    const storeSubtitle = getTranslation(language, "store.sectionSubtitle");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://books-blog-production-7ac3.up.railway.app/api/stores?locale=${language}&populate=Images`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data && data.data) {
                    const mappedProducts = data.data.map(item => {
                        const image = item.Images;
                        
                        return {
                            id: item.id,
                            title: item.ProductName,
                            slug: item.Slug,
                            description: item.Short_Description,
                            price: { amount: item.Price, currency: "USD" },
                            purchaseUrl: item.Store_link,
                            images: image ? [{ src: image.url }] : [],
                            image: image ? { src: image.url, width: image.width, height: image.height } : null,
                            likeCount: 0,
                            latestBid: `${item.Price} USD`
                        };
                    });
                    setProducts(mappedProducts);
                }
            } catch (error) {
                console.error("Error fetching store products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [language]);

    useEffect(() => {
        sal();
    }, [products]);

    return (
        <Wrapper>
            <SEO pageTitle={pageTitle} />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle={breadcrumbTitle} currentPage={breadcrumbTitle} />
                <div className="rn-store-area rn-section-gapTop">
                    <div className="container">
                         <div className="row mb--50">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title">
                                        {storeTitle}
                                    </h2>
                                    <p className="subtitle">
                                        {storeSubtitle}
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
                                data={{ products: products }} 
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

export default StorePage;
