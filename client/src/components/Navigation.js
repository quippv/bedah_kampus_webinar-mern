import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { Logo } from "./Logo";
import { PrimaryButton, Backdrop, Search } from "./UI";
import { NavLink } from "react-router-dom";
import { neutral, primary, typeScale } from "../utils";
import { Profile } from "./Profile";
import { Menu as MenuIcon, X as XIcon } from "react-feather";

const Nav = styled.div`
  width: 100%;
  padding: 30px 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease-in;
  background: ${neutral[100]};

  @media (max-width: 700px) {
    padding: 30px 10px;
    transition: all 0.5s ease-out;
  }
`;

const NavigationItem = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;

  svg {
    display: none;
    cursor: pointer;

    &:hover {
      color: ${primary[300]};
    }
  }

  @media (max-width: 900px) {
    width: unset;

    svg {
      display: block;
    }

    a {
      display: none;
    }

    button {
      display: none;
    }
  }
`;

const activeClassName = "nav-item-active";

const Link = styled(NavLink).attrs({ activeClassName })`
  color: ${neutral[500]};
  text-decoration: none;
  font-size: ${typeScale.h5};
  font-weight: bold;

  &.${activeClassName} {
    color: ${primary[100]};
  }
`;

const links = [
  {
    name: "Event",
    link: "/",
    exact: true,
  },
  {
    name: "About",
    link: "/about",
    exact: false,
  },
  {
    name: "Contact",
    link: "/contact",
    exact: false,
  },
];

export const Navigation = ({ openSideBar, signInClick, isAuth }) => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const scroll = () => {
      const isscroll = window.scrollY > 150;
      if (isscroll !== isScroll) {
        setIsScroll(isscroll);
      }
    };

    document.addEventListener("scroll", () => {
      scroll();
    });
    return () =>
      document.removeEventListener("scroll", () => {
        scroll();
      });
  }, [isScroll]);

  const styleAuthNav = isAuth
    ? {
        padding: "20px 0",
        background: neutral[200],
        width: "90%",
        margin: "0 auto",
        borderBottom: `2px solid ${neutral[300]}`,
        transition: "all 0.5s linear",
      }
    : {};

  return (
    <Nav
      style={{
        position: isScroll ? "fixed" : "unset",
        left: 0,
        top: 0,
        boxShadow: isScroll ? `2px 0 2px rgba(0, 0, 0, 0.25)` : "unset",
        ...styleAuthNav,
      }}
    >
      {!isAuth ? (
        <>
          <Logo link="/" />
          <NavigationItem>
            {links.map((link) => (
              <Link key={link.name} to={link.link} exact={link.exact}>
                {link.name}
              </Link>
            ))}
            <PrimaryButton modifiers="small" onClick={signInClick}>
              Sign In
            </PrimaryButton>
            <MenuIcon onClick={openSideBar} />
          </NavigationItem>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Logo
              link="/home"
              style={{
                marginRight: "1rem",
              }}
            />
            <Search />
          </div>
          <Profile />
        </>
      )}
    </Nav>
  );
};

const SideWrapper = styled(animated.div)`
  width: 70%;
  height: 100%;
  background: ${neutral[100]};
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px 90px;
  display: flex;
  flex-direction: column;
  z-index: 30;
  box-shadow: 0px -99px 80px rgba(0, 0, 0, 0.07),
    0px -41.3598px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px -22.1129px 17.869px rgba(0, 0, 0, 0.0417275),
    0px -12.3963px 10.0172px rgba(0, 0, 0, 0.035),
    0px -6.5836px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px -2.73958px 2.21381px rgba(0, 0, 0, 0.0196802);

  @media (max-width: 700px) {
    padding: 20px 10px;
    transition: all 0.5s ease-out;
  }

  svg {
    cursor: pointer;
  }
`;

const SideBarItem = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

export const SideBar = ({ showSideBar, sideBar, signInClick }) => {
  const animation = useSpring({
    opacity: sideBar ? 1 : 0,
    transform: sideBar ? "translateX(0)" : "translateX(200%)",
    config: config.slow,
  });

  return (
    <>
      <SideWrapper style={animation}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <XIcon onClick={showSideBar} />
        </div>
        <SideBarItem>
          {links.map((link) => (
            <Link key={link.name} to={link.link} exact={link.exact}>
              {link.name}
            </Link>
          ))}
          <PrimaryButton modifiers="small" onClick={signInClick}>
            Sign In
          </PrimaryButton>
        </SideBarItem>
      </SideWrapper>
      {sideBar && <Backdrop onClick={showSideBar} />}
    </>
  );
};
