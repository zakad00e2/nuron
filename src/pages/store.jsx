import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductCard from "@components/store/product-card";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import storeProductsData from "../data/store-products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const StorePage = () => {
    const { language } = useLanguage();
    const storeProducts = getTranslation(language, "store.products");
    const pageTitle = getTranslation(language, "store.pageTitle");
    const breadcrumbTitle = getTranslation(language, "store.breadcrumbTitle");
    const buyNowText = getTranslation(language, "store.buyNow");

    return (
        <Wrapper>
            <SEO pageTitle={pageTitle} />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle={breadcrumbTitle} currentPage={breadcrumbTitle} />
                <div className="rn-store-area rn-section-gapTop">
                    <div className="container">
                        {/* <div className="row mb--50">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title">Our Products</h2>
                                    <p className="subtitle">
                                        Discover quality products for book lovers and readers
                                    </p>
                                </div>
                            </div>
                        </div> */}
                        <div className="row g-5">
                            {storeProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="col-lg-4 col-md-6 col-12"
                                    data-sal="slide-up"
                                    data-sal-delay="150"
                                    data-sal-duration="800"
                                >
                                    <ProductCard
                                        name={product.name}
                                        description={product.description}
                                        price={product.price}
                                        image={{
                                            src: storeProductsData.find(p => p.id === product.id)?.image || "/images/portfolio/placeholder.jpg",
                                            alt: product.name,
                                        }}
                                        purchaseUrl={storeProductsData.find(p => p.id === product.id)?.purchaseUrl || "#"}
                                        category={product.category}
                                        buyNow={buyNowText}
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

export default StorePage;
