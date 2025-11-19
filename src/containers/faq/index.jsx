import PropTypes from "prop-types";
import clsx from "clsx";
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
            <div className="row">
                <div className="col-12">
                    <div className="faq-header">
                        {data?.section_title?.subtitle && (
                            <p className="faq-subtitle">
                                {data.section_title.subtitle}
                            </p>
                        )}
                        {data?.section_title?.title && (
                            <h2 className="faq-title">
                                {(() => {
                                    const title = data.section_title.title;
                                    
                                    // Check if text contains Arabic characters
                                    const hasArabic = /[\u0600-\u06FF]/.test(title);
                                    
                                    // For Arabic text, don't split to preserve word order
                                    if (hasArabic) {
                                        return <span>{title}</span>;
                                    }
                                    
                                    // Check if title contains "Question" or "question"
                                    const questionMatch = title.match(/(.*?)(\bQuestion\?*\b)(.*)/i);
                                    if (questionMatch) {
                                        return (
                                            <>
                                                {questionMatch[1]}
                                                <span className="faq-title-highlight">
                                                    {questionMatch[2]}
                                                </span>
                                                {questionMatch[3]}
                                            </>
                                        );
                                    }
                                    // Fallback: highlight last word if it contains "?"
                                    const words = title.split(" ");
                                    return words.map((word, index) => {
                                        const hasQuestionMark = word.includes("?");
                                        return (
                                            <span key={index}>
                                                {hasQuestionMark ? (
                                                    <span className="faq-title-highlight">
                                                        {word}
                                                    </span>
                                                ) : (
                                                    word
                                                )}
                                                {index < words.length - 1 && " "}
                                            </span>
                                        );
                                    });
                                })()}
                            </h2>
                        )}
                    </div>
                </div>
            </div>
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
