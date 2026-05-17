/**
 * SocialFeedLive — React island for the live IG + FB feed on /actualites/.
 *
 * Modes:
 *   - posts.length > 0  → real grid, staggered entrance, hover preview
 *   - posts.length === 0 → skeleton bento with shimmer + "Bientôt" badge
 *
 * Animations via framer-motion (whileInView + AnimatePresence). Respects
 * prefers-reduced-motion via motion's built-in `useReducedMotion` hook.
 *
 * Loaded with client:visible from the parent Astro page so the JS payload
 * doesn't ship for users who never scroll to the section.
 */

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Post } from '@lib/social-feed';

type Locale = 'fr' | 'en';

interface Props {
  posts: Post[];
  locale: Locale;
  /** Optional platform handles for the empty-state attribution row. */
  igUrl: string;
  fbUrl: string;
}

const copy = {
  fr: {
    statusLive: 'Mis à jour à la dernière publication',
    statusPending: 'Connexion aux APIs Meta en cours',
    pendingNote: 'Nos publications Instagram et Facebook apparaîtront ici dès que le raccordement sera finalisé.',
    soonBadge: 'Bientôt',
    followIg: 'Suivre @gsskinshasa',
    followFb: 'Suivre GSS Kinshasa',
    viewPost: 'Voir la publication',
  },
  en: {
    statusLive: 'Updated to the latest post',
    statusPending: 'Meta APIs connection in progress',
    pendingNote: 'Our Instagram and Facebook posts will appear here as soon as the connection is finalised.',
    soonBadge: 'Soon',
    followIg: 'Follow @gsskinshasa',
    followFb: 'Follow GSS Kinshasa',
    viewPost: 'View post',
  },
} as const;

export default function SocialFeedLive({ posts, locale, igUrl, fbUrl }: Props) {
  const t = copy[locale];
  const reduce = useReducedMotion();
  const hasPosts = posts.length > 0;

  return (
    <div className="sfl">
      {/* Status row — pulsing dot + plain-text status */}
      <div className="sfl-status" role="status" aria-live="polite">
        <motion.span
          className={`sfl-dot ${hasPosts ? 'sfl-dot-live' : 'sfl-dot-pending'}`}
          aria-hidden="true"
          animate={reduce ? undefined : { opacity: [0.45, 1, 0.45], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="sfl-status-text">
          {hasPosts ? t.statusLive : t.statusPending}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {hasPosts ? (
          <motion.ul
            key="grid-live"
            className="sfl-grid"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={gridVariants}
          >
            {posts.map((post) => (
              <motion.li
                key={post.id}
                className="sfl-card"
                variants={itemVariants}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              >
                <a
                  className="sfl-card-link"
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={post.caption || t.viewPost}
                >
                  <div className="sfl-card-media">
                    <img
                      src={post.image}
                      alt={post.caption || ''}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {post.caption && (
                    <div className="sfl-card-overlay">
                      <p className="sfl-card-caption">{post.caption}</p>
                    </div>
                  )}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <SkeletonGrid key="grid-skeleton" reduce={!!reduce} badgeLabel={t.soonBadge} />
        )}
      </AnimatePresence>

      {!hasPosts && (
        <motion.div
          className="sfl-pending-note"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="sfl-pending-text">{t.pendingNote}</p>
          <div className="sfl-pending-actions">
            <a className="sfl-follow sfl-follow-ig" href={igUrl} target="_blank" rel="noopener noreferrer">
              <span className="sfl-follow-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              {t.followIg}
            </a>
            <a className="sfl-follow sfl-follow-fb" href={fbUrl} target="_blank" rel="noopener noreferrer">
              <span className="sfl-follow-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </span>
              {t.followFb}
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Variants ─────────────────────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Skeleton bento ───────────────────────────────────────────────────

function SkeletonGrid({ reduce, badgeLabel }: { reduce: boolean; badgeLabel: string }) {
  // Six tiles arranged in a tasteful bento — first tile spans 2 cols.
  const tiles = [
    { className: 'sfl-skel sfl-skel-lead' },
    { className: 'sfl-skel sfl-skel-portrait' },
    { className: 'sfl-skel sfl-skel-square' },
    { className: 'sfl-skel sfl-skel-square' },
    { className: 'sfl-skel sfl-skel-square' },
    { className: 'sfl-skel sfl-skel-square' },
  ];

  return (
    <motion.ul
      className="sfl-grid sfl-grid-skeleton"
      aria-hidden="true"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={gridVariants}
    >
      {tiles.map((tile, i) => (
        <motion.li
          key={i}
          className={tile.className}
          variants={itemVariants}
        >
          <motion.div
            className="sfl-skel-shimmer"
            animate={reduce ? undefined : {
              backgroundPosition: ['200% 0', '-200% 0'],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          />
          <span className="sfl-skel-badge">
            <span className="sfl-skel-badge-dot" aria-hidden="true" />
            {badgeLabel}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
