import PropTypes from "prop-types";
import clsx from "clsx";
import Product from "@components/product/layout-01";
import SectionTitle from "@components/section-title/layout-02";
import { ProductType, SectionTitleType } from "@utils/types";

const ProductArea = ({ space = 1, className, data }) => (
    <div
        className={clsx(
            "rn-new-items",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            {data?.section_title && (
                <div className="row mb--50">
                    <div className="col-12">
                        <SectionTitle
                            {...data.section_title}
                            className="mb-0"
                        />
                    </div>
                </div>
            )}
            {data?.products && (
                <div className="row g-5">
                    {data.products.map((prod) => (
                        <div
                            key={prod.id}
                            data-sal="slide-up"
                            data-sal-delay="150"
                            data-sal-duration="800"
                            className="col-lg-3 col-md-6 col-sm-6 col-12"
                        >
                            <Product
                                title={prod.title}
                                slug={prod.slug}
                                latestBid={prod.latestBid}
                                price={prod.price}
                                likeCount={prod.likeCount}
                                image={prod.images?.[0]}
                                authors={prod.authors}
                                bitCount={prod.bitCount}
                                author={prod.author}
                                description={prod.description}
                                websiteUrl={prod.websiteUrl}
                                purchaseUrl={prod.purchaseUrl}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

ProductArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType).isRequired,
    }),
};

export default ProductArea;
