import React, { useEffect, useState } from 'react';
import api from '../services/services';
import Footer from './footer';
import Header from './header';

export default function StatsCard(props) {
  const [avatar, setAvatar] = useState([])
  const [disableBtn, setDisableBtn] = useState(false)
  const [rank, setRank] = useState([])


  const token = `${localStorage.getItem('token')}`;
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    const { username, platform } = props.match.params;
    const data = { username, platform };

    api.post('/username', {
      token
    }).then((response) => {
      if (response.data.username === username) {
        setDisableBtn(true)
      }
    }).catch((error) => {
      console.log(error);
    });

    api.put('/stats/rank', data, {
      headers: headers
    }).then((response) => {
      if (response.data) {
        setRank([response.data]); 
        console.log(response.data);
      }
    });

    api.put('/stats/general', data, {
      headers: headers
    }).then((response) => {
      if (response.data !== null) {
      }
    }).catch((error) => {
      console.log(error);
    });

    api.put('/stats/avatar', data, {
      headers: headers
    }).then((response) => {
      if (response.data) {
        setAvatar(response.data.avatar500);
      }
    });

  }, [props.match.params, token])

  const { username, platform } = props.match.params;

  const setMainAcc = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    const data = {
      username, avatar, platform, token
    }
    api.post('/setAccount', data, {
      headers: headers
    }).then((response) => {
      // setMainAccount(true)
      window.location.reload(false)
    });
    
  }

    return (
      <div className>
        <Header />
        <div className='flex justify-center '>
        {rank.map((stats) => (
        <div key={username} className='grid mt-2 max-w-[1600px] grid-cols-3 gap-x-2 gap-y-3 grid-flow-row-dense'>
          <div className='rounded-lg shadow-xl row-span-3 bg-gray-800 border-gray-600'>
            <div className="flex flex-col max-h-[300px] mb-4 mt-6 items-center">
                <img className="w-48 h-48 mb-3 rounded-full shadow-lg" src={avatar} alt="img"/>
                <h5 className="text-xl font-medium text-white">{username}</h5>
                <span className="text-sm uppercase text-gray-400">{platform}</span>
                <button
                onClick={setMainAcc}
                disabled={disableBtn}
                type='button'
                className={(disableBtn) ? `mt-2 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-300 hover:bg-primary-300
                focus:ring-primary-300`
                : `mt-2 disable:bg-gray-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm 
                px-5 py-2.5 text-center text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700
                 focus:ring-primary-800 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
                 hover:scale-110 hover:bg-blue-600 duration-300`}>
                  {(disableBtn) ? `${username} é a sua conta principal` : `Definir como conta principal`}
                  </button>
            </div>
        </div>
          <div className='rounded-lg bg-gray-800 shadow-xl min-h-[50px] col-span-2'>
            <h1 className='text-center text-6xl font-extrabold m-10'>{username}</h1>
          </div>
          <div className='rounded-lg shadow-xl min-h-[50px] bg-gray-800 row-span-3 col-span-2' >
          <div id="tabs" class="bg-gray-50 border-0 border-b text-sm rounded-t-lg focus:ring-blue-500 
          focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
              <p className={`text-center`} >{stats.regions.seasonName}</p> 
          </div>
          <div className="p-4 rounded-b md:p-8 m-3 gap-10">
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                      <div className="flex flex-col mb-[40px] justify-center items-center">
                          <img className="max-h-[100px]" src={stats.rank.current.icon} alt="img" />
                          <dt className="mb-2 text-1xl font-extrabold">{stats.rank.max.mmr}</dt>
                          <dd className="font-light text-gray-400">Rank máximo</dd>
                      </div>
                      <div className="flex flex-col mb-[40px]  justify-center items-center">
                          <img className="max-h-[100px]" alt="img" src={stats.rank.current.icon} />
                          <dt className="mb-2 text-1xl font-extrabold">{stats.rank.current.mmr}</dt>
                          <dd className="font-light text-gray-400">Rank atual</dd>
                      </div>
                      <div className="flex mb-[40px] flex-col justify-center items-center">
                          <dt className="mb-2 text-3xl font-extrabold">{stats.rank.kd}</dt>
                          <dd className="font-light text-gray-400">KD</dd>
                      </div>
                      <div className="flex mb-[40px] flex-col justify-center items-center">
                          <dt className="mb-2 text-3xl font-extrabold">{stats.rank.kills}</dt>
                          <dd className="font-light text-gray-400">Kills</dd>
                      </div>
                      <div className="flex flex-col mb-[40px] justify-center items-center">
                          <dt className="mb-2 text-3xl font-extrabold">{stats.rank.deaths}</dt>
                          <dd className="font-light text-gray-400">Deaths</dd>
                      </div>
                      <div className="flex flex-col mb-[40px] justify-center items-center">
                          <dt className="mb-2 text-3xl font-extrabold">{stats.rank.winRate}</dt>
                          <dd className="font-light text-gray-400">Win Rate</dd>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                          <dt className="mb-2 text-3xl font-extrabold">{stats.rank.wins}</dt>
                          <dd className="font-light text-gray-400">Vitórias</dd>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                          <dt className="mb-2 text-3xl font-extrabold">{stats.rank.losses}</dt>
                          <dd className="font-light text-gray-400">Derrotas</dd>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                          <dt className="mb-2 text-3xl font-extrabold">{stats.rank.abandons}</dt>
                          <dd className="font-light text-gray-400">Abandonos</dd>
                      </div>
                  </dl>
                </div>
          </div>
            <div>
                <div id="tabs" class="border-0 border-b text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                    <p className='text-center' >Geral</p>
                </div>
              <div className="p-4 rounded-b-lg md:p-8 bg-gray-800">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.general.kd}</dt>
                        <dd className="font-light text-gray-400">KD</dd>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.general.kills}</dt>
                        <dd className="font-light text-gray-400">Kills</dd>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.general.deaths}</dt>
                        <dd className="font-light text-gray-400">Deaths</dd>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.general.winRate}</dt>
                        <dd className="font-light text-gray-400">Win Rate</dd>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.general.wins}</dt>
                        <dd className="font-light text-gray-400">Vitórias</dd>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.general.losses}</dt>
                        <dd className="font-light text-gray-400">Derrotas</dd>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.level.level}</dt>
                        <dd className="font-light text-gray-400">LVL</dd>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.general.playtime}</dt>
                        <dd className="font-light text-gray-400">Headshots</dd>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <dt className="mb-2 text-3xl font-extrabold">{stats.general.matches}</dt>
                        <dd className="font-light text-gray-400">Partidas</dd>
                    </div>
                </dl>
              </div>
            </div>
        </div>
        ))}
    </div>
    <Footer />
    </div>
    );
  }