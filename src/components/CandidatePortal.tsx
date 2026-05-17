/**
 * CandidatePortal — espace candidat: apply + lookup + status.
 *
 * Three views (AnimatePresence cross-fades):
 *   - "idle"   → two cards side by side: ApplyCard + LookupCard
 *   - "status" → applicant name + 4-step timeline + history + logout
 *
 * Auto-bootstrap on mount:
 *   1. URL params ?ref=...&email=... (highest priority — links shared by GSS)
 *   2. localStorage['gss-candidate']   (return visit after applying)
 *
 * After a successful apply, immediately fetches the freshly-created record
 * and jumps to status view.
 */

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  submit,
  lookup,
  rememberCandidate,
  getRememberedCandidate,
  forgetCandidate,
  isConfigured,
} from '@lib/candidate';
import type {
  CandidateStatus,
  CandidateStep,
  CandidateType,
  Locale,
} from '@lib/candidate';

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
    applyTitle: 'Postuler',
    applySub: 'Remplissez ce formulaire pour entrer dans la prochaine cohorte.',
    applyName: 'Nom complet',
    applyPhone: 'Téléphone',
    applyEmail: 'Email',
    applyType: "Type d'inscription",
    applyTypeIndividual: 'Individuel',
    applyTypeTeam: "Équipe (RH d'entreprise)",
    applyTypeDiplomatic: 'Poste de sécurité diplomatique',
    applyCompany: 'Entreprise (le cas échéant)',
    applyMessage: 'Quelques mots sur votre contexte',
    applyCta: 'Envoyer mon inscription',
    applying: 'Envoi…',
    applyError: 'Échec de l\'envoi',
    applyErrorBody: 'Une erreur s\'est produite. Réessayez ou contactez-nous à formation@gss-congo.com.',
    fineprint:
      'Vos informations restent confidentielles et ne sont utilisées que pour le traitement de votre inscription.',

    lookupTitle: 'Suivre votre dossier',
    lookupSub:
      'Saisissez votre référence et votre email pour consulter l\'état actuel.',
    refLabel: 'Référence',
    refPlaceholder: 'CAND-A3B2F1',
    emailLabel: 'Email',
    lookupCta: 'Consulter',
    lookingUp: 'Chargement…',
    notFoundTitle: 'Dossier introuvable',
    notFoundBody:
      'Aucun dossier ne correspond à cette référence et cet email. Vérifiez les valeurs ou écrivez-nous à formation@gss-congo.com.',

    appliedAt: 'Postulé le',
    updatedAt: 'Dernière mise à jour',
    historyTitle: 'Historique',
    logout: 'Quitter cet espace',
    configMissing:
      "L'espace candidat est en cours de configuration. Revenez bientôt.",
    statusLabel: 'État actuel',
    helloPrefix: 'Bonjour',
    refLabelShort: 'Référence',
    pending: 'À venir',
    done: 'Validé',
    current: 'En cours',
  },
  en: {
    applyTitle: 'Apply',
    applySub: 'Fill in this form to enter the next cohort.',
    applyName: 'Full name',
    applyPhone: 'Phone',
    applyEmail: 'Email',
    applyType: 'Enrolment type',
    applyTypeIndividual: 'Individual',
    applyTypeTeam: 'Team (corporate HR)',
    applyTypeDiplomatic: 'Diplomatic security desk',
    applyCompany: 'Company (if applicable)',
    applyMessage: 'A few words on your context',
    applyCta: 'Send my application',
    applying: 'Sending…',
    applyError: 'Submission failed',
    applyErrorBody: 'Something went wrong. Try again or write to formation@gss-congo.com.',
    fineprint:
      'Your information stays confidential and is only used to process your application.',

    lookupTitle: 'Track your application',
    lookupSub: 'Enter your reference and email to check the current status.',
    refLabel: 'Reference',
    refPlaceholder: 'CAND-A3B2F1',
    emailLabel: 'Email',
    lookupCta: 'Look up',
    lookingUp: 'Loading…',
    notFoundTitle: 'Application not found',
    notFoundBody:
      'No application matches that reference and email. Double-check the values or write to formation@gss-congo.com.',

    appliedAt: 'Applied on',
    updatedAt: 'Last updated',
    historyTitle: 'History',
    logout: 'Sign out of this space',
    configMissing:
      'The candidate space is being configured. Check back soon.',
    statusLabel: 'Current status',
    helloPrefix: 'Hello',
    refLabelShort: 'Reference',
    pending: 'Upcoming',
    done: 'Done',
    current: 'In progress',
  },
} as const;

type View = 'idle' | 'status';

interface ApplyForm {
  full_name: string;
  email: string;
  phone: string;
  type: CandidateType;
  company: string;
  message: string;
}

const emptyApplyForm: ApplyForm = {
  full_name: '',
  email: '',
  phone: '',
  type: 'individuel',
  company: '',
  message: '',
};

