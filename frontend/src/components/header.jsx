import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import logor6s from '../Rainbow-Six-Symbol.png';
import api from '../services/services';
import '../styles/App.css';

function Header() {

  const [username, setUsername] = useState("")
  const [img, setImg] = useState("")
  const [platform, setPlatform] = useState("")
  const [redirect, setRedirect] = useState(false)


  const token = `${localStorage.getItem('token')}`;
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    const data = {
      token
    }
    api.post('/username', data, {
      headers: headers
    }).then((response) => {
      if (response.data) {
        setImg(response.data.avatar)
        setPlatform(response.data.platform)
        setUsername(response.data.username)
      }
    }).catch((_error) => {
      setRedirect(true)
    });
  }, [token])

  if(!token || redirect) {
    return <Redirect to="/login" />
  }
  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
        <div
          className="flex flex-wrap justify-between
        items-center mx-auto max-w-screen-xl"
        >
          <a href="https://github.com/diego-sabino" className="flex items-center">
            <img src={ logor6s } className="mr-3 h-6 sm:h-9" alt="r6s logo" />
            <span
              className="self-center text-xl font-semibold
            whitespace-nowrap text-white"
            >
              zephyr664

            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <a
              href={ `/stats/${platform}/${username}`}
              className="
                text-white hover:bg-gray-50 focus:ring-4
                focus:ring-gray-300
                font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2
                hover:bg-gray-700
                focus:outline-none focus:ring-gray-800"
            >
              {(img !== null) ? <img className='w-[40px] rounded-full' alt='img' align="left" src={img} /> : null}
            </a>
            <h5 className='text-gray-400' >{username}</h5>
          </div>
          <div
            className="justify-center items-center
           w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul
              className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8
            lg:mt-0"
            >
              <li>
                <a
                  href="/"
                  className="block py-2 pr-4 pl-3 text-white rounded
                  bg-primary-700 lg:bg-transparent lg:text-primary-700
                  lg:p-0 text-white"
                  aria-current="page"
                >
                  Home

                </a>
              </li>
              <li>
                <a
                  href="/stats"
                  className="
                    block py-2 pr-4 pl-3 text-gray-700 border-b
                    border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent
                    lg:border-0 lg:hover:text-primary-700 lg:p-0
                    text-gray-400 lg:hover:text-white
                    hover:bg-gray-700 hover:text-white
                    lg:hover:bg-transparent border-gray-700"
                >
                  Stats

                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
