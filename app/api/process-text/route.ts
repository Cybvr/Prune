import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    console.log("Received text:", text);

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: "claude-3-opus-20240229",
        messages: [
          {
            role: "user",
            content: `Analyze the following text and provide:
            1. A brief summary
            2. Key words or phrases
            3. Word count
            4. Character count

            Text: "${text}"`
          }
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'  // Add this line
        },
      }
    );

    console.log("Claude API response:", response.data);

    const analysisResult = response.data.content[0].text;

    // Simple parsing of the response
    const summary = analysisResult.split('Summary:')[1].split('Key words')[0].trim();
    const keywords = analysisResult.split('Key words or phrases:')[1].split('Word count')[0].trim().split(', ');
    const wordCount = parseInt(analysisResult.split('Word count:')[1].split('Character count')[0].trim());
    const charCount = parseInt(analysisResult.split('Character count:')[1].trim());

    return NextResponse.json({
      summary,
      keywords,
      wordCount,
      charCount,
    });
  } catch (error) {
    console.error('Error in API route:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
    }
    return NextResponse.json({ error: 'Failed to process text' }, { status: 500 });
  }
}