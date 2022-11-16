import React, { useState, useEffect } from 'react';
import '../styles/operators.css';
import { Link, Redirect } from 'react-router-dom';
import api from '../services/services';

export default function EditOperator(props) {
  const [maxNumber, setMax] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    speed: 0,
    health: 0,
    team: 'ATTACKER',
    img: '',
    redirect: false,
  });

  const [team, setTeam] = useState('ATTACKER');

  const {
    name, speed, health, img,
  } = formValue;

  const handleSubmit = (event) => {
    const token = `${localStorage.getItem('token')}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    const { match } = props;

    const { id } = match.params;
    event.preventDefault();
    const data = {
      name, speed, health, img, team,
    }
    api.put(`/operators/${id}`, data, {
      headers: headers
    }).then((response) => {
      if (response) {
        setRedirect(true);
      }
    }).catch((error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    const maxValidateBody = 4;
    const validateSpeedHealth = speed + health > maxValidateBody;
    return validateSpeedHealth ? setMax(true) : setMax(false);
  }, [speed, health]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
    console.log(formValue.team);
  };

  const onChangeColor = (event) => {
    setTeam(event.target.value);
    console.log(team);
  };

  const { id } = props.match.params;

  if (redirect) {
    return <Redirect to={ `/operator/${id}` } />;
  }
  return (
    <div className="flex h-screen bg-gray-900">
      <form className="w-full max-w-lg m-auto main-form" onSubmit={ handleSubmit }>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide
              text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Nome
              <input
                className="appearance-none block w-full
                bg-gray-200 text-gray-700 border border-gray-200
                rounded py-3 px-4 leading-tight focus:outline-none
                focus:bg-white focus:border-gray-500"
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ handleChange }
              />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide
               text-gray-700 text-xs font-bold mb-2"
              htmlFor="img"
            >
              Imagem
              <input
                className="
                  appearance-none block w-full bg-gray-200
                  text-gray-700 border border-gray-200 rounded py-3
                  px-4 mb-3 leading-tight focus:outline-none
                  focus:bg-white focus:border-gray-500"
                type="text"
                id="img"
                name="img"
                value={ img }
                onChange={ handleChange }
              />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide
              text-gray-700 text-xs font-bold mb-2"
              htmlFor="speed"
            >
              speed
              <input
                className="appearance-none block w-full
                bg-gray-200 text-gray-700 border border-gray-200
                 rounded py-3 px-4 leading-tight focus:outline-none
                  focus:bg-white focus:border-gray-500"
                type="number"
                id="speed"
                name="speed"
                value={ speed }
                onChange={ handleChange }
              />
            </label>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide
              text-gray-700 text-xs font-bold mb-2"
              htmlFor="health"
            >
              health
              <input
                className="appearance-none block w-full bg-gray-200
                text-gray-700 border border-gray-200 rounded py-3 px-4
                leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                id="health"
                name="health"
                value={ health }
                onChange={ handleChange }
              />
            </label>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide
               text-gray-700 text-xs font-bold mb-2"
              htmlFor="team"
            >
              Team
              <div className="relative">
                <select
                  onChange={ onChangeColor }
                  className="block appearance-none w-full
                   bg-gray-200 border border-gray-200
                   text-gray-700 py-3 px-4 pr-8 rounded
                   leading-tight focus:outline-none
                   focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option
                    id="team"
                    name="team"
                    value="ATTACKER"
                    onChange={ onChangeColor }
                  >
                    ATTACKER
                  </option>
                  <option
                    id="team"
                    name="team"
                    value="DEFENDER"
                  >
                    DEFENDER
                  </option>
                </select>
                <div
                  className="pointer-events-none absolute inset-y-0
                right-0 flex items-center px-2 text-gray-700"
                >
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </label>
          </div>
          <div className="operator-insert">
            <button
              type="submit"
              disabled={ maxNumber }
              className="btn btn-primary"
            >
              Cadastrar
            </button>
            <Link to="/"> Voltar </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
