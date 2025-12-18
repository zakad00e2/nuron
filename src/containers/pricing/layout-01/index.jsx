import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PricingCard from '@components/pricing';
import { useLanguage } from '@contexts/LanguageContext';
import { getTranslation } from '@utils/translations';

const staticPricingConfig = [
    { 
        id: 1, 
        icon: "feather-box", 
        isActive: false 
    },
    { 
        id: 2, 
        icon: "feather-bar-chart-2", 
        isActive: true 
    },
    { 
        id: 3, 
        icon: "feather-award", 
        isActive: false 
    }
];

const PricingArea = ({ className, space = 1, data }) => {
    const { language } = useLanguage();
    const isRtl = language === "ar";
    const t = getTranslation(language, "pricing");
    
    if (!t) return null;

    const plans = data?.plans || t.plans || [];

    return (
        <div className={clsx("rn-pricing-area", space === 1 && "rn-section-gapTop", className)} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
            <div className="container">
                <div className="row mb--50">
                    <div className="col-lg-12">
                        <div className="section-title text-center" style={{ textAlign: 'center' }}>
                            <h2 className="title" style={{ fontFamily: isRtl ? 'Cairo, sans-serif' : 'inherit', textAlign: 'center' }}>{t.title}</h2>
                            <p className="description" style={{ fontFamily: isRtl ? 'Cairo, sans-serif' : 'inherit', textAlign: 'center' }}>
                                {t.description}
                            </p>
                        </div>
                        {/* <div className="pricing-toggle">
                            <span className="label" style={{ fontFamily: isRtl ? 'Cairo, sans-serif' : 'inherit' }}>{t.yearly}</span>
                            <span className="badge-discount" style={{ fontFamily: isRtl ? 'Cairo, sans-serif' : 'inherit' }}>{t.discount}</span>
                        </div> */}
                    </div>
                </div>
                <div className="row g-5">
                    {plans.map((plan, index) => {
                        const config = staticPricingConfig[index] || {};
                        // Map string features to object structure expected by PricingCard
                        const features = plan.features.map(feature => ({
                            text: feature,
                            included: true
                        }));

                        return (
                            <div key={plan.id || index} className="col-lg-4 col-md-6 col-12">
                                <PricingCard
                                    title={plan.title}
                                    price={plan.price}
                                    icon={config.icon}
                                    features={features}
                                    isActive={config.isActive}
                                    buttonText={t.orderNow}
                                    period={t.perMonth}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

PricingArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
};

export default PricingArea;
