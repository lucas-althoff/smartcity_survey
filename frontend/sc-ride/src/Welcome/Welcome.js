// Welcome.js
import React, { useState } from 'react';
import logo from './logo.png';
import './welcomeStyle.css';
import favicon from './favicon.ico';

const Welcome = ({ onStartSurvey }) => {
  // const redirectToMaturityCalculation = () => {
  //   window.location.href = 'https://smartcity-ride.fly.dev/maturidades/tabela';
  // };

  const [loading, setLoading] = useState(false);

  const redirectToMaturityCalculation = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = 'https://smartcity-ride.fly.dev/maturidades/tabela/';
      setLoading(false);
    }, 2000); // Adjust the time according to your needs
  };


  return (
    <div>
      <div className="header">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-m2fnM5jfvCd/0u1sBI3BBl6Zo6QymPfIuvMIyq2FZGGJ2uEJthblfvVm5klU21Ylk7Ag2qAHCep7IggS41Zf+9A==" crossorigin="anonymous" />
        <link rel="shortcut icon" href={favicon} />
        <div className="inner-header flex">
          <img src={logo} alt="RIDE" className="logo" width="100" height="100" />
          <div className="header-text">
          <i className="fas fa-city"></i> Cidades Inteligentes - RIDE <i className="fas fa-city"></i>
          </div>
        </div>
      </div>

      <div className="welcome-content flex">
        <div className="welcome-text">
          <h2><i className="fas fa-clipboard"></i> Bem-vindo ao Questionário de Cidades Inteligentes! <i className="fas fa-clipboard"></i></h2>
          <p>
            Obrigado por participar da pesquisa. Clique no botão abaixo para começar a responder.
          </p>
          <div className="button-container">
            <button onClick={onStartSurvey}><i className="fas fa-play"></i> Iniciar Pesquisa</button>
            <button onClick={redirectToMaturityCalculation}>
              {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-calculator"></i>} Calcular Maturidade
            </button>          
          </div>
        </div>
      </div>
      <div className="footer">
        <p> ®Expo-RIDE 2023 - Ação 1. </p>
      </div>
    </div>
  );
};

export default Welcome;
