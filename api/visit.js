
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
    try {
        // Increment the visit counter ('page_visits')
        const count = await kv.incr('page_visits');
        return response.status(200).json({ value: count });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
