import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Whitepaper data will be loaded from translations

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const WhitepaperPage = () => {
    const { language } = useLanguage();
    const whitepaperTitle = getTranslation(language, "whitepaper.title");
    const contentsLabel = getTranslation(language, "common.contents");
    const whitepaperSections = getTranslation(language, "whitepaper.sections");

    const scrollToSection = (id) => {
        const element = document.getElementById(`section-${id}`);
        if (element) {
            const headerOffset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <Wrapper>
            <SEO pageTitle={whitepaperTitle} />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle={whitepaperTitle} currentPage={whitepaperTitle} />
                <div className="rn-whitepaper-area rn-section-gapTop">
                    <div className="container">
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-lg-3 d-none d-lg-block">
                                <div className="whitepaper-sidebar">
                                    <h4 className="sidebar-title">{contentsLabel}</h4>
                                    <div className="sidebar-content">
                                        {whitepaperSections.map((entry, index) => (
                                            <div
                                                key={index + 1}
                                                className="sidebar-item"
                                            >
                                                <a
                                                    onClick={() =>
                                                        scrollToSection(
                                                            index + 1
                                                        )
                                                    }
                                                    className="sidebar-link"
                                                >
                                                    {entry.title}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-lg-9">
                                <div className="whitepaper-content">
                                    {whitepaperSections.map((entry, index) => (
                                        <div
                                            key={index + 1}
                                            id={`section-${index + 1}`}
                                            className="whitepaper-section"
                                            data-sal="slide-up"
                                            data-sal-delay="150"
                                            data-sal-duration="800"
                                        >
                                            <h2 className="section-title">
                                                {entry.title}
                                            </h2>
                                            <p className="section-content">
                                                {entry.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default WhitepaperPage;
