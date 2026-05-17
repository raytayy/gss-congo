/**
 * CandidatePortal — espace candidat lookup + status display.
 *
 * Two states (AnimatePresence cross-fades between them):
 *   - Lookup form: ref + email inputs
 *   - Status view: 4-step progress bar + history + applicant name
 *
 * On mount, attempts auto-lookup via:
 *   1. URL params ?ref=... &email=...   (highest priority — links shared by GSS)
 *   2. localStorage['gss-candidate']    (return visit after applying)
 *
 * On successful lookup, persists {ref, email} to localStorage so next
 * visit auto-loads. Logout clears localStorage.
 */

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  lookup,
  rememberCandidate,
  getRememberedCandidate,
  forgetCandidate,
  isConfigured,
} from '@lib/candidate';
import type { CandidateStatus, CandidateStep, Locale } from '@lib/candidate';

interface Props {
  locale: Locale;
}

const STEP_ORDER: CandidateStep[] = ['dossier', 'entretien', 'formation', 'affectation'];

const STEP_LABELS: Record<Locale, Record<CandidateStep, string>> = {
  fr: {
    dossier: 'Dossier',
    entretien: 'Entretien',
    formation: 'Formation',
    affectation: 'Affectation',
  },
  en: {
    dossier: 'Application',
    entretien: 'Interview',
    formation: 'Training',
    affectation: 'Assignment',
  },
};

const COPY = {
  fr: {
    lookupTitle: 'Suivre votre dossier',
    lookupSub: "Saisissez votre référence et votre email pour consulter l'état actuel de votre candidature.",
    refLabel: 'Référence',
    refPlaceholder: 'CAND-A3B2F1',
    emailLabel: 'Email',
    submitCta: 'Consulter',
    submitting: 'Chargement…',
    notFoundTitle: 'Dossier introuvable',
    notFoundBody:
      "Aucun dossier ne correspond à cette référence et cet email. Vérifiez les valeurs ou écrivez-nous à formation@gss-congo.com.",
    appliedAt: 'Postulé le',
    updatedAt: 'Dernière mise à jour',
    historyTitle: 'Historique',
    logout: 'Quitter cet espace',
    configMissing:
      "L'espace candidat est en cours de configuration. Revenez bientôt — votre dossier reste suivi côté équipe.",
    statusLabel: 'État actuel',
    helloPrefix: 'Bonjour',
    refLabelShort: 'Référence',
    pending: 'À venir',
    done: 'Validé',
    current: 'En cours',
  },
  en: {
    lookupTitle: 'Track your application',
    lookupSub: "Enter your reference and email to check the current status of your application.",
    refLabel: 'Reference',
    refPlaceholder: 'CAND-A3B2F1',
    emailLabel: 'Email',
    submitCta: 'Look up',
    submitting: 'Loading…',
    notFoundTitle: 'Application not found',
    notFoundBody:
      "No application matches that reference and email. Double-check the values or write to formation@gss-congo.com.",
    appliedAt: 'Applied on',
    updatedAt: 'Last updated',
    historyTitle: 'History',
    logout: 'Sign out of this space',
    configMissing:
      'The candidate space is being configured. Check back soon — your application is still being tracked by the team.',
    statusLabel: 'Current status',
    helloPrefix: 'Hello',
    refLabelShort: 'Reference',
    pending: 'Upcoming',
    done: 'Done',
    current: 'In progress',
  },
} as const;

type ErrorKey = 'notfound' | 'network' | null;

