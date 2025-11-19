import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

const BookCard = ({ className, title, slug, author, description, coverImage, websiteUrl, ...rest }) => {
    const { language } = useLanguage();
    const byText = getTranslation(language, "books.by") || "By";
    
    return (
        <div className={clsx("rn-book-card", className)} {...rest}>
            <div className="book-card-inner">
                {coverImage?.src && (
                    <div className="book-thumbnail">
                        <Image
                            src={coverImage.src}
                            alt={coverImage?.alt || title}
                            width={coverImage?.width || 300}
                            height={coverImage?.height || 450}
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    </div>
                )}
                <div className="book-content">
                    <h4 className="book-title">{title}</h4>
                    {author && (
                        <div className="book-author">
                            <span className="author-label">{byText}</span> {author}
                        </div>
                    )}
                {description && (
                    <p className="book-description">{description}</p>
                )}
                {websiteUrl && (
                    <div className="book-actions">
                        <Anchor 
                            path={websiteUrl} 
                            className="btn-book-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Website <i className="feather-arrow-right" />
                        </Anchor>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

BookCard.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.string,
    description: PropTypes.string,
    coverImage: ImageType,
    websiteUrl: PropTypes.string,
};

export default BookCard;
