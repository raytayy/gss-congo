/**
 * GSS Congo — Job postings, editable by the client via Google Sheet.
 *
 * Flow: Bechir edits the sheet → sheet is published as CSV →
 * `JOBS_SHEET_CSV_URL` env (Vercel) points at it → this module fetches
 * it AT BUILD TIME → careers pages render it statically. A Vercel
 * deploy hook (pinged from the sheet's Apps Script) rebuilds on edit.
 *
 * Expected header row (case/accent-insensitive, order-free):
 *   actif | code | statut | titre_fr | titre_en |
 *   description_fr | description_en | type_fr | type_en
 *
 *   actif:  OUI / NON — NON hides the row without deleting it
 *   statut: OUVERT | PROCHAINE COHORTE | LISTE D'ATTENTE
 *           (english open | next | waitlist also accepted)
 *
 * Any failure (env unset, network, empty/malformed sheet) returns null
 * and the pages fall back to their baked-in role list — a bad sheet
 * edit can never break the build or empty the page.
 */

export type RoleStatus = 'open' | 'next' | 'waitlist';

export interface Role {
  code: string;
  name: string;
  summary: string;
  status: RoleStatus;
  type: string;
}

export interface LocalisedRoles {
  fr: Role[];
  en: Role[];
}

const FETCH_TIMEOUT_MS = 10_000;

/** Minimal CSV parser handling quoted fields, embedded commas and newlines. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      rows.push(row); row = [];
    } else field += c;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim().length > 0));
}

/** Lowercase + strip diacritics — tolerant header and enum matching. */
function normalise(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()
    .toLowerCase();
}

function toStatus(raw: string): RoleStatus | null {
  const v = normalise(raw);
  if (v === 'ouvert' || v === 'open') return 'open';
  if (v.includes('prochaine') || v.includes('cohorte') || v === 'next') return 'next';
  if (v.includes('attente') || v === 'waitlist') return 'waitlist';
  return null;
}

function isActive(raw: string): boolean {
  const v = normalise(raw);
  return v === '' || v === 'oui' || v === 'yes' || v === 'x' || v === '1';
}

export async function fetchRolesFromSheet(): Promise<LocalisedRoles | null> {
  const url = import.meta.env.JOBS_SHEET_CSV_URL;
  if (!url) return null;

  let text: string;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, { signal: controller.signal, redirect: 'follow' });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    text = await res.text();
  } catch (error) {
    console.warn('[jobs] Sheet fetch failed, using baked-in roles:', error);
    return null;
  }

  const rows = parseCsv(text);
  if (rows.length < 2) {
    console.warn('[jobs] Sheet has no data rows, using baked-in roles.');
    return null;
  }

  const header = rows[0].map(normalise);
  const col = (name: string) => header.indexOf(name);
  const idx = {
    actif: col('actif'),
    code: col('code'),
    statut: col('statut'),
    titreFr: col('titre_fr'),
    titreEn: col('titre_en'),
    descFr: col('description_fr'),
    descEn: col('description_en'),
    typeFr: col('type_fr'),
    typeEn: col('type_en'),
  };
  if (idx.code < 0 || idx.statut < 0 || idx.titreFr < 0) {
    console.warn('[jobs] Sheet is missing required columns (code, statut, titre_fr), using baked-in roles.');
    return null;
  }

  const fr: Role[] = [];
  const en: Role[] = [];
  for (const row of rows.slice(1)) {
    const cell = (i: number) => (i >= 0 ? (row[i] ?? '').trim() : '');
    if (!isActive(cell(idx.actif))) continue;

    const code = cell(idx.code);
    const status = toStatus(cell(idx.statut));
    const titreFr = cell(idx.titreFr);
    if (!code || !status || !titreFr) continue; // skip malformed rows, keep the rest

    fr.push({
      code,
      status,
      name: titreFr,
      summary: cell(idx.descFr),
      type: cell(idx.typeFr) || 'CDI · cohorte',
    });
    en.push({
      code,
      status,
      name: cell(idx.titreEn) || titreFr,
      summary: cell(idx.descEn) || cell(idx.descFr),
      type: cell(idx.typeEn) || cell(idx.typeFr) || 'Permanent · cohort',
    });
  }

  if (fr.length === 0) {
    console.warn('[jobs] Sheet produced zero valid active roles, using baked-in roles.');
    return null;
  }
  console.log(`[jobs] Loaded ${fr.length} role(s) from the sheet.`);
  return { fr, en };
}
