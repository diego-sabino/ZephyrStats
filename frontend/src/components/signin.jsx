import React, { useEffect, useState} from 'react';
import api from '../services/services';
import { Redirect } from 'react-router-dom';


export default function SignIn() {

  const [redirect, setRedirect] = useState(false);
  const [emailInUse, setEmail] = useState(false)
  const [usernameinUse, setUser] = useState(false)
  const [disableBtn, setDisableBtn] = useState(true)
  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formValue;

  const handleSubmit = (event) => {
    event.preventDefault();
    
    api.post('/signin', {
      email, username, password
    }).then((response) => {
      if (response.status === 201) {
        setRedirect(true);
      }
    }).catch((error) => {
      setRedirect(false);
    });
  };

  useEffect(() => {
    api.post('/email', {
      email
    }).then((_response) => {
      setEmail(false);
    }).catch((_error) => {
      setEmail(true);
    });
    api.post('/user', {
      username
    }).then((_response) => {
      setUser(false);
    }).catch((error) => {
      setUser(true);
    });

    (emailInUse ? setDisableBtn(true) : setDisableBtn(false))
    console.log(emailInUse);
  }, [email, username, disableBtn, emailInUse, usernameinUse])

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <section className="bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="https://github.com/Diego-Sabino" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Zephyr664    
      </a>
      <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={ handleSubmit }>
                  <div>
                      <label htmlFor="username" className={(usernameinUse === false) ? "block mb-2 text-sm font-medium text-gray-300" : "block mb-2 text-sm font-medium text-red-500"}>Username</label>
                      <input
                        className={(usernameinUse === false) ? "border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
                        : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"} required={true}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username" 
                        onChange={ handleChange }
                        value={ username }
                       />
                       {(usernameinUse) ? <p class="mt-2 text-sm text-red-600 dark:text-red-500">{username} já está em uso</p> : null}
                  </div>
                  <div>
                      <label htmlFor="email" className={(emailInUse === false) ? "block mb-2 text-sm font-medium text-gray-300" : "block mb-2 text-sm font-medium text-red-500"}>Email</label>
                      <input 
                        className={(emailInUse === false) ? "border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
                        : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"} placeholder="name@company.com" required={true} 
                        type="email"
                        name="email"
                        id="email"
                        onChange={ handleChange }
                        value={ email }
                        />
                        {(emailInUse) ? <p class="mt-2 text-sm text-red-600 dark:text-red-500">{email} já está em uso</p> : null}
                  </div>
                  <div>
                      <label htmlFor="password" className={"block mb-2 text-sm font-medium text-gray-300"}>Password</label>
                      <input
                        className={"border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"}
                        required={true}
                        type="password"
                        name="password"
                        id="password"
                        onChange={ handleChange }
                        value={ password }
                       />
                  </div>
                  <button
                  disabled={disableBtn}
                  type="submit"
                  className={(disableBtn) ? "w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-300 hover:bg-primary-300 focus:ring-primary-300" 
                  : "bg-primary-600 hover:bg-primary-700 w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"}>Sign in</button>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}