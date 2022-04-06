import React from "react";
import styled from "styled-components";

const StyledIcon = styled.i`
  position: absolute;
  top: 4px;
  right: 2px;
  padding: 10px;
  font-size: 22px;
  color: ${props => props.theme.warnIcon};
`;

const WarningIcon = () => <StyledIcon className="la la-warning" />;

export default WarningIcon;
