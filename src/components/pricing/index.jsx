import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";

const PricingCard = ({ 
    title, 
    price, 
    currency = "$", 
    period = "/Month", 
    features, 
    icon, 
    isActive, 
    buttonText = "Shop Now",
    onButtonClick 
}) => {
    return (
        <div className={clsx("pricing-card", isActive && "active")}>
            <div className="pricing-header">
                <h3 className="title">{title}</h3>
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
                <ul className="features-list">
                    {features.map((feature, index) => (
                        <li key={index} className={clsx(!feature.included && "disabled")}>
                            <i className="feather-check"></i>
                            {feature.text}
                        </li>
                    ))}
                </ul>
                <Button 
                    path="#" 
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
    onButtonClick: PropTypes.func
};

export default PricingCard;
