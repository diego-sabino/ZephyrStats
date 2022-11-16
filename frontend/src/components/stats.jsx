import React, { useEffect, useState } from 'react';
import api from '../services/services';
import '../styles/insert.css';
import Header from './header';

function GetStats() {
  const [platform, setPlatform] = useState('uplay');
  const [returnApi, setReturn] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const [btnHidden, setBtnHidden] = useState(true);

  const [formValue, setFormValue] = useState({
    username: '',
  });

  const { username } = formValue;

  const token = `${localStorage.getItem('token')}`;
  const handleSubmit = (event) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    const data = {
      username, platform
    }
    event.preventDefault();
    api.put('/stats', data, {
      headers: headers
    }).then((response) => {
      if (response.status === 200) {
        setReturn(Object.values(response.data)[0]);
        setBtnHidden(false);
        setNotFound(false)
      }
    }).catch((error) => {
      setNotFound(true)
    });
  };
  console.log(returnApi);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    const data = {
      username, platform
    }
    api.put('/stats/avatar', data, {
      headers: headers
    }).then((response) => {
      if (response.data) {
        console.log(response.data);
        setAvatar(response.data.avatar256);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, [returnApi, platform, token, username])

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const onChangeColor = (event) => {
    setPlatform(event.target.value);
  };

  console.log(notFound);

  return (
  <div>
    <Header />
    <div className="flex h-screen -mt-[150px] bg-white-900">
      <form className="w-full max-w-screen-lg p-30 m-auto" onSubmit={ handleSubmit }>
        <div className="flex items-center justify-center">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide
            text-white-700 text-xs font-bold mb-2"
              htmlFor="username"
            >
              Username
              <input
                className="px-3 bg-gray-700 border border-gray-300 py-4 relative rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                type="text"
                id="username"
                name="username"
                value={ username }
                onChange={ handleChange }
              />
            </label>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 ">
            <label
              className="block uppercase tracking-wide
            text-white-700 text-xs font-bold mb-2"
              htmlFor="username"
            >
              platform
              <select
                onChange={ onChangeColor }
                className="px-3 bg-gray-700 uppercase border border-gray-300 py-4 relative rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                id="grid-state"
              >
                <option
                  id="platform"
                  name="platform"
                  value="uplay"
                >
                  uplay
                </option>
                <option
                  id="platform"
                  name="platform"
                  value="psn"
                >
                  Playstation
                </option>
                <option
                  id="platform"
                  name="platform"
                  value="xbl"
                >
                  Xbox
                </option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex  justify-center pt-10">
        {(notFound === false) ? 
        <div className="w-full opcard absolute top-1/1 left-1/1 max-w-sm border rounded-lg shadow-md bg-gray-800 border-gray-700">
            <div className="flex flex-col mt-10 items-center pb-10">
                <img className="w-36 h-36 mb-3 rounded-full shadow-lg" src={avatar} alt={returnApi.username}/>
                <h5 className="mb-1 text-xl font-medium text-white">{returnApi.username}</h5>
                <span className="text-sm uppercase text-gray-400">{returnApi.platform}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                <button
                type='button' 
                className=' focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800'>
                    <a
                      href={ `/stats/${platform}/${username}` }
                      hidden={ btnHidden }
                    >
                    Ver stats
                    </a>
                  </button>
                </div>
            </div>
        </div> : null
               }
          {(notFound) ? 
              <div className="flex absolute top-1/1 left-1/1 flex-col mt-10 items-center pb-10">
                <h5 className="mb-1 text-xl font-medium text-white">Player não encontrado.</h5>
            </div> : null}
        </div>
      </form>
    </div>
    </div>
  );
}

export default GetStats;
