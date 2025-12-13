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
import PrivacyConsent from "@components/privacy-consent";

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

    useEffect(() => {
        if (!document.getElementById("copilot")) {
            (function(w,d,s,o,f,js,fjs){w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};(js=d.createElement(s)),(fjs=d.getElementsByTagName(s)[0]);js.id=o;js.src=f;js.async=1;js.referrerPolicy = "origin";fjs.parentNode.insertBefore(js,fjs);})(window,document,"script","copilot","https://script.copilot.live/v1/copilot.min.js?tkn=cat-lek3x169");
            
            if (window.copilot) {
                window.copilot("init",{});
            }
        }
    }, []);
    
    return (
        <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="data-theme">
            <LanguageProvider>
                <Component {...pageProps} />
                <PrivacyConsent />
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
