import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import AuthorCard from "@components/author/author-card";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import authorsData from "../data/authors.json";

export async function getStaticProps() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors?populate=*`);
        const json = await res.json();

        const apiAuthors = (json?.data || []).map((item) => {
            const attrs = item?.attributes || item || {};

            // parse bio: Strapi returns rich text blocks - extract plain text
            const parseBio = (bio) => {
                if (!bio) return "";
                if (typeof bio === "string") return bio;
                if (Array.isArray(bio)) {
                    return bio
                        .map((block) => {
                            if (block?.children && Array.isArray(block.children)) {
                                return block.children.map((ch) => ch.text).join("");
                            }
                            if (block?.text) return block.text;
                            return "";
                        })
                        .join("\n\n");
                }
                return "";
            };

            // choose image from possible fields
            const photoField = attrs.photo || attrs.image || attrs.avatar || attrs.profileImage;
            let imageSrc = null;
            let width = 200;
            let height = 200;

            if (photoField) {
                if (photoField?.data?.attributes) {
                    const att = photoField.data.attributes;
                    imageSrc = att.formats?.thumbnail?.url || att.formats?.small?.url || att.url || att.formats?.medium?.url || att.formats?.large?.url;
                    width = att.width || att.formats?.thumbnail?.width || 200;
                    height = att.height || att.formats?.thumbnail?.height || 200;
                } else if (typeof photoField === "string") {
                    imageSrc = photoField;
                } else if (photoField?.url) {
                    imageSrc = photoField.url;
                    width = photoField.width || width;
                    height = photoField.height || height;
                }
            }

            return {
                id: item.id || attrs.id,
                name: attrs.name || attrs.fullName || attrs.title || "",
                slug: attrs.slug || (attrs.name ? attrs.name.toLowerCase().replace(/\s+/g, '-') : ""),
                bio: parseBio(attrs.bio || attrs.description),
                booksCount: attrs.booksCount || attrs.books_count || 0,
                isVerified: attrs.isVerified || attrs.is_verified || false,
                image: imageSrc ? { src: imageSrc, alt: attrs.name || "", width, height } : null,
            };
        });

        return {
            props: { className: "template-color-1", authorsData: apiAuthors.length ? apiAuthors : authorsData },
            revalidate: 60,
        };
    } catch (error) {
        console.error('Error fetching authors:', error);
        return { props: { className: "template-color-1", authorsData } };
    }
}

const AuthorsPage = ({ authorsData }) => {
    const { language } = useLanguage();
    const authorsTitle = getTranslation(language, "authors.title");
    const authorsSubtitle = getTranslation(language, "authors.subtitle");
    const authorsPageTitle = getTranslation(language, "authors.pageTitle") || "Our Authors";
    const authorsCurrentPage = getTranslation(language, "authors.currentPage") || "Authors";

    return (
        <Wrapper>
            <SEO pageTitle="Authors" />
            <Header />
            <main id="main-content">
                <Breadcrumb
                    pageTitle={authorsPageTitle}
                    currentPage={authorsCurrentPage}
                />
                <div className="rn-authors-area rn-section-gapTop">
                    <div className="container">
                        <div className="row mb--50">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="title">
                                        {authorsTitle}
                                    </h2>
                                    <p className="subtitle">
                                        {authorsSubtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row g-5">
                            {(authorsData || []).map((author) => (
                                <div
                                    key={author.id}
                                    className="col-lg-4 col-md-6 col-12"
                                    data-sal="slide-up"
                                    data-sal-delay="150"
                                    data-sal-duration="800"
                                >
                                    <AuthorCard
                                        name={author.name}
                                        slug={`/author/${author.slug}`}
                                        bio={author.bio}
                                        image={author.image}
                                        isVerified={author.isVerified}
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

export default AuthorsPage;
