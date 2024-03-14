// TranslateComponent.js
import React, { useState } from 'react';
import axios from 'axios';

export const translateText = async (textToTranslate, targetLanguage, apiKey) => {
  try {
    const response = await axios.post(
      'https://translation.googleapis.com/language/translate/v2',
      {},
      {
        params: {
          q: textToTranslate,
          target: targetLanguage,
          key: apiKey
        }
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return textToTranslate;
  }
};

const TranslateComponent = ({ text, setOriginalText, apiKey }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleTranslationClick = async () => {
    const targetLanguage = clickCount % 2 === 0 ? 'ar' : 'en'; // English on odd clicks, Arabic on even clicks
    const translatedText = await translateText(text, targetLanguage, apiKey);
    setOriginalText(translatedText);
    setClickCount(clickCount + 1); // Increment click count
  };

  return (
    <button onClick={handleTranslationClick}>
      {clickCount % 2 === 0 ? 'Translate to Arabic' : 'Translate to English'}
    </button>
  );
};

export default TranslateComponent;
