import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";

const StyledInput = styled(InputBase)`
  padding: 0 0 7px 0;
  border-bottom: 1px solid #dddddd;
  & > input {
    padding: 0;
    font-size: 12px;
  }
`;

export default StyledInput;
