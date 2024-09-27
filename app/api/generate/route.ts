import { NextApiRequest, NextApiResponse } from 'next';
import openai from '@/lib/openaiClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { description } = req.body;
  console.log("Description received:", description);

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: description }],
      max_tokens: 150,
    });

    const responseText = completion?.data?.choices?.[0]?.message?.content || '';
    console.log("Generated content:", responseText); // Log the generated content

    return res.status(200).json({ content: responseText });
  } catch (error) {
    console.error('Error calling OpenAI:', error.message, error.stack); // Ensure error is logged
    return res.status(500).json({ error: `Error generating content: ${error.message}` });
  }
};

export default handler;