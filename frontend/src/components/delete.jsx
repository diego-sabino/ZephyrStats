import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../services/services';

class DeletarUsuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: {},
      redirect: false,
    };
  }

  async componentDidMount(props) {
    const { id } = props.match.params;

    const response = await api.get(`/users/${id}`);

    this.setState({ usuario: response.data });
  }

  handleClick = (event, props) => {
    const { id } = props.match.params;
    const { redirect } = this.state;
    const token = `${localStorage.getItem('token')}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    fetch(`http://localhost:3001/operators/${id}`, {
      method: 'delete',
      headers: headers,
    })
      .then((data) => {
        if (data.ok) {
          this.setState({ redirect: true });
          console.log(redirect);
        }
      });

    event.preventDefault();
  };

  render() {
    const { redirect, usuario } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <fieldset className='bg-gray-50 bg-gray-900'>
        <legend>Deletar Usuário</legend>
        <div className="usuario-delete">
          <article key={ usuario.id }>
            <strong>
              {' '}
              {usuario.name}
              {' '}
            </strong>
            <p>Tem certeza que deseja deletar este registro?</p>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Remover
            </button>
            <Link to="/">Voltar</Link>
          </article>
        </div>
      </fieldset>
    );
  }
}

export default DeletarUsuario;
