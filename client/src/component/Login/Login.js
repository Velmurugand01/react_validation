import React from 'react'
import {Box, Container, Stack,styled,Typography,TextField, Button} from '@mui/material'

import Img from '../images/mobile.jpg'
import './Login.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const validationSchema = Yup.object({
 
  emailOrPhone: Yup.string().test(
    'is-email-or-phone',
    'Invalid email or phone number',
    function (value) {
      // Check if the value is a valid email or phone number
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/; // Adjust the phone number regex as needed

      return emailRegex.test(value) || phoneRegex.test(value);
    }
  ).required('Email or Phone Number is required'),
  password: Yup.string().required('Password is required'),
});




const Boxs = styled(Box)
`
height:400px;
width:400px;

`
const Boximg = styled(Box)
`
height:550px;
width:550px;


`

const Typographys =styled(Typography)`
color:  #000;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

/* Heading/36PX Medium */
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 30px; /* 83.333% */
letter-spacing: 1.44px;
`
const Buttons = styled(Button)
`
 font-family: Poppins;
 

`



const TextFields = styled(TextField)`
  width:350px;

  & .MuiInputLabel-root {
    font-family: 'Poppins', sans-serif; // Specify your desired font family
  }

  & .Mui-focused {
    color:gray; // Specify your desired focused color
  }
  & .MuiInput-underline:after {
    border-bottom-color:gray; // Specify your desired underline color for the focused state
  }
`;

function Login() {

  


  const formik = useFormik({
    initialValues: {

      emailOrPhone: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/login', values);
        console.log(response);
        if(response.data.message){
          alert(response.data.message)
        }
        else{
            
           alert(response.data.success)

           console.log(response.data.token);
           document.cookie = `jwt=${response.data.token}; path=/`;
        };

       
      } catch (error) {
       
        console.log(error);
      }
    },
  });


  return (
    <Container maxWidth='lg'  >

<Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{  sm: 2,  }}
  justifyContent={'space-evenly'}
  alignItems={'center'} 
  sx={{ height:'100vh'}}
>
  <Boximg sx={{backgroundImage:`url(${Img})`, backgroundPosition:'center',backgroundSize:'cover',objectFit:'cover', display: { xs:'none', sm: 'none', md: 'block' }}}>
  
  </Boximg>




  <Boxs sx={{ display:'flex', flexDirection:'column', alignItems:{xs:'center',sm:'flex-start'} ,justifyContent:{xs:'center', sm:'space-evenly'},gap:'20px'}} >
  
  <Box sx={{display:'flex', flexDirection:'column',alignItems:{xs:'center',sm:'flex-start'},gap:'20px'}}>
  <Typographys variant='h5' className="Createanaccount" sx={{fontSize:'36px'}}>Log in to Exclusive</Typographys>
  <Typographys className="Enteryourdetailsbelow" >Enter your details below</Typographys>
  </Box>
  <form onSubmit={formik.handleSubmit}>
<Box sx={{display:'flex',flexDirection:'column',alignItems:'center',gap:'40px'}}>
<Box sx={{display:'flex',flexDirection:'column',alignItems:{xs:'center',sm:'flex-start'},gap:'40px'}}>


        <TextFields
          label="Email or Phone Number"
          variant="standard"
          id="emailOrPhone"
          name="emailOrPhone"
          value={formik.values.emailOrPhone}
          onChange={formik.handleChange}
          error={formik.touched.emailOrPhone && Boolean(formik.errors.emailOrPhone)}
          helperText={formik.touched.emailOrPhone && formik.errors.emailOrPhone}
          sx={{width:{xs:'300px',sm:'350px'}}}
        />

        <TextFields
          label="Password"
          variant="standard"
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{width:{xs:'300px',sm:'350px'}}}
        />
  </Box>

  <Box sx={{display:'flex',alignItems:'center',gap:{xs:'30px',sm:'50px'},justifyContent:'space-evenly' }}>
  <Buttons variant='contained' color='error' sx={{padding:{xs:'8px 22px',sm:'10px 40px'}}} type="submit">Log in </Buttons> 
  <Buttons color='error'>Forget Password?</Buttons>

  </Box>
</Box>
  </form>
  </Boxs>
</Stack>
    </Container>
  )
}

export default Login