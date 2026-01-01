import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        // Attempt to detect language from query or default to 'en'
        // Note: For full SSG support with i18n, next-i18next config is preferred, 
        // but this helps with the initial server render if locale is passed.
        const { locale } = ctx;
        const dir = locale === "ar" ? "rtl" : "ltr";
        const lang = locale || "en";
        return { ...initialProps, lang, dir };
    }

    render() {
        return (
            <Html lang={this.props.lang} dir={this.props.dir}>
                <Head>
                    {/* Arabic Font Support */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                    {/* Calendly widget CSS */}
                    <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* Calendly widget JS */}
                    <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
