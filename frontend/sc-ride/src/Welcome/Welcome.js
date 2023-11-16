// Welcome.js
import React, { useState } from 'react';
import logo from './logo192.png';
import './welcomeStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faSpinner, faCalculator, faBars, faFolderTree, faBook, faTreeCity} from '@fortawesome/free-solid-svg-icons'; // Import the specific icons you need

const Welcome = ({ onStartSurvey }) => {
  const toggleLateralBar = () => {
    setLateralBarOpen(!isLateralBarOpen);
  };

  const redirectToPage1 = () => {
    window.open('https://www.exporide.com.br/', '_blank');
  };

  const redirectToPage2 = () => {
    window.open('https://inteligente.mcti.gov.br/sobre', '_blank');
  };

  const redirectToPage3 = () => {
    window.open('https://www.itu.int/rec/T-REC-Y.4904-201912-I/en', '_blank');
  };

  const [loading, setLoading] = useState(false);
  const [isLateralBarOpen, setLateralBarOpen] = useState(false);

  const redirectToMaturityCalculation = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = 'https://smartcity-ride.fly.dev/maturidades/tabela/';
      setLoading(false);
    }, 2000); // Adjust the time according to your needs
  };


  return (
    <div className={`welcome-container ${isLateralBarOpen ? 'lateral-bar-open' : ''}`}>
      <div className="header">
        <div className="inner-header flex">
          <div className="header-text">SmartCity - RIDE</div>
        </div>
        <button className="header-button" onClick={toggleLateralBar}>
            <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <div className="lateral-bar">
        <p>Referências</p>
        <button onClick={redirectToPage1} data-tooltip="EXPORIDE">
          <FontAwesomeIcon icon={faFolderTree} style={{ color: '#810410' }} />
        </button>
        <button onClick={redirectToPage2} data-tooltip="Carta Brasileira">
          <FontAwesomeIcon icon={faBook} style={{ color: '#e05206' }} />
        </button>
        <button onClick={redirectToPage3} data-tooltip="Manual de Referência">
          <FontAwesomeIcon icon={faTreeCity} style={{ color: '#8f4819' }} />
        </button>
      </div>

      <div className="welcome-content flex">
        <div className="welcome-text">
          <img src={logo} alt="RIDE" className="logo" width="100" height="100" /> 
          <h2> Sistema de Apoio à Pesquisa - SmartCity RIDE </h2>
          <p>
          A plataforma SmartCity RIDE tem como referência o modelo de Maturidade de Cidade Inteligente Sustentável MMCISB v2/2021.
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
