import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";

const AuthorCard = ({ className, name, slug, bio, image, booksCount, isVerified, ...rest }) => (
    <div className={clsx("rn-author-card", className)} {...rest}>
        <div className="author-card-inner">
            <div className="author-thumbnail-wrapper">
                <div className={clsx("author-thumbnail")}>
                    {image?.src && (
                        <Anchor path={slug}>
                            <Image
                                src={image.src}
                                alt={image?.alt || name}
                                width={image?.width || 200}
                                height={image?.height || 200}
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </Anchor>
                    )}
                </div>
            </div>
            <div className="author-content">
                <h4 className="author-name">
                    <Anchor path={slug}>{name}</Anchor>
                </h4>
                {booksCount !== undefined && (
                    <div className="author-stats">
                        <span className="books-count">
                            <i className="feather-book"></i> {booksCount} {booksCount === 1 ? 'Book' : 'Books'}
                        </span>
                    </div>
                )}
                {bio && (
                    <p className="author-bio">{bio}</p>
                )}
            </div>
        </div>
    </div>
);

AuthorCard.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    bio: PropTypes.string,
    image: ImageType,
    booksCount: PropTypes.number,
    isVerified: PropTypes.bool,
};

export default AuthorCard;
