import styled from "styled-components";
import Button from "@material-ui/core/Button";

const OutlineButton = styled(Button)`
  border: 1.5px solid ${props => props.theme.bgButton} !important;
  height: 40px;
  font-size: 16px;
  border-radius: 20px !important;
  background-color: ${props => props.theme.bgContainer} !important;
  color: ${props => props.theme.bgButton} !important;
  text-transform: none !important;
`;

export default OutlineButton;
