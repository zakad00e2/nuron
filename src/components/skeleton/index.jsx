import PropTypes from "prop-types";
import clsx from "clsx";

const Skeleton = ({ className, type = "text", count = 1 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case "card":
                return (
                    <div className={clsx("skeleton skeleton-card", className)}>
                        <div className="skeleton-image" />
                        <div className="skeleton-title" />
                        <div className="skeleton-text" />
                    </div>
                );
            case "image":
                return <div className={clsx("skeleton skeleton-image", className)} />;
            case "avatar":
                return <div className={clsx("skeleton skeleton-avatar", className)} />;
            case "title":
                return <div className={clsx("skeleton skeleton-title", className)} />;
            default:
                return <div className={clsx("skeleton skeleton-text", className)} />;
        }
    };

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} style={{ width: "100%" }}>
                    {renderSkeleton()}
                </div>
            ))}
        </>
    );
};

Skeleton.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(["text", "title", "image", "avatar", "card"]),
    count: PropTypes.number,
};

export default Skeleton;
