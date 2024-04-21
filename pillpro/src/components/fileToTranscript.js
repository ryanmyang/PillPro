import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyCuToUOpvZLLXEqpsiJY5KfYsOZf6ACth8');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
     
async function fileToTranscript(prompt, generativeFilePart) {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-latest"});
    
    const fileParts = [generativeFilePart];
    console.log(`Calling gemini with file ${JSON.stringify(fileParts)}`)
    const result = await model.generateContent([prompt,fileParts]);
    const response = await result.response;
    return response.text();
}

export { fileToTranscript };

