import styled from "styled-components";
import Button from "@material-ui/core/Button";

const ButtonShadow = styled(Button)`
  border: none;
  height: 40px;
  font-size: 12px !important;
  border-radius: 20px !important;
  background-color: ${props => props.theme.bgContainer} !important;
  text-transform: none !important;
  outline: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 12px !important;
  justify-content: center !important;
  display: flex !important;
  font-weight: bold !important;
  width: 100%;
`;

export default ButtonShadow;
