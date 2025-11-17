import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";

const PublisherCard = ({ className, name, slug, description, logo, booksCount, ...rest }) => (
    <div className={clsx("rn-publisher-card", className)} {...rest}>
        <div className="publisher-card-inner">
            <div className="publisher-logo-wrapper">
                <div className="publisher-logo">
                    {logo?.src && (
                        <Anchor path={slug}>
                            <Image
                                src={logo.src}
                                alt={logo?.alt || name}
                                width={logo?.width || 200}
                                height={logo?.height || 100}
                                style={{
                                    objectFit: "contain",
                                }}
                            />
                        </Anchor>
                    )}
                </div>
            </div>
            <div className="publisher-content">
                <h4 className="publisher-name">
                    <Anchor path={slug}>{name}</Anchor>
                </h4>
                {description && (
                    <p className="publisher-description">{description}</p>
                )}
            </div>
        </div>
    </div>
);

PublisherCard.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string,
    logo: ImageType,
    booksCount: PropTypes.number,
};

export default PublisherCard;
