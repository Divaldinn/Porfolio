import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
        const { name, subject, body } = request.body;
        
        if (!name || !body) {
             return response.status(400).json({ error: 'Missing fields' });
        }
        
        // Save using Vercel KV
        const timestamp = Date.now();
        const msgId = `msg_${timestamp}`;
        await kv.hset(msgId, { name, subject, body, timestamp, read: false });
        
        // Push ID to a list for fetching later
        await kv.lpush('messages_list', msgId);

        return response.status(200).json({ success: true, message: 'Message securely stored.' });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
