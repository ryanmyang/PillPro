# pill.ai

![pillAI](https://github.com/ryanmyang/PillPro/assets/9492646/e5677775-43ce-4cf2-85a4-cf7c90a23be7)

## Inspiration

Imagine a patient with a chronic illness diligently follows their treatment plan, trusting their pharmacy to provide the correct medications. However, due to a mix-up in prescriptions, they receive the wrong medication, leading to severe complications and a hospitalization. This heartbreaking scenario is all too common in today's healthcare system, where human errors can have devastating consequences.
But now, enter Pill.ai - the groundbreaking solution designed to prevent such tragedies.

## What it does

By harnessing the power of artificial intelligence, pill.ai ensures that each medication is accurately dispensed to the right patient. Our innovative platform takes in the image of the medication and the audio of the doctor-patient conversation. pill.ai utilizes Google Gemini API which capitalizes the power of Large Language Models (LLMs) to perform speech-to-text and image-to-text translation. It verifies the correct medication prescribed to the patient based on both the doctor-patient conversation and the medication received. The patient will be shown a concise dashboard to display all the medication they ought to receive and alerts in real-time if the medication is verfied. This significantly reduces the risk of medication-related harm. With pill.ai, patients can have peace of mind knowing that their health is in safe hands.

## How we built it

We used React, Material UI and Javascript to develop the home page while calling Google's Gemini API which employs one million tokens of compute power to perform speech-to-text and image-to-text translation

## Challenges we ran into

We had difficulties configuring the appropriate JSON format we intend to use for our final dashboard as well as to get speech recognition to work with Google's Gemini API

## Accomplishments that we're proud of

We are proud to have a fully implemented full-stack web app which uses the latest LLM technology and contribute to a meaningful cause of tackling medication-related errors. 

## What we learned

In our journey with Pill.ai, we delved deep into the realm of LLMs and their transformative potential in health tech. LLMs, like GPT-3, enable machines to understand and generate human-like text, empowering Pill.ai to analyze vast amounts of medical data efficiently. Additionally, we fully employed the potential of Javascript to make multiple API calls without the hassle of a backend.

## What's next for pill.ai

We hope to make great strides with pill.ai in 
- Integration with Electronic Health Records as additional check-safe
- Incorporate allergy information, past adverse reactions &  prescriptions over multiple visits for individualized advice
- Multilingual translation of medical information for non-English native populations (Elderlies, Racial Minorities)