export default function CandidatePortal({ locale }: Props) {
  const t = COPY[locale];
  const reduce = useReducedMotion();

  const [view, setView] = useState<View>('idle');
  const [status, setStatus] = useState<CandidateStatus | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  // Apply form
  const [applyForm, setApplyForm] = useState<ApplyForm>(emptyApplyForm);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  // Lookup form
  const [refInput, setRefInput] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<'notfound' | 'network' | null>(null);

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
      setLookupEmail(email);
      void runLookup(ref, email, /*setBootstrapDone=*/ true);
    } else {
      setBootstrapping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runLookup(ref: string, email: string, setBootstrapDone = false) {
    setLookingUp(true);
    setLookupError(null);
    try {
      const data = await lookup(ref, email);
      if (data) {
        setStatus(data);
        rememberCandidate(ref, email);
        setView('status');
      } else {
        setLookupError('notfound');
      }
    } catch {
      setLookupError('network');
    } finally {
      setLookingUp(false);
      if (setBootstrapDone) setBootstrapping(false);
    }
  }

  async function handleLookupSubmit(e: FormEvent) {
    e.preventDefault();
    if (!refInput.trim() || !lookupEmail.trim()) return;
    void runLookup(refInput.trim(), lookupEmail.trim());
  }

  async function handleApplySubmit(e: FormEvent) {
    e.preventDefault();
    if (applying) return;
    setApplyError(null);
    setApplying(true);
    try {
      const result = await submit({
        email: applyForm.email,
        full_name: applyForm.full_name,
        phone: applyForm.phone,
        type: applyForm.type,
        company: applyForm.company || undefined,
        message: applyForm.message || undefined,
        locale,
      });

      if ('reference' in result) {
        // Persist + immediately fetch the new record for the status view.
        rememberCandidate(result.reference, applyForm.email);
        const data = await lookup(result.reference, applyForm.email);
        if (data) {
          setStatus(data);
          setView('status');
        } else {
          // Insert succeeded but lookup failed — show the ref so they don't lose it.
          setApplyError(`${result.reference}`);
        }
      } else {
        setApplyError(t.applyErrorBody);
      }
    } catch {
      setApplyError(t.applyErrorBody);
    } finally {
      setApplying(false);
    }
  }

  function handleLogout() {
    forgetCandidate();
    setStatus(null);
    setRefInput('');
    setLookupEmail('');
    setApplyForm(emptyApplyForm);
    setApplyError(null);
    setLookupError(null);
    setView('idle');
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

  const intlLocale = locale === 'fr' ? 'fr-FR' : 'en-GB';
  const dateOpts: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return (
    <div className="cp">
      <AnimatePresence mode="wait" initial={false}>
        {view === 'status' && status ? (
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
          <motion.div
            key="idle"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="cp-idle"
          >
            {/* ─── APPLY CARD ───────────────────────────────────── */}
            <motion.form
              key="apply"
              onSubmit={handleApplySubmit}
              className="cp-apply"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              noValidate
            >
              <div className="cp-card-head">
                <p className="cp-card-eyebrow">01</p>
                <h2 className="cp-card-title">{t.applyTitle}</h2>
                <p className="cp-card-sub">{t.applySub}</p>
              </div>

              <div className="cp-row">
                <label className="cp-field">
                  <span className="cp-field-label">{t.applyName} *</span>
                  <input
                    type="text"
                    value={applyForm.full_name}
                    onChange={(e) => setApplyForm({ ...applyForm, full_name: e.target.value })}
                    required
                    autoComplete="name"
                  />
                </label>
                <label className="cp-field">
                  <span className="cp-field-label">{t.applyPhone} *</span>
                  <input
                    type="tel"
                    value={applyForm.phone}
                    onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                    required
                    autoComplete="tel"
                    placeholder="+243…"
                  />
                </label>
              </div>

              <label className="cp-field">
                <span className="cp-field-label">{t.applyEmail} *</span>
                <input
                  type="email"
                  value={applyForm.email}
                  onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </label>

              <div className="cp-row">
                <label className="cp-field">
                  <span className="cp-field-label">{t.applyCompany}</span>
                  <input
                    type="text"
                    value={applyForm.company}
                    onChange={(e) => setApplyForm({ ...applyForm, company: e.target.value })}
                    autoComplete="organization"
                  />
                </label>
                <label className="cp-field">
                  <span className="cp-field-label">{t.applyType}</span>
                  <select
                    value={applyForm.type}
                    onChange={(e) => setApplyForm({ ...applyForm, type: e.target.value as CandidateType })}
                  >
                    <option value="individuel">{t.applyTypeIndividual}</option>
                    <option value="equipe">{t.applyTypeTeam}</option>
                    <option value="diplomatique">{t.applyTypeDiplomatic}</option>
                  </select>
                </label>
              </div>

              <label className="cp-field">
                <span className="cp-field-label">{t.applyMessage}</span>
                <textarea
                  rows={4}
                  value={applyForm.message}
                  onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                />
              </label>

              <p className="cp-fineprint">{t.fineprint}</p>

              <button type="submit" className="cp-submit" disabled={applying}>
                {applying ? t.applying : t.applyCta}
                {!applying && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <AnimatePresence>
                {applyError && (
                  <motion.div
                    key="apply-error"
                    className="cp-error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    role="alert"
                  >
                    <p><strong>{t.applyError}</strong></p>
                    <p>{applyError}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>

            {/* ─── LOOKUP CARD ──────────────────────────────────── */}
            <motion.form
              key="lookup"
              onSubmit={handleLookupSubmit}
              className="cp-lookup"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              noValidate
            >
              <div className="cp-card-head">
                <p className="cp-card-eyebrow">02</p>
                <h2 className="cp-card-title">{t.lookupTitle}</h2>
                <p className="cp-card-sub">{t.lookupSub}</p>
              </div>

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
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  required
                  autoComplete="email"
                  spellCheck={false}
                />
              </label>

              <button type="submit" className="cp-submit cp-submit-ghost" disabled={lookingUp}>
                {lookingUp ? t.lookingUp : t.lookupCta}
                {!lookingUp && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <AnimatePresence>
                {lookupError === 'notfound' && (
                  <motion.div
                    key="lookup-error"
                    className="cp-error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    role="alert"
                  >
                    <p><strong>{t.notFoundTitle}</strong></p>
                    <p>{t.notFoundBody}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function firstName(full: string): string {
  return (full ?? '').trim().split(/\s+/)[0] ?? '';
}
