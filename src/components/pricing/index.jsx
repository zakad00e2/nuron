import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import { useLanguage } from "@contexts/LanguageContext";

const PricingCard = ({ 
    title, 
    price, 
    currency = "$", 
    period = "/Month", 
    features, 
    icon, 
    isActive, 
    buttonText = "Shop Now",
    onButtonClick,
    link
}) => {
    const { language } = useLanguage();
    const isRtl = language === "ar";

    return (
        <div 
            className={clsx("pricing-card", isActive && "active")}
            style={{ 
                direction: isRtl ? 'rtl' : 'ltr',
                fontFamily: isRtl ? 'Cairo, sans-serif' : 'inherit'
            }}
        >
            <div className="pricing-header" style={{ textAlign: 'center' }}>
                <h3 className="title" style={{ textAlign: 'center' }}>{title}</h3>
                <div className="icon-wrapper">
                    <i className={icon}></i>
                </div>
            </div>
            <div className="pricing-body">
                <div className="price-wrapper">
                    <span className="currency">{currency}</span>
                    <span className="price">{price}</span>
                    <span className="period">{period}</span>
                </div>
                <ul className="features-list" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    {features.map((feature, index) => (
                        <li key={index} className={clsx(!feature.included && "disabled")} style={{ justifyContent: isRtl ? 'flex-start' : 'flex-start' }}>
                            <i className="feather-check" style={{ marginLeft: isRtl ? '10px' : '0', marginRight: isRtl ? '0' : '10px' }}></i>
                            {feature.text}
                        </li>
                    ))}
                </ul>
                <Button 
                    path={link || "#"} 
                    className="btn-pricing btn-primary"
                    onClick={onButtonClick}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

PricingCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    currency: PropTypes.string,
    period: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        included: PropTypes.bool
    })),
    icon: PropTypes.string,
    isActive: PropTypes.bool,
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func,
    link: PropTypes.string
};

export default PricingCard;
