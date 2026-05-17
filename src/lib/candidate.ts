/**
 * Espace candidat — Supabase-backed minimal backend.
 *
 * Two surface operations against Supabase REST:
 *   - submit(input) → POST /rest/v1/candidates, returns { reference, applied_at }
 *   - lookup(ref, email) → POST /rest/v1/rpc/get_candidate, returns CandidateStatus | null
 *
 * Security model:
 *   - Anon key is public-by-design. RLS policies enforce safety.
 *   - INSERT allowed for anon (anyone can apply).
 *   - SELECT denied for anon (no row enumeration).
 *   - Lookup goes through SECURITY DEFINER RPC that returns ONLY rows
 *     matching both ref AND lowercased email — so anyone with just the
 *     ref can't harvest contact info, and email-only enumeration can't
 *     leak applicant identities.
 *
 * If PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY are absent, all
 * functions degrade gracefully — submit() returns an error, lookup()
 * returns null, isConfigured() returns false. The UI shows a
 * "service en cours de configuration" notice in that case.
 *
 * Schema lives in docs/SUPABASE_SETUP.md.
 */

export type Locale = 'fr' | 'en';

export type CandidateStep = 'dossier' | 'entretien' | 'formation' | 'affectation';

export type CandidateType = 'individuel' | 'equipe' | 'diplomatique';

export interface SubmitInput {
  email: string;
  full_name: string;
  phone: string;
  type: CandidateType;
  company?: string;
  message?: string;
  locale: Locale;
}

export interface SubmitOk {
  reference: string;
  applied_at: string;
}

export interface SubmitError {
  error: string;
}

export type SubmitResult = SubmitOk | SubmitError;

export interface CandidateHistoryEntry {
  step: CandidateStep;
  set_at: string;
  note?: string;
}

export interface CandidateStatus {
  reference: string;
  full_name: string;
  current_step: CandidateStep;
  status_history: CandidateHistoryEntry[];
  applied_at: string;
  updated_at: string;
}

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
const SUPABASE_ANON = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';

export function isConfigured(): boolean {
  return SUPABASE_URL.startsWith('https://') && SUPABASE_ANON.length > 20;
}

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    apikey: SUPABASE_ANON,
    Authorization: `Bearer ${SUPABASE_ANON}`,
  };
}

export async function submit(input: SubmitInput): Promise<SubmitResult> {
  if (!isConfigured()) return { error: 'not-configured' };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/candidates`, {
      method: 'POST',
      headers: { ...authHeaders(), Prefer: 'return=representation' },
      body: JSON.stringify({
        email: input.email.trim().toLowerCase(),
        full_name: input.full_name.trim(),
        phone: input.phone.trim(),
        type: input.type,
        company: input.company?.trim() || null,
        message: input.message?.trim() || null,
        locale: input.locale,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { error: text || `HTTP ${res.status}` };
    }

    const data = await res.json();
    const row = Array.isArray(data) ? data[0] : data;
    if (!row?.reference) return { error: 'malformed-response' };
    return { reference: row.reference, applied_at: row.applied_at };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'network-error' };
  }
}

export async function lookup(ref: string, email: string): Promise<CandidateStatus | null> {
  if (!isConfigured()) return null;
  if (!ref || !email) return null;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_candidate`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        p_ref: ref.trim().toUpperCase(),
        p_email: email.trim().toLowerCase(),
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const row = Array.isArray(data) ? data[0] : data;
    if (!row?.reference) return null;
    return {
      reference: row.reference,
      full_name: row.full_name,
      current_step: row.current_step,
      status_history: row.status_history ?? [],
      applied_at: row.applied_at,
      updated_at: row.updated_at,
    };
  } catch {
    return null;
  }
}

// ─── localStorage convenience ─────────────────────────────────────────

const LS_KEY = 'gss-candidate';

export function rememberCandidate(ref: string, email: string): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ref, email }));
  } catch {
    /* private-mode etc. — silent */
  }
}

export function getRememberedCandidate(): { ref: string; email: string } | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.ref || !parsed?.email) return null;
    return { ref: String(parsed.ref), email: String(parsed.email) };
  } catch {
    return null;
  }
}

export function forgetCandidate(): void {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    /* silent */
  }
}
