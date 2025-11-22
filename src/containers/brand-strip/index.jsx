import PropTypes from "prop-types";
import Image from "next/image";
import { ItemType } from "@utils/types";

const BrandStrip = ({ data }) => (
    <div className="brand-strip-area">
        <div className="container-fluid ">
            <div className="row">
                <div className="col-12">
                    <div className="brand-strip-wrapper">
                        <div className="brand-strip-track">
                            {/* First set of logos */}
                            <div className="brand-strip-content">
                                {data?.items?.map(({ id, image, title }) => (
                                    <div key={`first-${id}`} className="brand-strip-item">
                                        {image?.src && (
                                            <div className="brand-strip-logo">
                                                <Image
                                                    src={image.src}
                                                    alt={image?.alt || title || "brand"}
                                                    width={120}
                                                    height={60}
                                                    style={{
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {/* {title && (
                                            <span className="brand-strip-title">{title}</span>
                                        )} */}
                                    </div>
                                ))}
                            </div>
                            {/* Duplicate set for seamless loop */}
                            <div className="brand-strip-content" aria-hidden="true">
                                {data?.items?.map(({ id, image, title }) => (
                                    <div key={`second-${id}`} className="brand-strip-item">
                                        {image?.src && (
                                            <div className="brand-strip-logo">
                                                <Image
                                                    src={image.src}
                                                    alt={image?.alt || title || "brand"}
                                                    width={120}
                                                    height={60}
                                                    style={{
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {/* {title && (
                                            <span className="brand-strip-title">{title}</span>
                                        )} */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

BrandStrip.propTypes = {
    data: PropTypes.shape({
        items: PropTypes.arrayOf(ItemType),
    }),
};

export default BrandStrip;
