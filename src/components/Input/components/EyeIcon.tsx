import React from "react";
import styled from "styled-components";
import className from "classnames";

const StyledIcon = styled.i`
  position: absolute;
  top: -10px;
  right: -5px;
  padding: 10px;
  cursor: pointer;
  font-size: 22px;
  color: #6a46e5;
  transition: transform 0.3s ease-out;
  font-weight: bold;
  &:hover {
    transform: scale(1.2);
  }
`;

interface EyeIconProp {
  clickHandler: Function;
  isEyeClose: boolean;
}

const EyeIcon = React.memo((props: EyeIconProp) => (
  <StyledIcon
    className={className(
      "la",
      { "la-eye": props.isEyeClose },
      { "la-eye-slash": !props.isEyeClose }
    )}
    onClick={() => props.clickHandler()}
  />
));

export default EyeIcon;
