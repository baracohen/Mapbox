// Header.tsx

import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { StyledInputContainer, SubmitButton, ZipCodeInput } from '../../styledComponents/StyledInput';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchZipCodeData } from '../../api/boundaries-api';
import Swal from 'sweetalert2'
import { validateZipCode } from '../../utils/utils';


const ZipCodeInputContainer = () => {
  const [zipCodeValue, setZipCodeValue] = useState<string>("");
  const queryClient = useQueryClient();

  //Query to Fetch the data and store it in cache
  const {isLoading, error, refetch, isFetching} = useQuery({ queryKey: ['geoJson'], queryFn: ()=> fetchZipCodeData(zipCodeValue), enabled: false })
  
    //handling error from the api call
    if (error){
      Swal.fire({
        title: "Oops...",
        text: error?.message,
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, let's retry!"
      }).then((result) => {
        if (result.isConfirmed) {
          refetch()
        }
      });

      queryClient.clear()
    }


  const handleSubmit = () => {
    // call api after click and check if the zip codes are valids
    if(validateZipCode(zipCodeValue)){
      refetch()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid zip code, please enter a vaild zipCode",
      });
    }
  };

  return (
        <StyledInputContainer>
              <ZipCodeInput
                  type="text"
                  label="Zip code"
                  variant='filled'
                  onChange={(e)=>{setZipCodeValue(e.target.value)}}
                  disabled={isLoading}
                  sx={{width:'30%'}}
                  required
                  data-testid="zip-code"
              />
            {isLoading || isFetching ? 
              <CircularProgress data-testid="circular-progress" size={40} />
              :
              <SubmitButton disabled={!zipCodeValue} variant="contained" onClick={handleSubmit} data-testid="submit-button">
                  Submit
              </SubmitButton>
            }
        </StyledInputContainer>
  );
};

export default ZipCodeInputContainer;
