import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import Image from "next/image";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
import blogPostsData from "../data/blog-posts.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const BlogPage = () => {
    const { language } = useLanguage();
    const sidebarTitle = getTranslation(language, "blog.sidebarTitle");
    const blogPosts = getTranslation(language, "blog.posts");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <Wrapper>
            <SEO pageTitle="Blog" />
            <Header />
            <main id="main-content">
                <Breadcrumb pageTitle="Blog" currentPage="Blog" />
                <div className="rn-blog-area">
                    <div className="container">
                        <div className="row mb--50">
                            <div className="col-lg-12">
                                {/* <div className="section-title text-center">
                                    <h2 className="title">Latest Articles</h2>
                                    <p className="subtitle">
                                        Stay updated with the latest news and
                                        insights from the Web3 world
                                    </p>
                                </div> */}
                            </div>
                        </div>
                        <div className="row">
                            {/* Sidebar */}
                            <div className="col-lg-3 d-none d-lg-block">
                                <div className="blog-sidebar">
                                    <h4 className="sidebar-title">{sidebarTitle}</h4>
                                    <div className="sidebar-content">
                                        {blogPosts.map((post) => (
                                            <div
                                                key={post.id}
                                                className="sidebar-item"
                                            >
                                                <a
                                                    onClick={() => {
                                                        const element = document.getElementById(`post-${post.id}`);
                                                        if (element) {
                                                            const headerOffset = 120;
                                                            const elementPosition = element.getBoundingClientRect().top;
                                                            const offsetPosition = elementPosition + window.scrollY - headerOffset;
                                                            window.scrollTo({
                                                                top: offsetPosition,
                                                                behavior: "smooth",
                                                            });
                                                        }
                                                    }}
                                                    className="sidebar-link"
                                                >
                                                    {post.title}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-lg-9">
                                <div className="blog-posts-list">
                                    {blogPosts.map((post) => (
                                        <article
                                            key={post.id}
                                            id={`post-${post.id}`}
                                            className="blog-post-card"
                                            data-sal="slide-up"
                                            data-sal-delay="150"
                                            data-sal-duration="800"
                                        >
                                            {/* Post Header */}
                                            <div className="post-header">
                                                <div className="author-info">
                                                    <div className="author-avatar">
                                                        <i className="feather-user"></i>
                                                    </div>
                                                    <div className="author-details">
                                                        <h4 className="author-name">
                                                            {post.author}
                                                        </h4>
                                                        <div className="post-meta">
                                                            <i className="feather-calendar"></i>
                                                            <span>
                                                                {formatDate(
                                                                    blogPostsData.find(p => p.id === post.id)?.date || ""
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Post Content */}
                                            <div className="post-content">
                                                {blogPostsData.find(p => p.id === post.id)?.image && (
                                                    <div className="post-image">
                                                        <Image
                                                            src={blogPostsData.find(p => p.id === post.id).image}
                                                            alt={post.title}
                                                            width={800}
                                                            height={400}
                                                            style={{
                                                                width: "100%",
                                                                height: "auto",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <h2 className="post-title">
                                                    {post.title}
                                                </h2>
                                                <p className="post-excerpt">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </article>
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

export default BlogPage;
