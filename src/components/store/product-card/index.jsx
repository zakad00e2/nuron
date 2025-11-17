import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import { ImageType } from "@utils/types";

const ProductCard = ({ className, name, description, price, image, purchaseUrl, category, buyNow, ...rest }) => (
    <div className={clsx("store-product-card", className)} {...rest}>
        <div className="product-card-inner">
            {image?.src && (
                <div className="product-image">
                    <Image
                        src={image.src}
                        alt={image?.alt || name}
                        width={400}
                        height={320}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
            )}
            <div className="product-content">
                <h3 className="product-name">{name}</h3>
                {description && (
                    <p className="product-description">{description}</p>
                )}
                <div className="product-footer">
                    <div className="product-price">{price}</div>
                    {purchaseUrl && (
                        <a
                            href={purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="buy-button"
                        >
                            <i className="feather-shopping-cart"></i>
                            {buyNow || "Buy Now"}
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
);

ProductCard.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.string.isRequired,
    image: ImageType,
    purchaseUrl: PropTypes.string.isRequired,
    category: PropTypes.string,
};

export default ProductCard;
