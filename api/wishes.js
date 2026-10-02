import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

function formatWish(wish) {
  return {
    id: wish.id,
    name: wish.name,
    message: wish.message,
    time: new Date(wish.created_at).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  };
}

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const wishes = await sql`
        SELECT id, name, message, created_at
        FROM wishes
        ORDER BY created_at DESC
      `;
      return response.status(200).json(wishes.map(formatWish));
    }

    if (request.method === 'POST') {
      const { name, message } = request.body || {};
      const trimmedName = typeof name === 'string' ? name.trim() : '';
      const trimmedMessage = typeof message === 'string' ? message.trim() : '';

      if (!trimmedName || !trimmedMessage || trimmedName.length > 100 || trimmedMessage.length > 1000) {
        return response.status(400).json({ error: 'Please provide a valid name and message.' });
      }

      const [wish] = await sql`
        INSERT INTO wishes (name, message)
        VALUES (${trimmedName}, ${trimmedMessage})
        RETURNING id, name, message, created_at
      `;
      return response.status(201).json(formatWish(wish));
    }

    response.setHeader('Allow', 'GET, POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    console.error('Wishes API error:', error);
    return response.status(500).json({ error: 'Unable to process wishes.' });
  }
}