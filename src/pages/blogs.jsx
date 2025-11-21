import { useState, useEffect } from "react";
import sal from "sal.js";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import Image from "next/image";
import Skeleton from "@components/skeleton";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

// Demo Data
// import blogPostsData from "../data/blog-posts.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const BlogPage = () => {
    const { language } = useLanguage();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const sidebarTitle = getTranslation(language, "blog.sidebarTitle");
    // const blogPosts = getTranslation(language, "blog.posts");
    const blogPageTitle = getTranslation(language, "blog.pageTitle") || "Blog";
    const blogCurrentPage = getTranslation(language, "blog.currentPage") || "Blog";

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/blogs?locale=${language}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data && data.data) {
                    const mappedPosts = data.data.map(item => {
                        // Handle rich text for content/excerpt if needed
                        let contentText = "";
                        if (Array.isArray(item.content)) {
                            contentText = item.content
                                .map(block => {
                                    if (block.type === 'paragraph' && block.children) {
                                        return block.children.map(child => child.text).join("");
                                    }
                                    return "";
                                })
                                .join("\n");
                        } else {
                            contentText = item.content || "";
                        }

                        const image = item.image ? item.image : null;

                        return {
                            id: item.id,
                            title: item.title,
                            excerpt: contentText.substring(0, 150) + (contentText.length > 150 ? "..." : ""), // Create excerpt from content
                            content: contentText,
                            author: item.author_name,
                            date: item.publishedAt || item.createdAt,
                            image: image ? {
                                src: image.url,
                                width: image.width || 600,
                                height: image.height || 300,
                                alt: item.title
                            } : null
                        };
                    });
                    setPosts(mappedPosts);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [language]);

    useEffect(() => {
        sal();
    }, [posts]);

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
                                        {loading ? (
                                            <div className="sidebar-loading">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <div key={index} className="mb-4">
                                                        <Skeleton type="text" className="mb-2" />
                                                        <Skeleton type="text" style={{ width: "60%" }} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            posts.map((post) => (
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
                                                        {post.image && (
                                                            <div className="sidebar-thumbnail">
                                                                <Image
                                                                    src={post.image.src}
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
                                                                    {post.excerpt}
                                                                </p>
                                                            )}
                                                            <div className="sidebar-post-meta">
                                                                {post.date && (
                                                                    <div className="sidebar-meta-item">
                                                                        <i className="feather-calendar"></i>
                                                                        <span>
                                                                            {formatDate(post.date)}
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
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-lg-8">
                                <div className="blog-posts-list">
                                    {loading ? (
                                        <div className="blog-loading">
                                            {Array.from({ length: 3 }).map((_, index) => (
                                                <div key={index} className="mb-5">
                                                    <Skeleton type="image" className="mb-3" style={{ height: "300px" }} />
                                                    <Skeleton type="title" className="mb-2" />
                                                    <Skeleton type="text" count={3} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        posts.map((post) => (
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
                                                                    {formatDate(post.date)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Post Content */}
                                                <div className="post-content">
                                                    {post.image && (
                                                        <div className="post-image">
                                                            <Image
                                                                src={post.image.src}
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
                                                        {post.content}
                                                    </p>
                                                </div>
                                            </article>
                                        ))
                                    )}
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
