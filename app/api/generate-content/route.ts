// File: app/api/generate-content/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

if (!CLAUDE_API_KEY) {
  throw new Error('CLAUDE_API_KEY is not set in the environment variables');
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-opus-20240229',
        messages: [{ role: 'user', content: `Generate content ideas about: ${prompt}` }],
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
      }
    );

    const generatedContent = response.data.content[0].text;
    if (!generatedContent) {
      throw new Error('Invalid response format from Claude API');
    }

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error('Error calling Claude API:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}