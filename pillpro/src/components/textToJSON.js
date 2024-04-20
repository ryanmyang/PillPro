import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");



const genAI = new GoogleGenerativeAI('AIzaSyCuToUOpvZLLXEqpsiJY5KfYsOZf6ACth8');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest",
generationConfig: { responseMimeType: "application/json" }});
     

async function generateMedicineJSON(inputText) {

    const instructionPrompt = `Use the included prescription description to list all medicines using the following JSON schema: {'type': 'object','properties': {'Medication': {'type': 'string'},'WeeklyFrequency': {'type': 'integer'},'DayFrequency': {'type': 'integer'},'FrequencyDescription': {'type': 'string'},'CommonSideEffects': {'type': 'array','items': {'type': 'string'}}, 'UncommonSideEffects': {'type': 'array','items': {'type': 'string'}}}}`
    try {
    const response = await model.generateContent(`${instructionPrompt}\n${inputText}`);
    console.log('Generated Cookie Recipes:', response.response.text());
    return response.response.text()
  } catch (error) {
    console.error('Error generating content:', error);
  }
}
// Define the prompt with the JSON schema
const prompt = `List a few popular cookie recipes using this JSON schema:
{'type': 'object', 'properties': { 'recipe_name': {'type': 'string'}}}`;

// Call the function to get the recipes
// generateMedicineJSON(example_text)

export { generateMedicineJSON };