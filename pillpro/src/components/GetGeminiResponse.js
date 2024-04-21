import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyCuToUOpvZLLXEqpsiJY5KfYsOZf6ACth8');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
     

async function getGeminiResponse(prompt, inputText) {

    try {
    const response = await model.generateContent(`${prompt}\n${inputText}`);
    console.log(response.response.text());
    return response.response.text()
  } catch (error) {
    console.error('Error generating content:', error);
  }
}

// Call the function to get the recipes
// generateMedicineJSON(example_text)

export { getGeminiResponse };