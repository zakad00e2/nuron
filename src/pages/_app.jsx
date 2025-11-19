import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@contexts/LanguageContext";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    
    // Initialize direction on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        const isRTL = savedLanguage === "ar";
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
            document.documentElement.setAttribute("lang", savedLanguage || "en");
        }
    }, []);
    
    return (
        <ThemeProvider defaultTheme="dark">
            <LanguageProvider>
                <Component {...pageProps} />
            </LanguageProvider>
        </ThemeProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
