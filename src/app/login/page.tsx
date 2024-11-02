'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import _ from 'lodash';
import { useState, useEffect, ReactHTMLElement } from 'react';
import useAuth from '../auth/hook/useAuth';
import Swal from 'sweetalert2';



export default function Home() {
    const {handlerLogin} = useAuth();
    const login = {
        username : '',
        password: ''
    } 
  const [user, setUser] = useState( login );
  

  const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value
  }));};
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handlerLogin(user.username, user.password);
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <div className="mb-4">
         
          <Input
            name='username'
            label="Usuario"
            placeholder="Ingrese su usuario"
            value={user.username}
            onChange={(e) => handleOnChange(e)}
            isRequired
            
            
          />
        </div>
        <div className="mb-6">
         
          <Input
            name='password'
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            type="password"
            value={user.password}
            onChange={(e) => handleOnChange(e)}
            isRequired
            
          />
        </div>
        <div className='flex justify-center '>
        <Button
          type="submit"
          color='primary'
        >
          Login
        </Button>
        </div>
      </form>
    </div>
  );
}
