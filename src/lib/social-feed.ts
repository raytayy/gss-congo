/**
 * Build-time fetchers for Instagram + Facebook live feeds (Meta Graph API v19).
 *
 * Tokens live in .env (server-only — never PUBLIC_*). Fetched at `astro build`
 * time and rendered statically. Empty array returned on missing env or fetch
 * error so the SocialActivity section gracefully falls back to platform CTAs.
 *
 * SETUP (one-time, by client):
 *   1. Convert Instagram account to Business or Creator
 *   2. Link IG to a Facebook Page (Meta Business Suite)
 *   3. Create a Meta App at https://developers.facebook.com (Business type)
 *   4. Grant permissions: instagram_basic, pages_show_list, pages_read_engagement
 *   5. Generate a long-lived access token (60-day; refresh strategy needed)
 *   6. Note your IG-user-id and FB-page-id from the Graph API Explorer
 *   7. Add to .env (see .env.example):
 *        INSTAGRAM_ACCESS_TOKEN=...
 *        INSTAGRAM_USER_ID=...
 *        FACEBOOK_ACCESS_TOKEN=...
 *        FACEBOOK_PAGE_ID=...
 */

const GRAPH_API = 'https://graph.facebook.com/v19.0';

export interface Post {
  id: string;
  image: string;
  caption: string;
  permalink: string;
  timestamp: string;
}

interface InstagramApiNode {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

interface FacebookApiNode {
  id: string;
  message?: string;
  full_picture?: string;
  permalink_url: string;
  created_time: string;
}

function truncate(s: string | undefined, n = 140): string {
  if (!s) return '';
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
}

export async function fetchInstagramPosts(limit = 6): Promise<Post[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) return [];

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const url = `${GRAPH_API}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[social-feed] Instagram fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const json = (await res.json()) as { data?: InstagramApiNode[] };
    const data = json.data ?? [];

    return data.map((n) => ({
      id: n.id,
      image: n.media_type === 'VIDEO' ? (n.thumbnail_url ?? '') : (n.media_url ?? ''),
      caption: truncate(n.caption),
      permalink: n.permalink,
      timestamp: n.timestamp,
    })).filter((p) => p.image);
  } catch (err) {
    console.warn('[social-feed] Instagram fetch error:', err instanceof Error ? err.message : err);
    return [];
  }
}

export async function fetchFacebookPosts(limit = 4): Promise<Post[]> {
  const token = process.env.FACEBOOK_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!token || !pageId) return [];

  const fields = 'id,message,full_picture,permalink_url,created_time';
  const url = `${GRAPH_API}/${pageId}/posts?fields=${fields}&limit=${limit}&access_token=${token}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[social-feed] Facebook fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const json = (await res.json()) as { data?: FacebookApiNode[] };
    const data = json.data ?? [];

    return data
      .filter((n) => n.full_picture)
      .map((n) => ({
        id: n.id,
        image: n.full_picture as string,
        caption: truncate(n.message),
        permalink: n.permalink_url,
        timestamp: n.created_time,
      }));
  } catch (err) {
    console.warn('[social-feed] Facebook fetch error:', err instanceof Error ? err.message : err);
    return [];
  }
}

/** Format an ISO timestamp into a short human label per locale. */
export function formatTimeAgo(iso: string, locale: 'fr' | 'en' = 'fr'): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diffMs = Date.now() - then;
  const diffH = Math.floor(diffMs / 3_600_000);
  const diffD = Math.floor(diffH / 24);

  const labels = {
    fr: { now: "à l'instant", h: 'h', d: 'j', w: 'sem.', m: 'mois' },
    en: { now: 'just now', h: 'h', d: 'd', w: 'w', m: 'mo' },
  } as const;
  const L = labels[locale];

  if (diffH < 1) return L.now;
  if (diffH < 24) return `${diffH}${L.h}`;
  if (diffD < 7) return `${diffD}${L.d}`;
  if (diffD < 30) return `${Math.floor(diffD / 7)}${L.w}`;
  return `${Math.floor(diffD / 30)}${L.m}`;
}
