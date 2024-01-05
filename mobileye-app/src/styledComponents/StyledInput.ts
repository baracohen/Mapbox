import styled from '@emotion/styled';
import { TextField, Grid, Button } from '@mui/material';

export const StyledInputContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  width:'100%'
  flexDirection: 'column'
`;


export const ZipCodeInput = styled(TextField)`
  margin-right: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const SubmitButton = styled(Button)`
  height: 100%;
  font-size: 16px; 
  padding: 12px 24px;
  border-radius: 8px
`;


