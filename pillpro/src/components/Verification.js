import React, { useEffect, useState } from 'react';
import { getGeminiResponse } from '../components/GetGeminiResponse';

async function Verification(instructionPrompt, inputJSON, inputTranscript) {
    // Convert inputJSON to a string
    const inputJSONString = JSON.stringify(inputJSON);

    console.log("hey");
    // Call getGeminiResponse with the instruction prompt and concatenated inputJSON and inputTranscript
    const geminiResponse = await getGeminiResponse(instructionPrompt, `${inputJSONString}\n${inputTranscript}`);
    
    // Return the Gemini response
    return geminiResponse;
  }
  
  export { Verification };