import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #2196f3;
  color: #ffffff;
`;

export const StyledHeaderTypography = styled(Typography)`
  margin-bottom: 24px; 
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;