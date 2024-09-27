// app/api/generate/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import openai from '@/lib/openaiClient';

export default async function generate(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { description } = req.body;

  if (!description || typeof description !== 'string') {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: description,
      max_tokens: 150,
    });

    const responseText = completion?.data?.choices?.[0]?.text || '';

    res.status(200).json({ content: responseText });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
}