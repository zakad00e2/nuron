import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Anchor from "@ui/anchor";
import clsx from "clsx";
import SubMenu from "./submenu";
import MegaMenu from "./megamenu";

const MainMenu = ({ menu }) => {
    const router = useRouter();
    
    return (
        <ul className="mainmenu">
            {menu.map((nav) => {
                const isActive = router.pathname === nav.path || 
                    (nav.path !== "/" && router.pathname.startsWith(nav.path));
                
                return (
                    <li
                        key={nav.id}
                        className={clsx(
                            !!nav.submenu && "has-droupdown has-menu-child-item",
                            !!nav.megamenu && "with-megamenu",
                            isActive && "active"
                        )}
                    >
                        <Anchor 
                            className={clsx("its_new", isActive && "active")} 
                            path={nav.path}
                        >
                            {nav.text}
                        </Anchor>
                        {nav?.submenu && <SubMenu menu={nav.submenu} />}
                        {nav?.megamenu && <MegaMenu menu={nav.megamenu} />}
                    </li>
                );
            })}
        </ul>
    );
};

MainMenu.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MainMenu;