export default function CandidatePortal({ locale }: Props) {
  const t = COPY[locale];
  const reduce = useReducedMotion();

  const [status, setStatus] = useState<CandidateStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorKey>(null);
  const [refInput, setRefInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    if (!isConfigured()) {
      setBootstrapping(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const urlRef = params.get('ref') ?? '';
    const urlEmail = params.get('email') ?? '';
    const remembered = getRememberedCandidate();

    const ref = (urlRef || remembered?.ref || '').trim();
    const email = (urlEmail || remembered?.email || '').trim();

    if (ref && email) {
      setRefInput(ref);
      setEmailInput(email);
      void doLookup(ref, email);
    } else {
      setBootstrapping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function doLookup(ref: string, email: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await lookup(ref, email);
      if (data) {
        setStatus(data);
        rememberCandidate(ref, email);
      } else {
        setError('notfound');
      }
    } catch {
      setError('network');
    } finally {
      setLoading(false);
      setBootstrapping(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!refInput.trim() || !emailInput.trim()) return;
    void doLookup(refInput.trim(), emailInput.trim());
  }

  function handleLogout() {
    forgetCandidate();
    setStatus(null);
    setRefInput('');
    setEmailInput('');
    setError(null);
  }

  if (!isConfigured()) {
    return (
      <div className="cp">
        <div className="cp-config-missing" role="status">
          <p>{t.configMissing}</p>
        </div>
      </div>
    );
  }

  if (bootstrapping) {
    return (
      <div className="cp">
        <div className="cp-bootstrap" aria-hidden="true">
          <span className="cp-bootstrap-dot" />
          <span className="cp-bootstrap-dot" />
          <span className="cp-bootstrap-dot" />
        </div>
      </div>
    );
  }

  const dateOpts: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const intlLocale = locale === 'fr' ? 'fr-FR' : 'en-GB';

  return (
    <div className="cp">
      <AnimatePresence mode="wait" initial={false}>
        {status ? (
          <motion.div
            key="status"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="cp-status"
          >
            <header className="cp-status-head">
              <p className="cp-status-ref">
                <span className="cp-status-ref-label">{t.refLabelShort}</span>
                <span className="cp-status-ref-value">{status.reference}</span>
              </p>
              <h2 className="cp-status-title">
                {t.helloPrefix}, {firstName(status.full_name)}.
              </h2>
              <dl className="cp-status-meta">
                <div>
                  <dt>{t.appliedAt}</dt>
                  <dd>
                    <time dateTime={status.applied_at}>
                      {new Date(status.applied_at).toLocaleDateString(intlLocale, dateOpts)}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>{t.updatedAt}</dt>
                  <dd>
                    <time dateTime={status.updated_at}>
                      {new Date(status.updated_at).toLocaleDateString(intlLocale, dateOpts)}
                    </time>
                  </dd>
                </div>
              </dl>
            </header>

            <ol className="cp-steps" aria-label={t.statusLabel}>
              {STEP_ORDER.map((step, i) => {
                const currentIdx = STEP_ORDER.indexOf(status.current_step);
                const state: 'past' | 'current' | 'future' =
                  i < currentIdx ? 'past' : i === currentIdx ? 'current' : 'future';
                return (
                  <motion.li
                    key={step}
                    className={`cp-step cp-step-${state}`}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    aria-current={state === 'current' ? 'step' : undefined}
                  >
                    <span className="cp-step-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="cp-step-label">{STEP_LABELS[locale][step]}</span>
                    <span className="cp-step-state" aria-hidden="true">
                      {state === 'past' ? t.done : state === 'current' ? t.current : t.pending}
                    </span>
                    {state === 'current' && (
                      <motion.span
                        className="cp-step-pulse"
                        aria-hidden="true"
                        animate={
                          reduce ? undefined : { opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }
                        }
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </motion.li>
                );
              })}
            </ol>

            {status.status_history && status.status_history.length > 0 && (
              <section className="cp-history" aria-labelledby="cp-history-h">
                <h3 id="cp-history-h" className="cp-history-title">
                  {t.historyTitle}
                </h3>
                <ol className="cp-history-list">
                  {status.status_history.map((h, i) => (
                    <li key={i} className="cp-history-item">
                      <time className="cp-history-date" dateTime={h.set_at}>
                        {new Date(h.set_at).toLocaleDateString(intlLocale, dateOpts)}
                      </time>
                      <span className="cp-history-step">{STEP_LABELS[locale][h.step] ?? h.step}</span>
                      {h.note && <span className="cp-history-note">{h.note}</span>}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <button type="button" className="cp-logout" onClick={handleLogout}>
              {t.logout}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="lookup"
            onSubmit={handleSubmit}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="cp-lookup"
            noValidate
          >
            <h2 className="cp-lookup-title">{t.lookupTitle}</h2>
            <p className="cp-lookup-sub">{t.lookupSub}</p>

            <label className="cp-field">
              <span className="cp-field-label">{t.refLabel}</span>
              <input
                type="text"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value.toUpperCase())}
                placeholder={t.refPlaceholder}
                required
                pattern="^CAND-[A-Z0-9]{4,}$"
                autoComplete="off"
                spellCheck={false}
                inputMode="text"
              />
            </label>

            <label className="cp-field">
              <span className="cp-field-label">{t.emailLabel}</span>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                autoComplete="email"
                spellCheck={false}
              />
            </label>

            <button type="submit" className="cp-submit" disabled={loading}>
              {loading ? t.submitting : t.submitCta}
              {!loading && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <AnimatePresence>
              {error === 'notfound' && (
                <motion.div
                  key="notfound"
                  className="cp-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  role="alert"
                >
                  <p>
                    <strong>{t.notFoundTitle}</strong>
                  </p>
                  <p>{t.notFoundBody}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function firstName(full: string): string {
  return (full ?? '').trim().split(/\s+/)[0] ?? '';
}
