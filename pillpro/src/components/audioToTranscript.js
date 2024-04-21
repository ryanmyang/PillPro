import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");



const genAI = new GoogleGenerativeAI('AIzaSyCuToUOpvZLLXEqpsiJY5KfYsOZf6ACth8');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
     
async function audioToTranscript(generativeFilePart) {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-latest"});

    const prompt = "Listen carefully to the following audio file. Provide a word-by-word transcript."

    const audioParts = [generativeFilePart];

    const result = await model.generateContent(prompt, ...audioParts);
    const response = await result.response;
    return response;
}

export { audioToTranscript };