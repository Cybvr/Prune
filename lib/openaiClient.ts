// lib/openaiClient.ts
import { OpenAIApi } from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
console.log("Using API Key:", apiKey); // Add this line to verify the key is loaded

const openai = new OpenAIApi({
  apiKey: apiKey,
});

export default openai;