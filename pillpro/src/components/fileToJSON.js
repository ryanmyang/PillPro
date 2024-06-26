import React, { useState } from 'react';
const { GoogleGenerativeAI } = require("@google/generative-ai");



const genAI = new GoogleGenerativeAI('AIzaSyAbj9yEuWnrsxORhs6BtE35YKo3Fp0X4Po');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest",
generationConfig: { responseMimeType: "application/json" }});
     
async function fileToJSON(prompt, generativeFilePart) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest",
generationConfig: { responseMimeType: "application/json" }, safetySettings: [
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_NONE'
    },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_NONE'
    }
    ]});
    
    const fileParts = [generativeFilePart];
    console.log(`Calling gemini with file ${JSON.stringify(fileParts)}`)
    const result = await model.generateContent([prompt,fileParts]);
    const response = await result.response;
    console.log(`fileToJSON created object ${response.text()}`)
    return response.text();
}

export { fileToJSON };

