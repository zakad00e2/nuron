import PropTypes from "prop-types";
import Image from "next/image";
import Button from "@ui/button";
import { HeadingType, TextType, ButtonType, ImageType } from "@utils/types";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";

const HeroArea = ({ data, showScheduleButton = false, calendlyUrl }) => {
    const { language } = useLanguage();
    return (
    <div className="slider-one rn-section-gapTop" style={{ minHeight: "500px", display: "flex", alignItems: "center" }}>
        <div className="container">
            <div className="row row-reverce-sm align-items-center justify-content-between">
                <div className="col-lg-5 col-md-6 col-sm-12 mt_sm--50 hero-content">
                    {data?.headings[0]?.content && (
                        <h2
                            className="title"
                            data-sal-delay="200"
                            data-sal="slide-up"
                            data-sal-duration="800"
                        >
                            {data.headings[0].content}
                        </h2>
                    )}
                    {data?.texts?.map((text) => (
                        <div
                            className="slide-disc"
                            data-sal-delay="300"
                            data-sal="slide-up"
                            data-sal-duration="800"
                            key={text.id}
                            dangerouslySetInnerHTML={{ __html: text.content }}
                        />
                    ))}
                    {showScheduleButton && (
                        <div className="button-group mt--10">
                            <a 
                                href="#" 
                                className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (window.Calendly) {
                                        window.Calendly.initPopupWidget({url: calendlyUrl || 'https://calendly.com/contact-autor/30min'});
                                    }
                                }}
                                data-sal-delay="400"
                                data-sal="slide-up"
                                data-sal-duration="800"
                            >
                                {getTranslation(language, "common.scheduleTime")}
                            </a>
                        </div>
                    )}
                    {/* {data?.buttons && (
                        <div className="button-group">
                            {data.buttons.map(({ content, id, ...btn }, i) => (
                                <Button
                                    {...btn}
                                    data-sal-delay={400 + i * 100}
                                    data-sal="slide-up"
                                    data-sal-duration="800"
                                    key={id}
                                >
                                    {content}
                                </Button>
                            ))}
                        </div>
                    )} */}
                </div>
                <div className={`col-lg-5 col-md-6 col-sm-12 ${language === "ar" ? "offset-lg-1" : ""}`}>
                    {data?.images?.[0]?.src && (
                        <div className="slider-thumbnail">
                            <Image
                                src={data.images[0].src}
                                alt={data.images[0]?.alt || "Slider Images"}
                                width={850}
                                height={850}
                                priority
                                style={{ objectFit: "cover", height: "100%", maxHeight: "850px" }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
};

HeroArea.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(HeadingType),
        texts: PropTypes.arrayOf(TextType),
        buttons: PropTypes.arrayOf(ButtonType),
        images: PropTypes.arrayOf(ImageType),
    }),
    showScheduleButton: PropTypes.bool,
    calendlyUrl: PropTypes.string,
};

export default HeroArea;
