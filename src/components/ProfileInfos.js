import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileInfos extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      email: '',
      image: '',
      finishRender: false,
    };
  }

  async componentDidMount() {
    const { name, description, email, image } = await getUser();

    this.setState({
      name,
      description,
      email,
      image,
      finishRender: true,
    });
  }

  render() {
    const { name, description, email, image, finishRender } = this.state;

    return (
      <section>
        {finishRender
          ? (
            <div>
              <div>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ `Imagem de ${name}` }
                />
                <Link
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </div>
              <h2>Nome</h2>
              <p>{ name }</p>
              <h2>E-mail</h2>
              <p>{ email }</p>
              <h2>Descrição</h2>
              <p>{ description }</p>
            </div>
          )
          : <Loading /> }
      </section>
    );
  }
}

export default ProfileInfos;
