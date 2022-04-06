import styled from "styled-components";
import Button from "@material-ui/core/Button";

const SubmitButton = styled(Button)`
  background-color: ${props => props.theme.bgButton} !important;
  height: 40px;
  color: white !important;
  font-size: 16px;
  text-transform: none !important;
  border-radius: 20px !important;
`;

export default SubmitButton;
