import React, { useEffect, useState } from 'react';
import Header from './header';
import api from '../services/services';
import Footer from './footer';

export default function OperatorCard(props) {

  const [statsOp, setStatsOperators] = useState([]);
  const [img, setImg] = useState("");
  const [username, setUsername] = useState("")
  const [platform, setPlatform] = useState("")


  const token = `${localStorage.getItem('token')}`;
  useEffect(() => {
    api.post('/username', {
      token
    }).then((response) => {
      if (response.status === 200) {
        setUsername(response.data.username)
        setPlatform(response.data.platform)
      }
    }).catch((error) => {
    });
  }, [username, platform, token])

  const { id } = props.match.params;
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    api.get(`operators/${id}`, {
      headers: headers
    })
    .then((res) => {
      const result = Object.values(res.data)[0]
      setImg(result.img)
    }).catch((err) => {
      console.log("carregando operadores");
    })
 
    const data = {
      username,
      platform
    }

    api.put(`/stats/operator/${id}`, data, {
      headers: headers
    })  
    .then((res) => {
      setStatsOperators([res.data.operators])
      console.log(res.data.operators);
    }).catch(() => {
      console.log("carregando operadores");
    })
  }, [username, platform, id, token])

    if (!username || !platform) {
      return (
        <div>
        <Header />
        <section
        className="flex items-center h-screen
        p-16 bg-gray-900 text-gray-100"
        >
      <div
        className="container flex flex-col
      items-center justify-center px-5 mx-auto my-8"
      >
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-3xl text-gray-600">
            <span className="sr-only">Error</span>
            Você precisa definir uma conta principal.
          </h2>
          <a
            rel="noopener noreferrer"
            href="/stats"
            className="px-8 py-3 font-semibold
            rounded bg-blue-400 text-gray-900"
          >
           Procurar uma conta
          </a>
        </div>
      </div>
    </section>
    </div>)
    }
    return (
      <div>
        <Header />
          <div className='flex justify-center '>
          {statsOp.map((stats) => (
          <div key={username} className='grid mt-2  grid-cols-3 gap-x-2 gap-y-3 grid-flow-row-dense'>
            <div className='rounded-lg row-span-5  border-gray-200 '>
                  <img className=" min-w-[400px] rounded-t-lg" alt={username} src={img} />
                  <div id="tabs" className="border-0 border-b text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white">
                      <p className={`text-center text-gray-400`} >{username}</p> 
                  </div>
              <div className="flex flex-col mt-6 items-center">
                  {/* <h1 className="text-center text-6xl font-extrabold mt-[10px]">{username}</h1> */}
              </div>
          </div>
            <div className='rounded-lg bg-gray-800 shadow-xl min-h-[50px] col-span-2'>
              <h1 className='text-center text-6xl font-extrabold m-10'>{stats.name}</h1>
            </div>
            <div className='rounded-lg shadow-xl min-h-[50px] bg-gray-800 row-span-3 col-span-2' >
            <div id="tabs" className="border-0 border-b text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white">
                <p className={`text-center text-gray-400`} >{stats.unit}</p> 
            </div>
            <div className="p-4 rounded-b md:p-8 m-3 gap-10">
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                        <div className="flex flex-col mb-[40px] justify-center items-center">
                            <dt className="mb-2 text-3xl font-extrabold">{stats.kd}</dt>
                            <dd className="font-light text-gray-400">KD</dd>
                        </div>
                        <div className="flex mb-[40px] flex-col justify-center items-center">
                          <dt className="mb-2 text-3xl font-extrabold">{stats.kills}</dt>
                          <dd className="font-light text-gray-400">Kills</dd>
                      </div>
                        <div className="flex mb-[40px] flex-col justify-center items-center">
                            <dt className="mb-2 text-3xl font-extrabold">{stats.deaths}</dt>
                            <dd className="font-light text-gray-400">Deaths</dd>
                        </div>
                        <div className="flex mb-[40px] flex-col justify-center items-center">
                            <dt className="mb-2 text-3xl font-extrabold">{stats.wins}</dt>
                            <dd className="font-light text-gray-400">Vitórias</dd>
                        </div>
                        <div className="flex flex-col mb-[40px] justify-center items-center">
                            <dt className="mb-2 text-3xl font-extrabold">{stats.losses}</dt>
                            <dd className="font-light text-gray-400">Derrotas</dd>
                        </div>
                        <div className="flex flex-col mb-[40px] justify-center items-center">
                            <dt className="mb-2 text-3xl font-extrabold">{stats.winRate}</dt>
                            <dd className="font-light text-gray-400">Win Rate</dd>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <dt className="mb-2 text-3xl font-extrabold">{stats.headshots}</dt>
                            <dd className="font-light text-gray-400">Headshots</dd>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <dt className="mb-2 text-3xl font-extrabold">{stats.meleeKills}</dt>
                            <dd className="font-light text-gray-400">Melee kills</dd>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <dt className="mb-2 text-3xl font-extrabold">{stats.playtime} horas</dt>
                            <dd className="font-light text-gray-400">Tempo jogado</dd>
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
