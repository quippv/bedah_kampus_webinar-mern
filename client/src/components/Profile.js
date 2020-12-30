import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  User as UserIcon,
  ShoppingCart as CartIcon,
  Bookmark as BookmarkIcon,
  Youtube as YoutubeIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
} from "react-feather";
import { text, neutral, typeScale, error } from "../utils";
import styled from "styled-components";
import { setAuthLogout } from "../store/actions";

const ProfileDropDown = styled.div`
  padding: 20px;
  background: ${neutral[100]};
  position: absolute;
  bottom: -275px;
  right: -10px;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 6px;
  z-index: 9;

  &::before {
    content: "";
    display: block;
    background: #ffffff;
    border-radius: 5px;
    transform: rotate(-45deg);
    position: absolute;
    width: 27px;
    height: 27px;
    top: -10px;
    right: 10px;
  }
`;

const LinkDiv = styled(NavLink)`
  width: 180px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  svg {
    color: ${neutral[600]};
  }

  &:hover {
    background: ${neutral[200]};
    border-radius: 5px;
  }

  &.active {
    background: ${neutral[300]};
    border-radius: 5px;
  }
`;

const LinkFont = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: ${typeScale.paragraph};
  line-height: 19px;
  display: flex;
  align-items: center;
  color: ${neutral[600]};
  margin-left: 17px;
`;

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const logOutHandler = async () => {
    await dispatch(setAuthLogout(token));
  };

  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        position: "relative",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <UserIcon
        style={{
          width: 30,
          height: 30,
          padding: 5,
          borderRadius: "50%",
          background: text.inverted,
          cursor: "pointer",
        }}
      />
      {open && (
        <ProfileDropDown
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <LinkDiv exact={true} to="/cart" activeClassName="active">
            <CartIcon />
            <LinkFont>Cart</LinkFont>
          </LinkDiv>
          <LinkDiv to="/bookmark" activeClassName="active">
            <BookmarkIcon />
            <LinkFont>Bookmark</LinkFont>
          </LinkDiv>
          <LinkDiv to="/webinar" activeClassName="active">
            <YoutubeIcon />
            <LinkFont>Your Webinar</LinkFont>
          </LinkDiv>
          <LinkDiv to="/setting" activeClassName="active">
            <SettingsIcon />
            <LinkFont>Settings</LinkFont>
          </LinkDiv>
          <LinkDiv to="/logout" onClick={logOutHandler}>
            <LogOutIcon style={{ color: error[100] }} />
            <LinkFont style={{ color: error[100] }}>Sign Out</LinkFont>
          </LinkDiv>
        </ProfileDropDown>
      )}
    </div>
  );
};
