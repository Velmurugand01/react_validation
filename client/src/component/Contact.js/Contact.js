import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Contact() {
  return (
    <GoogleLogin
    onSuccess={credentialResponse => {
        var credentialResponsedecode=jwtDecode(credentialResponse.credential)
      console.log(credentialResponsedecode);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  )
}

export default Contact