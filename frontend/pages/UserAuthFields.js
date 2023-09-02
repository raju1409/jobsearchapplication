


import { useState } from 'react';

const userAuthFields = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

  const [isPhoneNumberValidated, setIsPhoneNumberValidated] = useState(true);

  return { name, password, email,phoneNumber,isPhoneNumberValidated,
          setPhoneNumber,setIsPhoneNumberValidated,setEmail, setName, setPassword }
  };


export default userAuthFields;
