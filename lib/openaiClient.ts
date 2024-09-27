// app/lib/openaiClient.ts

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this environment variable is set
});

const openai = new OpenAIApi(configuration);

export default openai;