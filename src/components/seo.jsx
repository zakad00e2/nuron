import Head from "next/head";
import PropTypes from "prop-types";

const SEO = ({ pageTitle, description, image }) => {
    const title = `${pageTitle}`;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "www.autor.one"; // Replace with actual domain

    return (
        <Head>
            <title>{title}</title>
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content={description || "Nuron - Comprehensive Digital Platform"} />
            <meta name="robots" content="index, follow" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link rel="icon" href="/images/logo/top.png" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || "Nuron - Comprehensive Digital Platform"} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description || "Nuron - Comprehensive Digital Platform"} />
            {image && <meta property="twitter:image" content={image} />}
        </Head>
    );
};

SEO.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
};

export default SEO;
