import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";
import Skeleton from "@components/skeleton";

const TermsAndConditionsArea = ({ className, space = 1, content, loading }) => {
    const { language } = useLanguage();
    const termsData = getTranslation(language, "terms");
    const commonData = getTranslation(language, "common");
    const sections = termsData?.sections || [];

    return (
        <div
            className={clsx(
                "terms-condition-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row">
                    <div className="offset-lg-2 col-lg-8 ">
                        <div className="condition-wrapper">
                            {loading ? (
                                <div className="loading-skeleton">
                                    <Skeleton type="title" className="mb-4" />
                                    <Skeleton type="text" count={5} className="mb-2" />
                                    <Skeleton type="title" className="mb-4 mt-5" />
                                    <Skeleton type="text" count={5} className="mb-2" />
                                </div>
                            ) : content ? (
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            ) : (
                                sections.map((section, index) => (
                                    <div key={index} className="mb--40" >
                                        <h2>{section.title}</h2>
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex}>{paragraph}</p>
                                        ))}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className="row mt--50">
                    {/* <div className="offset-lg-2 col-lg-8 d-flex gap-3 btns-group">
                        <Button path="#" size="large">
                            {commonData.agree}
                        </Button>
                        <Button path="#" size="large" color="primary-alta">
                            {commonData.decline}
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

TermsAndConditionsArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    content: PropTypes.string,
    loading: PropTypes.bool
};

export default TermsAndConditionsArea;
