// File: app/api/chat/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { action, message, title, content, userId } = await request.json();

    if (action === 'chat') {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: "claude-3-opus-20240229",
          messages: [{ role: "user", content: message }],
          max_tokens: 1000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.CLAUDE_API_KEY,
            'anthropic-version': '2023-06-01'
          },
        }
      );

      const aiResponse = response.data.content[0].text;
      return NextResponse.json({ response: aiResponse });
    } else if (action === 'save') {
      // Save document to Supabase
      const { data, error } = await supabase
        .from('documents')
        .upsert({ 
          user_id: userId,
          title: title,
          content: content,
        }, { onConflict: 'user_id,title' });

      if (error) throw error;

      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}