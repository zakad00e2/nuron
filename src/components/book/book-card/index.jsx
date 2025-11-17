import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";

const BookCard = ({ className, title, slug, author, description, coverImage, ...rest }) => (
    <div className={clsx("rn-book-card", className)} {...rest}>
        <div className="book-card-inner">
            {coverImage?.src && (
                <div className="book-thumbnail">
                    <Anchor path={`/books/${slug}`}>
                        <Image
                            src={coverImage.src}
                            alt={coverImage?.alt || title}
                            width={coverImage?.width || 300}
                            height={coverImage?.height || 450}
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    </Anchor>
                </div>
            )}
            <div className="book-content">
                <h4 className="book-title">
                    <Anchor path={`/books/${slug}`}>{title}</Anchor>
                </h4>
                {author && (
                    <div className="book-author">
                        <span className="author-label">By</span> {author}
                    </div>
                )}
                {description && (
                    <p className="book-description">{description}</p>
                )}
                <div className="book-actions">
                    <Anchor path={`/books/${slug}`} className="btn-book-link">
                        View Details <i className="feather-arrow-right" />
                    </Anchor>
                </div>
            </div>
        </div>
    </div>
);

BookCard.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.string,
    description: PropTypes.string,
    coverImage: ImageType,
};

export default BookCard;
