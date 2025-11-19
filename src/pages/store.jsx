import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductCard from "@components/store/product-card";
import ProductArea from "@containers/product/layout-04";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import storeProductsData from "../data/store-products.json";
import productData from "../data/products.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const StorePage = () => {
    const { language } = useLanguage();
    const storeProducts = getTranslation(language, "store.products");
    const pageTitle = getTranslation(language, "store.pageTitle");
    const breadcrumbTitle = getTranslation(language, "store.breadcrumbTitle");
    const buyNowText = getTranslation(language, "store.buyNow");

    // Map store products to include purchaseUrl from storeProductsData
    // If a product doesn't have a purchaseUrl, provide a default one
    const productsWithPurchaseUrl = productData.map((product) => {
        const storeProduct = storeProductsData.find(sp => sp.id === product.id);
        // Use purchaseUrl from storeProductsData, or provide a default URL
        // Default URL can be the product detail page or a generic store URL
        const defaultPurchaseUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product.title)}`;
        return {
            ...product,
            purchaseUrl: storeProduct?.purchaseUrl || defaultPurchaseUrl,
        };
    });

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
                        <ProductArea 
                            data={{ products: productsWithPurchaseUrl }} 
                            className="pt--0"
                        />

                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default StorePage;
