import React, { useEffect, useState } from 'react';
import '../styles/operators.css';
import { Link, Redirect } from 'react-router-dom';
import Header from './header';
import api from '../services/services';


export default function Operators(props) {

  const [operators, setOperators] = useState([])
  const [attackers, setAttackers] = useState(false)



  const allOperators = () => {
    const token = `${localStorage.getItem('token')}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    api.get('/operators', {
      headers: headers
    })
      .then((res) => {
        if (res.status === 200) {
          const Operator = res.data;
          setOperators(Operator)
        }
      }).catch((error) => {
        // setOperators(null)
        console.log(error.message);
      })
  }

  useEffect(() => {
  allOperators()
  }, [])

  const handleClick = () => {
    const token = `${localStorage.getItem('token')}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    api.get('/operators/attackers', {
      headers: headers
    })
      .then((res) => {
        if (res.status === 200) {
          const Operator = res.data;
          setOperators(Operator)
        }
      }).catch((error) => {
        // this.setState({ operators: null });
        console.log(error.message);
      })
  }

  const handleClickDefender = () => {
    const token = `${localStorage.getItem('token')}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    api.get('/operators/defenders', {
      headers: headers
    })
      .then((res) => {
        if (res.status === 200) {
          const Operator = res.data;
          setOperators(Operator)
        }
        (res.status === 200) ? setAttackers(true) : setAttackers(false)
      }).catch((error) => {
        // this.setState({ operators: null });
        console.log(error.message);
      })
  }

 
    if (operators === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="bg-gray-900">
        <Header />
        <div
          className="mx-auto max-w-2xl py-16 px-4
        sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
       <div className="flex justify-center ">
       <div>
        <button type='button' className='m-8 font-medium rounded-lg text-sm px-5 py-2.5 
        text-center text-white focus:ring-4 focus:outline-none ring-primary-300 
        font-medium rounded-lg text-sm 
        px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 
        focus:ring-primary-800 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 
        hover:scale-110 duration-300' onClick={allOperators} >All</button>
      </div>
          <div>
            <button type='button' className='m-8 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
             bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 transition ease-in-out delay-150 bg-blue-500 
             hover:-translate-y-1 hover:scale-110 duration-300' onClick={handleClick} >ATTACKER</button>
          </div>
          <div>
            <button type='button' className='m-8 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
             text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
             bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 
             hover:scale-110 duration-300' onClick={handleClickDefender} >DEFENDER</button>
          </div>
        </div>
          <div
            className="mt-6 grid grid-cols-1
          gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            {(attackers !== null) ? operators.map((operator) => (
              <div key={ operator.id } className="group relative bg-primary-600 transition ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 hover:bg-primary-700 duration-300 rounded">
                <Link to={ `/operator/${operator.id}` }>
                  <div
                    className="min-h-80 aspect-w-1 aspect-h-1 w-full
                  overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80"
                  >
                    <img
                      src={ operator.img }
                      alt="op"
                      className="h-full group-hover:opacity-75 w-full
                      object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                </Link>
                    <h2 className="antialiased text-center font-bold tracking-tight text-white-900">
                    {operator.name}
                  </h2>
              </div>
            )) : 
            null
            }
          </div>
        </div>
      </div>
    );
  }
