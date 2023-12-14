// SurveyComponent.js
import Welcome from '../Welcome/Welcome'
import React, { useState } from 'react';
import { Model, FunctionFactory } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { finalForm } from '../form/builder';
import "survey-core/i18n/portuguese-br";
import 'survey-core/defaultV2.min.css';
import { Tema } from "survey-core/themes/doubleborder-light";

const storageItemKey = "my-survey";

function saveSurveyData (survey) {
  const data = survey.data;
  data.pageNo = survey.currentPageNo;
  window.localStorage.setItem(storageItemKey, JSON.stringify(data));
}

function validateLength(params) {
  const valArray = params[0];
  if (valArray.isNull) {
    return 0;
  }
  return valArray.length;
}

FunctionFactory.Instance.register('validateLength', validateLength);

const SurveyComponent = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  const startSurvey = () => {
    setShowSurvey(true);
  };

  if (showSurvey) {
    const survey = new Model(finalForm);
    survey.applyTheme(Tema);
    survey.locale = 'pt-br';
    survey.completeText = 'Finalizar questionário.';
    survey.showProgressBar = 'both';
    survey.progressBarType = 'requiredQuestions';

    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
  
        // Define the data you want to send to the backend
        const postData = {
          surveyData: sender.data,
        };
    
        // Send a POST request to your backend
        fetch('https://e-ride.fly.dev/survey/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Survey data sent successfully', data);

            // Check if the error response contains a validation error message
            if (data.response && data.response.message === 'Erro') {
              const errorMessage = data.response.content;
              alert(`Erro de Validação: ${errorMessage}\nOs dados foram salvos na tabela survey-error.`);
            } else {
              // Handle other types of errors here
              alert('Dados armazenados com sucesso!');
            }
          })
          .catch((error) => {
            console.error('An error occurred while sending the survey data:', error);
            // Check if the error response contains a validation error message
            if (error.response && error.response.message === 'Erro') {
              const errorMessage = error.response.content;
              alert(`Erro de Validação: ${errorMessage}\nOs dados foram salvos na tabela survey-error.`);
            } else {
              // Handle other types of errors here
              alert('Ocorreu um erro inesperado. Por favor tente novamente.');
            }
          });
    });

    // Save survey results to the local storage
    survey.onValueChanged.add(saveSurveyData);
    survey.onCurrentPageChanged.add(saveSurveyData);
    
    // Restore survey results
    const prevData = window.localStorage.getItem(storageItemKey) || null;
    if (prevData) {
        const data = JSON.parse(prevData);
        survey.data = data;
        if (data.pageNo) {
            survey.currentPageNo = data.pageNo;
        }
    }
    
    // Empty the local storage after the survey is completed
    survey.onComplete.add(() => {
      window.localStorage.setItem(storageItemKey, "");
    });

    return <Survey model={survey} />;
  }
  
  return <Welcome onStartSurvey={startSurvey} />;
};

export default SurveyComponent;
