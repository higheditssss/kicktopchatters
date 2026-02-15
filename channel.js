// ─────────────────────────────────────────────
//  Vercel Serverless Function: /api/channel
// ─────────────────────────────────────────────

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: 'Missing ?user= param' });
  }

  try {
    // Try v2 first, fallback to v1
    let data;
    try {
      const v2Response = await fetch(`https://kick.com/api/v2/channels/${encodeURIComponent(user)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
        },
      });
      
      if (!v2Response.ok) throw new Error('v2 failed');
      data = await v2Response.json();
    } catch (e) {
      const v1Response = await fetch(`https://kick.com/api/v1/channels/${encodeURIComponent(user)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
        },
      });
      
      if (!v1Response.ok) throw new Error('Channel not found');
      data = await v1Response.json();
    }

    const chatroomId = data?.chatroom?.id;
    const isLive = !!(data?.livestream);
    const title = data?.livestream?.session_title || null;
    const viewers = data?.livestream?.viewer_count || 0;
    const avatar = data?.user?.profile_pic || null;

    if (!chatroomId) {
      return res.status(404).json({ error: 'Channel not found or no chatroom' });
    }

    return res.status(200).json({ chatroomId, isLive, title, viewers, avatar });
  } catch (error) {
    return res.status(502).json({ error: error.message || 'Failed to fetch channel data' });
  }
}
