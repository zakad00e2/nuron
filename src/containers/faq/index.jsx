import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Accordion from "@ui/accordion";
import { SectionTitleType, ItemType } from "@utils/types";

const FaqArea = ({ className, space = 1, data }) => (
    <div
        className={clsx(
            "rn-faq-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            {data?.section_title && (
                <div className="row">
                    <div className="col-12 mb--50">
                        <SectionTitle
                            className="text-center"
                            {...data.section_title}
                        />
                    </div>
                </div>
            )}
            <div className="row g-5">
                <div className="col-lg-10 offset-lg-1">
                    <div className="faq-accordion">
                        <Accordion
                            defaultActiveKey={0}
                            items={data?.items || []}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

FaqArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        items: PropTypes.arrayOf(ItemType),
    }),
};

export default FaqArea;
