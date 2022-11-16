import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/services';


export default function Login() {

    const [redirect, setRedirect] = useState(false);
    const [authorization, setAuthorization] = useState(null);
    const [formValue, setFormValue] = useState({
      email: '',
      password: '',
    });
  
    const { email, password } = formValue;
  
    const handleSubmit = (event) => {
      event.preventDefault();
      
      api.post('/login', {
        email, password
      }).then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token)
          setAuthorization(true);
          setRedirect(true);
        }
      }).catch((_error) => {
        setAuthorization(false);
        setTimeout(() => {
            setAuthorization(null)
          }, 4000);
      });
    };
  
    const handleChange = (event) => {
      const { name, value, type } = event.target;
      setFormValue((prevState) => ({
        ...prevState,
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }));
    };
  
  
    if (redirect) {
        return <Redirect to="/" />;
    }
    return (
        <section className="bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="http://github.com/diego-sabino" className="flex items-center mb-6 text-2xl font-semibold text-white">
            zephyr664    
        </a>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                    Login in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                id="email"
                                className="border
                                sm:text-sm rounded-lg focus:border-primary-600 
                                block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 
                                text-white focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="name@company.com" 
                                required={true} 
                            />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 
                                sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                                block w-full p-2.5 bg-gray-700 border-gray-600 
                                placeholder-gray-400 text-white focus:ring-blue-500 
                                focus:border-blue-500"
                                required
                            />
                    </div>
                    
                    <button type="submit" className="w-full text-white
                    focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
                    px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 
                    focus:ring-primary-800">Login</button>
                    <p className="text-sm font-light text-gray-400">
                        Don’t have an account yet? <a href="/signin" className="font-medium hover:underline text-primary-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    {(authorization === null) ? null : (
        <div id="toast-bottom-right" className="flex absolute opc motion-reduce:transition-none motion-reduce:hover:transform-none right-5 bottom-5 items-center 
        p-4 space-x-4 w-full max-w-xs rounded-lg  shadow 
        text-gray-400 divide-gray-700 space-x bg-gray-800" role="alert">
        <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 rounded-lg bg-red-800 text-red-200">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 
                4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path></svg>
        </div>
        <div className="ml-3 text-sm font-normal">Usuário e/ou senha inválido(s)</div>
        </div>
        )}
    </div>

    </section>
  )
}