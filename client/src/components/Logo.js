import styled from "styled-components";
import { Link } from "react-router-dom";
import { primary } from "../utils";

const FontLogo = styled(Link)`
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  text-decoration: none;
  font-size: 24px;
  color: ${primary[100]};
`;

export const Logo = ({ style, link }) => (
  <FontLogo to={link} style={{ ...style }}>
    BedahKampus
  </FontLogo>
);

export default Logo;
