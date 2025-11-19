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
    const blogPageTitle = getTranslation(language, "blog.pageTitle") || "Blog";
    const blogCurrentPage = getTranslation(language, "blog.currentPage") || "Blog";

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
                <Breadcrumb pageTitle={blogPageTitle} currentPage={blogCurrentPage} />
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
                            <div className="col-lg-4 d-none d-lg-block">
                                <div className="blog-sidebar">
                                    <h4 className="sidebar-title">{sidebarTitle}</h4>
                                    <div className="sidebar-content">
                                        {blogPosts.map((post) => {
                                            const postData = blogPostsData.find(p => p.id === post.id);
                                            return (
                                                <div
                                                    key={post.id}
                                                    className="sidebar-item"
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
                                                >
                                                    <div className="sidebar-item-inner">
                                                        {postData?.image && (
                                                            <div className="sidebar-thumbnail">
                                                                <Image
                                                                    src={postData.image}
                                                                    alt={post.title}
                                                                    width={80}
                                                                    height={80}
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "cover",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="sidebar-content-text">
                                                            <h5 className="sidebar-post-title">{post.title}</h5>
                                                            {post.excerpt && (
                                                                <p className="sidebar-post-excerpt">
                                                                    {post.excerpt.length > 80 
                                                                        ? `${post.excerpt.substring(0, 80)}...` 
                                                                        : post.excerpt
                                                                    }
                                                                </p>
                                                            )}
                                                            <div className="sidebar-post-meta">
                                                                {postData?.date && (
                                                                    <div className="sidebar-meta-item">
                                                                        <i className="feather-calendar"></i>
                                                                        <span>
                                                                            {formatDate(postData.date)}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {post.author && (
                                                                    <div className="sidebar-meta-item">
                                                                        <i className="feather-user"></i>
                                                                        <span>{post.author}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-lg-8">
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
                                                            width={600}
                                                            height={300}
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
