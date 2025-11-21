import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Product = ({
    overlay = false,
    title,
    slug,
    latestBid,
    price,
    likeCount,
    auction_date,
    image,
    bitCount,
    authors,
    placeBid,
    disableShareDropdown,
    // Book-specific props
    author,
    description,
    websiteUrl,
    // Store-specific props
    purchaseUrl,
}) => {
    const { language } = useLanguage();
    const translatedText = getTranslation(language, "books.viewButton");
    const viewButtonText = (translatedText && translatedText !== "books.viewButton") 
        ? translatedText 
        : (language === "ar" ? "عرض التفاصيل" : "View Details");
    const byTextRaw = getTranslation(language, "books.by");
    const byText = (byTextRaw && byTextRaw !== "books.by") ? byTextRaw : (language === "ar" ? "الكاتب" : "By");
    const buyNowText = getTranslation(language, "store.buyNow") || "Buy Now";
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <div
                className={clsx(
                    "product-style-one",
                    !overlay && "no-overlay",
                    placeBid && "with-placeBid",
                    (author || description || websiteUrl) && "book-mode"
                )}
            >
                <div className="card-thumbnail">
                    {image?.src && (
                        <Image
                            src={image.src}
                            alt={image?.alt || "NFT_portfolio"}
                            width={533}
                            height={533}
                        />
                    )}
                    {auction_date && <CountdownTimer date={auction_date} />}
                    {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )}
                </div>
                {/* <div className="product-share-wrapper">
                    <div className="profile-share">
                        {authors?.map((client) => (
                            <ClientAvatar
                                key={client.name}
                                slug={client.slug}
                                name={client.name}
                                image={client.image}
                            />
                        ))}
                        <Anchor
                            className="more-author-text"
                            path={`/product/${slug}`}
                        >
                            {bitCount}+ Place Bit.
                        </Anchor>
                    </div>
                    {!disableShareDropdown && <ShareDropdown />}
                </div> */}
                {author || description || websiteUrl ? (
                    // Book mode
                    <div className="book-content-wrapper">
                        <div className="book-content-inner">
                            <span className="product-name">{title}</span>
                            {author && (
                                <div className="book-author">
                                    <span>{byText}</span> {author}
                                </div>
                            )}
                            {description && (
                                <p className="book-description">{description}</p>
                            )}
                            {price && price.amount > 0 && (
                                <div className="book-price">
                                    {price.amount} {price.currency}
                                </div>
                            )}
                        </div>
                        {websiteUrl && (
                            <div className="book-button-wrapper">
                                <Anchor 
                                    path={websiteUrl} 
                                    className="btn-book-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="btn-text">{viewButtonText}</span>
                                    <i className="feather-arrow-right" />
                                </Anchor>
                            </div>
                        )}
                        {purchaseUrl && (
                            <div className="book-button-wrapper">
                                <Anchor 
                                    path={purchaseUrl} 
                                    className="btn-book-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="btn-text">{buyNowText}</span>
                                    <i className="feather-shopping-cart" style={{ marginLeft: '5px' }} />
                                </Anchor>
                            </div>
                        )}
                    </div>
                ) : (
                    // Product mode (original)
                    <>
                        <Anchor path={`/product/${slug}`}>
                            <span className="product-name">{title}</span>
                        </Anchor>
                        <span className="latest-bid">Highest bid {latestBid}</span>
                        <div className="last-bid">
                            {price?.amount ?? 0}
                            {price?.currency ?? "ETH"}
                        </div>
                        {purchaseUrl && (
                            <div className="product-buy-button-wrapper">
                                <Anchor 
                                    path={purchaseUrl} 
                                    className="btn-product-buy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="feather-shopping-cart"></i>
                                    <span className="btn-text">{buyNowText}</span>
                                </Anchor>
                            </div>
                        )}
                    </>
                )}
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

Product.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    latestBid: PropTypes.string,
    price: PropTypes.shape({
        amount: PropTypes.number,
        currency: PropTypes.string,
    }),
    likeCount: PropTypes.number,
    auction_date: PropTypes.string,
    image: ImageType,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            image: ImageType.isRequired,
        })
    ),
    bitCount: PropTypes.number,
    placeBid: PropTypes.bool,
    disableShareDropdown: PropTypes.bool,
    // Book-specific props
    author: PropTypes.string,
    description: PropTypes.string,
    websiteUrl: PropTypes.string,
    // Store-specific props
    purchaseUrl: PropTypes.string,
};

export default Product;
