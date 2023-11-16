// Welcome.js
import React, { useState } from 'react';
import logo from './logo192.png';
import './welcomeStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faSpinner, faCalculator } from '@fortawesome/free-solid-svg-icons'; // Import the specific icons you need

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
        <div className="inner-header flex">
          <img src={logo} alt="RIDE" className="logo" width="100" height="100" />
          <div className="header-text">
          Cidades Inteligentes - RIDE
          </div>
        </div>
      </div>

      <div className="welcome-content flex">
        <div className="welcome-text">
          <h2> Sistema de Apoio à Pesquisa - SmartCity RIDE </h2>
          <p>
          Clique no botão abaixo para começar a responder ou para acessar o diagnóstio parcial de maturidade.
          </p>
          <div className="button-container">
          <button onClick={onStartSurvey}><FontAwesomeIcon icon={faPlay} /> Iniciar Pesquisa</button>
            <button onClick={redirectToMaturityCalculation}>
              {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faCalculator} />} Calcular Maturidade
            </button>          
          </div>
        </div>
      </div>
      <div className="footer">
        <p> ®EXPORIDE 2023 - Ação 1. </p>
      </div>
    </div>
  );
};

export default Welcome;
