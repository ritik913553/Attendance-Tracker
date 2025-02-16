import React from 'react'

const ForgotPassword = () => {
    const handleForgotPassword = ()=>{

    }
    const getOtp = async (e)=>{
        e.preventDefault();
        await axios.post('/ap1/v1/auth/request-otp')
    }
  return (
    <div>
      
    </div>
  )
}

export default ForgotPassword
