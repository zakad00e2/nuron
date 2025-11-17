import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import PublisherCard from "@components/publisher/publisher-card";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import publishersData from "../data/publishers.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const PublishersPage = () => {
    const { language } = useLanguage();
    const pageTitle = getTranslation(language, "publishers.pageTitle");
    const breadcrumbTitle = getTranslation(language, "publishers.breadcrumbTitle");
    const sectionTitle = getTranslation(language, "publishers.sectionTitle");
    const sectionSubtitle = getTranslation(language, "publishers.sectionSubtitle");
    const publishers = getTranslation(language, "publishers.publishers");

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
                            {publishers.map((publisher) => (
                                <div
                                    key={publisher.id}
                                    className="col-lg-4 col-md-6 col-12"
                                    data-sal="slide-up"
                                    data-sal-delay="150"
                                    data-sal-duration="800"
                                >
                                    <PublisherCard
                                        name={publisher.name}
                                        slug={`/publisher/${publisher.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        description={publisher.description}
                                        logo={publishersData.find(p => p.id === publisher.id)?.logo}
                                        booksCount={publishersData.find(p => p.id === publisher.id)?.booksCount}
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

export default PublishersPage;
