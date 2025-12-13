import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PricingCard from '@components/pricing';

const pricingData = [
    {
        id: 1,
        title: "STARTER",
        price: "65",
        icon: "feather-box",
        features: [
            { text: "The point of using lorem offer", included: true },
            { text: "Lorem Ipsum is simply dummy", included: true },
            { text: "Premium Phone Support", included: true },
            { text: "Unlimited Bandwidth", included: true },
            { text: "Lorem Ipsum is simply dummy", included: true },
            { text: "The point of using lorem", included: true },
        ]
    },
    {
        id: 2,
        title: "PREMIUM",
        price: "85",
        icon: "feather-bar-chart-2",
        isActive: true,
        features: [
            { text: "The point of using lorem offer", included: true },
            { text: "Lorem Ipsum is simply dummy", included: true },
            { text: "Premium Phone Support", included: true },
            { text: "Unlimited Bandwidth", included: true },
            { text: "Lorem Ipsum is simply dummy", included: true },
            { text: "The point of using lorem", included: true },
        ]
    },
    {
        id: 3,
        title: "ULTIMATE",
        price: "97",
        icon: "feather-award",
        features: [
            { text: "The point of using lorem offer", included: true },
            { text: "Lorem Ipsum is simply dummy", included: true },
            { text: "Premium Phone Support", included: true },
            { text: "Unlimited Bandwidth", included: true },
            { text: "Lorem Ipsum is simply dummy", included: true },
            { text: "The point of using lorem", included: true },
        ]
    }
];

const PricingArea = ({ className, space = 1 }) => {
    return (
        <div className={clsx("rn-pricing-area", space === 1 && "rn-section-gapTop", className)}>
            <div className="container">
                <div className="row mb--50">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h2 className="title">Pricing Plans For Everyone</h2>
                            <p className="description">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            </p>
                        </div>
                        <div className="pricing-toggle">
                            <span className="label">Yearly</span>
                            <span className="badge-discount">50% OFF</span>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    {pricingData.map((data) => (
                        <div key={data.id} className="col-lg-4 col-md-6 col-12">
                            <PricingCard
                                title={data.title}
                                price={data.price}
                                icon={data.icon}
                                features={data.features}
                                isActive={data.isActive}
                            />
                        </div>
                    ))}
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
