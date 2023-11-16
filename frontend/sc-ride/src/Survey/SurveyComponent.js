// SurveyComponent.js
import Welcome from '../Welcome/Welcome'
import React, { useState } from 'react';
import { Model, FunctionFactory } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { finalForm } from '../form/builder';
import "survey-core/i18n/portuguese-br";
import 'survey-core/defaultV2.min.css';
import { ThreeDimensionalLight } from "survey-core/themes/three-dimensional-light";

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
    survey.applyTheme(ThreeDimensionalLight);
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
        fetch('https://smartcity-ride.fly.dev/survey/complete', {
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
          })
          .catch((error) => {
            console.error('An error occurred while sending the survey data:', error);
          });
    });

    return <Survey model={survey} />;
  }
  
  return <Welcome onStartSurvey={startSurvey} />;
};

export default SurveyComponent;
