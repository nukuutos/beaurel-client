import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { signOut } from "../../../redux/auth/actions";
import useMediaQuery from "../../../hooks/use-media-query";
import Modal from "../../utils/modal";
import { useState } from "react";

const renderNavigation = (links, isTabView) => {
  const { id: userId, accessToken } = useSelector((state) => state.auth);

  const setAccessTokenToCookie = () => {
    Cookies.set("accessToken", accessToken);
  };

  const onClick = accessToken ? setAccessTokenToCookie : null;
  // how to handle 404?

  const router = useRouter();

  return links.map((link) => {
    return (
      <li
        onClick={onClick}
        className={`navbar__link ${router.asPath === link.path ? "navbar__link--active" : ""}`}
        key={link.path}
      >
        {link.path === `/${userId}` ? (
          <Link href={`/[id]`} as={link.path}>
            <a>
              <FontAwesomeIcon className="navbar__icon" icon={link.icon} /> {!isTabView && link.name}
            </a>
          </Link>
        ) : (
          <Link href={link.path}>
            <a>
              <FontAwesomeIcon className="navbar__icon" icon={link.icon} /> {!isTabView && link.name}
            </a>
          </Link>
        )}
      </li>
    );
  });
};

const renderMobileNavigation = (userId, accessToken) => {
  const setAccessTokenToCookie = () => {
    // Cookies.set("accessToken", accessToken);
  };

  const onClick = accessToken ? setAccessTokenToCookie : null;
  // how to handle 404?

  const router = useRouter();

  const links = [
    { name: "Профиль", path: `/${userId}`, icon: "user-alt" },
    { name: "Записи", path: "/appointments", icon: ["far", "calendar-alt"] },
    { name: "Поиск", path: "/search", icon: "search" },
    { name: "Твои Мастера", path: "/masters", icon: "star" },
  ];

  return links.map((link) => {
    return (
      <li
        onClick={onClick}
        className={`mobile-navbar__item ${router.asPath === link.path ? "mobile-navbar__item--active" : ""}`}
        key={link.path}
      >
        {link.path === `/${userId}` ? (
          <Link href={`/[id]`} as={link.path}>
            <a>
              <FontAwesomeIcon className="mobile-navbar__icon" icon={link.icon} />
            </a>
          </Link>
        ) : (
          <Link href={link.path}>
            <a>
              <FontAwesomeIcon className="mobile-navbar__icon" icon={link.icon} />
            </a>
          </Link>
        )}
      </li>
    );
  });
};

const Navbar = ({ links, isAuth }) => {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const { id: userId, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isTabLand = useMediaQuery(1200);
  const isPhone = useMediaQuery(600);
  const isTabView = isTabLand && !isPhone; // 600px - 1200px

  const mobileSidenavVisibleClassName = isPhone && isMobileNavActive ? "mobile-sidenav--visible" : "";

  const mobileSidenavClassName = isPhone ? "mobile-sidenav" : "";

  return (
    <>
      {isPhone && isMobileNavActive && <Modal onBackgroundClose={() => setIsMobileNavActive(false)} />}
      <nav className={`navbar card card--layout ${mobileSidenavClassName} ${mobileSidenavVisibleClassName}`}>
        {renderNavigation(links, isTabView)}
        {isAuth && (
          <li className="navbar__link">
            <Link href="/">
              <a onClick={() => dispatch(signOut())}>
                <FontAwesomeIcon className="navbar__icon" icon="door-open" />
                {!isTabView && "Выход"}
              </a>
            </Link>
          </li>
        )}
      </nav>

      {isPhone && (
        <nav className={`mobile-navbar card card--layout`}>
          <div className="mobile-navbar__main">
            {renderMobileNavigation(userId, accessToken)}
            <li onClick={() => setIsMobileNavActive(true)} className="mobile-navbar__item">
              <FontAwesomeIcon className="mobile-navbar__icon" icon="bars" />
            </li>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
