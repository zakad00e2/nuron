/* eslint-disable no-console */
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Web3 from "web3";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import ColorSwitcher from "@components/color-switcher";
import LanguageSwitcher from "@components/language-switcher";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import { useLanguage } from "@contexts/LanguageContext";
import { getTranslation } from "@utils/translations";
import { useMemo } from "react";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";

const Header = ({ className }) => {
    const { language } = useLanguage();
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ethBalance, setEthBalance] = useState("");

    // Translate menu items
    const translatedMenu = useMemo(() => {
        const menuTranslations = {
            1: "common.home",
            2: "common.books",
            3: "common.authors",
            4: "common.publishers",
            5: "common.whitepaper",
            6: "common.blog",
            7: "common.store",
        };

        return menuData.map((item) => ({
            ...item,
            text: getTranslation(language, menuTranslations[item.id] || `common.${item.text.toLowerCase()}`) || item.text,
        }));
    }, [language]);

    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log(
                "Non-ethereum browser detected. You should install Metamask"
            );
        }
        return provider;
    };

    const onConnect = async () => {
        try {
            const currentProvider = detectCurrentProvider();
            if (currentProvider) {
                await currentProvider.request({
                    method: "eth_requestAccounts",
                });
                const web3 = new Web3(currentProvider);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                const getEthBalance = await web3.eth.getBalance(account);
                setEthBalance(getEthBalance);
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onDisconnect = () => {
        setIsAuthenticated(false);
    };

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={translatedMenu} />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            {/* <div className="setting-option d-none d-lg-block">
                                <SearchForm />
                            </div> */}
                            {/* <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div> */}
                            {/* {!isAuthenticated && (
                                <div className="setting-option header-btn">
                                    <div className="icon-box">
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={onConnect}
                                        >
                                            Wallet connect
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {isAuthenticated && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown
                                        onDisconnect={onDisconnect}
                                        ethBalance={ethBalance}
                                    />
                                </div>
                            )} */}
                            {/* <div className="setting-option rn-icon-list notification-badge">
                                <div className="icon-box">
                                    <Anchor path={headerData.activity_link}>
                                        <i className="feather-bell" />
                                        <span className="badge">6</span>
                                    </Anchor>
                                </div>
                            </div> */}
                            {/* <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div> */}
                            <div className="setting-option">
                                <LanguageSwitcher />
                            </div>
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={translatedMenu}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
