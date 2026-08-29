import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { User } from '@supabase/supabase-js';
import Container from '../components/Container';
import { PROJECTS, PROJECT_INDEX } from '../data/projects';
import type { ProjectEntry } from '../data/projects';
import { JOURNAL_ENTRIES } from '../data/journals';
import type { JournalEntry } from '../data/journals';
import { supabase } from '../lib/supabase';
import {
  subscribeProjects,
  subscribeJournals,
  addProject,
  updateProject,
  deleteProject,
  addJournal,
  updateJournal,
  deleteJournal,
  uploadProjectImage,
  uploadJournalPdf,
  seedFromStaticData,
} from '../lib/content';
import type { ProjectDoc, JournalDoc } from '../lib/content';
import { usePageMeta } from '../lib/seo';

/* ------------------------------------------------------------------ *
 * READ THIS FIRST
 *
 * This page now talks to Supabase — a real, shared database. Every edit
 * made here, from any device, is visible on the live site within moments,
 * no rebuild or re-upload needed. See the chat message this shipped with
 * for the one-time Supabase setup (create project, run the SQL that
 * creates the tables/policies, create the storage bucket, create the admin
 * user) and for `src/lib/supabase.ts`, where the project's URL and key go.
 *
 * Sign-in is real Supabase Authentication (email + password) — not the
 * casual client-side password check the offline draft used. Create the
 * admin account in the Supabase dashboard (Authentication → Users → Add
 * user); this page only signs people into an account that already exists,
 * it cannot create one.
 *
 * Project photos can now be uploaded directly from this page — the
 * "Upload" button next to each panel's image field sends the file to
 * Supabase Storage and fills in the field with the resulting public URL.
 * No FTP, no manual placement in public/assets/ needed for new photos.
 *
 * The first time this page runs against a freshly created Supabase
 * project, the "Import existing data" button below seeds the database from
 * the data that used to be hardcoded in `src/data/projects.ts` and
 * `src/data/journals.ts`. It only works once — it refuses to run if either
 * table already has rows, so a second click can't duplicate data.
 * ------------------------------------------------------------------ */

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="label-caps block text-subtle">
      {children}
    </label>
  );
}

const inputCls =
  'mt-2 w-full border border-line bg-surface px-3 py-2 font-body text-sm text-ink outline-none focus:border-ink';

/* ------------------------------------------------------------------ *
 * Projects tab
 * ------------------------------------------------------------------ */

type PanelDraft = { image: string; alt: string; pointsText: string };
type EntryDraft = { title: string; location: string; panels: PanelDraft[] };

const BLANK_PANEL: PanelDraft = { image: '', alt: '', pointsText: '' };
const BLANK_ENTRY: EntryDraft = { title: '', location: '', panels: [{ ...BLANK_PANEL }] };

function entryToDraft(entry: ProjectDoc): EntryDraft {
  return {
    title: entry.title,
    location: entry.location ?? '',
    panels: entry.panels.map((p) => ({
      image: p.image ?? '',
      alt: p.alt ?? '',
      pointsText: p.points.join('\n'),
    })),
  };
}

function draftToEntry(draft: EntryDraft): ProjectEntry {
  return {
    title: draft.title.trim(),
    ...(draft.location.trim() ? { location: draft.location.trim() } : {}),
    panels: draft.panels.map((p) => ({
      image: p.image.trim() || null,
      ...(p.alt.trim() ? { alt: p.alt.trim() } : {}),
      points: p.pointsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    })),
  };
}

function ProjectsAdmin({ allProjects }: { allProjects: ProjectDoc[] }) {
  const [activeSlug, setActiveSlug] = useState(PROJECTS[0].slug);
  const [draft, setDraft] = useState<EntryDraft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState('');

  async function handleUpload(i: number, file: File) {
    setUploadingIndex(i);
    setUploadError('');
    try {
      const url = await uploadProjectImage(file);
      updatePanel(i, { image: url });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploadingIndex(null);
    }
  }

  const entries = useMemo(
    () => allProjects.filter((p) => p.category === activeSlug),
    [allProjects, activeSlug]
  );

  function startAdd() {
    setDraft({ ...BLANK_ENTRY, panels: [{ ...BLANK_PANEL }] });
    setEditingId(null);
  }
  function startEdit(entry: ProjectDoc) {
    setDraft(entryToDraft(entry));
    setEditingId(entry.id);
  }
  function cancelEdit() {
    setDraft(null);
    setEditingId(null);
  }

  async function remove(id: string) {
    if (!confirm('Delete this project entry? This is live — it removes it from the site immediately.'))
      return;
    await deleteProject(id);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const entry = draftToEntry(draft);
    setSaving(true);
    try {
      if (editingId === null) await addProject(activeSlug, entry);
      else await updateProject(editingId, entry);
      cancelEdit();
    } finally {
      setSaving(false);
    }
  }

  function updatePanel(i: number, patch: Partial<PanelDraft>) {
    if (!draft) return;
    const panels = draft.panels.map((p, idx) => (idx === i ? { ...p, ...patch } : p));
    setDraft({ ...draft, panels });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-4">
        {PROJECTS.map((p) => {
          const count = allProjects.filter((d) => d.category === p.slug).length;
          const active = p.slug === activeSlug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => {
                setActiveSlug(p.slug);
                cancelEdit();
              }}
              className={`label-caps border-b-2 pb-1 ${
                active ? 'border-ink text-ink' : 'border-transparent text-subtle hover:text-ink'
              }`}
            >
              {p.title} {count > 0 && <span className="text-accent">{count}</span>}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-4">
        {entries.length === 0 && (
          <p className="font-body text-sm text-muted">No entries in this category yet.</p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start justify-between gap-4 border border-line p-4">
            <div>
              <p className="font-body text-sm font-medium text-ink">
                {entry.title}
                {entry.location && <span className="text-muted"> — {entry.location}</span>}
              </p>
              <p className="mt-1 font-body text-xs text-muted">{entry.panels.length} panel(s)</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button type="button" onClick={() => startEdit(entry)} className="label-caps text-ink hover:text-accent">
                Edit
              </button>
              <button type="button" onClick={() => remove(entry.id)} className="label-caps text-ink hover:text-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {!draft && (
        <button
          type="button"
          onClick={startAdd}
          className="label-caps mt-6 border border-ink/25 px-5 py-3 text-ink hover:border-ink"
        >
          + Add Project
        </button>
      )}

      {draft && (
        <form onSubmit={save} className="mt-8 border border-line bg-bone p-6">
          <h3 className="font-heading text-xl text-ink">
            {editingId === null ? 'New project' : 'Edit project'}
          </h3>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="project-title">Title</FieldLabel>
              <input
                id="project-title"
                required
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <FieldLabel htmlFor="project-location">Location (optional)</FieldLabel>
              <input
                id="project-location"
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {draft.panels.map((panel, i) => (
              <div key={i} className="border border-line bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="label-caps text-subtle">Panel {String(i + 1).padStart(2, '0')}</p>
                  {draft.panels.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({ ...draft, panels: draft.panels.filter((_, idx) => idx !== i) })
                      }
                      className="label-caps text-muted hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor={`panel-image-${i}`}>Image path</FieldLabel>
                    <div className="mt-2 flex gap-2">
                      <input
                        id={`panel-image-${i}`}
                        placeholder="/assets/images/projects/my-photo.jpg, or upload →"
                        value={panel.image}
                        onChange={(e) => updatePanel(i, { image: e.target.value })}
                        className={`${inputCls} mt-0`}
                      />
                      <label className="label-caps flex shrink-0 cursor-pointer items-center border border-ink/25 px-4 text-ink hover:border-ink">
                        {uploadingIndex === i ? 'Uploading…' : 'Upload'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingIndex !== null}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(i, file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>
                    {uploadError && uploadingIndex === null && (
                      <p className="mt-2 font-body text-xs text-red-700">{uploadError}</p>
                    )}
                  </div>
                  <div>
                    <FieldLabel htmlFor={`panel-alt-${i}`}>Alt text</FieldLabel>
                    <input
                      id={`panel-alt-${i}`}
                      value={panel.alt}
                      onChange={(e) => updatePanel(i, { alt: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <FieldLabel htmlFor={`panel-points-${i}`}>Description (one point per line)</FieldLabel>
                  <textarea
                    id={`panel-points-${i}`}
                    rows={3}
                    value={panel.pointsText}
                    onChange={(e) => updatePanel(i, { pointsText: e.target.value })}
                    className={`${inputCls} resize-y`}
                  />
                </div>

                {panel.image && (
                  <img
                    src={panel.image}
                    alt=""
                    className="mt-3 h-28 w-auto border border-line object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                    onLoad={(e) => (e.currentTarget.style.display = 'block')}
                  />
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => setDraft({ ...draft, panels: [...draft.panels, { ...BLANK_PANEL }] })}
              className="label-caps border border-ink/25 px-4 py-2 text-ink hover:border-ink"
            >
              + Add Panel
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="label-caps bg-ink px-6 py-3 text-bone hover:bg-ink/85 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="label-caps border border-ink/25 px-6 py-3 text-ink hover:border-ink"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Reading Room tab
 * ------------------------------------------------------------------ */


const BLANK_JOURNAL: JournalEntry = { title: '', date: '', excerpt: '', file: null };

function JournalsAdmin({ entries }: { entries: JournalDoc[] }) {
  const [draft, setDraft] = useState<JournalEntry | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState('');

  async function handlePdfUpload(file: File) {
    setUploadingPdf(true);
    setPdfError('');
    try {
      const url = await uploadJournalPdf(file);
      setDraft((d) => (d ? { ...d, file: url } : d));
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploadingPdf(false);
    }
  }

  function startAdd() {
    setDraft({ ...BLANK_JOURNAL });
    setEditingId(null);
  }
  function startEdit(entry: JournalDoc) {
    setDraft({ title: entry.title, date: entry.date, excerpt: entry.excerpt, file: entry.file });
    setEditingId(entry.id);
  }
  function cancelEdit() {
    setDraft(null);
    setEditingId(null);
  }
  async function remove(id: string) {
    if (!confirm('Delete this journal entry? This is live — it removes it from the site immediately.'))
      return;
    await deleteJournal(id);
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const clean: JournalEntry = {
      title: draft.title.trim(),
      date: draft.date.trim(),
      excerpt: draft.excerpt.trim(),
      file: draft.file && draft.file.trim() ? draft.file.trim() : null,
    };
    setSaving(true);
    try {
      if (editingId === null) await addJournal(clean);
      else await updateJournal(editingId, clean);
      cancelEdit();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="space-y-4">
        {entries.length === 0 && <p className="font-body text-sm text-muted">No entries yet.</p>}
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-start justify-between gap-4 border border-line p-4">
            <div>
              <p className="font-body text-sm font-medium text-ink">{entry.title}</p>
              <p className="mt-1 font-body text-xs text-muted">
                {entry.date || 'No date'} · {entry.file ? 'Live (has PDF)' : 'Coming soon'}
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button type="button" onClick={() => startEdit(entry)} className="label-caps text-ink hover:text-accent">
                Edit
              </button>
              <button type="button" onClick={() => remove(entry.id)} className="label-caps text-ink hover:text-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {!draft && (
        <button
          type="button"
          onClick={startAdd}
          className="label-caps mt-6 border border-ink/25 px-5 py-3 text-ink hover:border-ink"
        >
          + Add Entry
        </button>
      )}

      {draft && (
        <form onSubmit={save} className="mt-8 border border-line bg-bone p-6">
          <h3 className="font-heading text-xl text-ink">{editingId === null ? 'New entry' : 'Edit entry'}</h3>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="journal-title">Title</FieldLabel>
              <input
                id="journal-title"
                required
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <FieldLabel htmlFor="journal-date">Date (e.g. March 2026)</FieldLabel>
              <input
                id="journal-date"
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>

          <div className="mt-5">
            <FieldLabel htmlFor="journal-excerpt">Excerpt</FieldLabel>
            <textarea
              id="journal-excerpt"
              rows={3}
              value={draft.excerpt}
              onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              className={`${inputCls} resize-y`}
            />
          </div>

          <div className="mt-5">
            <FieldLabel htmlFor="journal-file">PDF (leave blank to keep it as "Coming Soon")</FieldLabel>
            <div className="mt-2 flex gap-2">
              <input
                id="journal-file"
                placeholder="Paste a path, or upload a PDF →"
                value={draft.file ?? ''}
                onChange={(e) => setDraft({ ...draft, file: e.target.value })}
                className={`${inputCls} mt-0`}
              />
              <label className="label-caps flex shrink-0 cursor-pointer items-center border border-ink/25 px-4 text-ink hover:border-ink">
                {uploadingPdf ? 'Uploading…' : 'Upload'}
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  disabled={uploadingPdf}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePdfUpload(file);
                    e.target.value = '';
                  }}
                />
              </label>
            </div>
            {pdfError && <p className="mt-2 font-body text-xs text-red-700">{pdfError}</p>}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="label-caps bg-ink px-6 py-3 text-bone hover:bg-ink/85 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="label-caps border border-ink/25 px-6 py-3 text-ink hover:border-ink"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

type SeedState = 'idle' | 'running' | 'done' | 'error';

export default function Admin() {
  usePageMeta({
    title: 'Admin — The Design Atelier',
    description: 'Internal content editor.',
    path: '/admin',
  });

  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined = still checking
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [authError, setAuthError] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const [tab, setTab] = useState<'projects' | 'journals'>('projects');
  const [allProjects, setAllProjects] = useState<ProjectDoc[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalDoc[]>([]);
  const [seedState, setSeedState] = useState<SeedState>('idle');
  const [seedError, setSeedError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubProjects = subscribeProjects(setAllProjects);
    const unsubJournals = subscribeJournals(setJournalEntries);
    return () => {
      unsubProjects();
      unsubJournals();
    };
  }, [user]);

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    setAuthError('');
    setSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
      if (error) throw error;
    } catch {
      setAuthError('Email or password is incorrect.');
    } finally {
      setSigningIn(false);
    }
  }

  async function handleSeed() {
    if (
      !confirm(
        'Import the original site data into Supabase? This only works once — if data already exists, it will refuse and change nothing.'
      )
    )
      return;
    setSeedState('running');
    setSeedError('');
    try {
      const result = await seedFromStaticData(PROJECTS, PROJECT_INDEX, JOURNAL_ENTRIES);
      setSeedState('done');
      alert(
        `Imported ${result.categories} categories, ${result.projects} project entries, and ${result.journals} journal entries.`
      );
    } catch (err) {
      setSeedState('error');
      setSeedError(err instanceof Error ? err.message : 'Import failed.');
    }
  }

  // Still resolving the auth session.
  if (user === undefined) {
    return (
      <Container>
        <div className="py-32 text-center font-body text-sm text-muted">Checking session…</div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <div className="mx-auto max-w-sm py-32">
          <h1 className="font-heading text-2xl text-ink">Admin</h1>
          <p className="mt-2 font-body text-sm text-muted">
            Sign in with the admin account created in the Supabase console.
          </p>
          <form onSubmit={handleSignIn} className="mt-8">
            <div className="mb-4">
              <FieldLabel htmlFor="admin-email">Email</FieldLabel>
              <input
                id="admin-email"
                type="email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>
            <FieldLabel htmlFor="admin-password">Password</FieldLabel>
            <input
              id="admin-password"
              type="password"
              required
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className={inputCls}
            />
            {authError && <p className="mt-2 font-body text-sm text-red-700">{authError}</p>}
            <button
              type="submit"
              disabled={signingIn}
              className="label-caps mt-5 w-full bg-ink px-6 py-3 text-bone hover:bg-ink/85 disabled:opacity-50"
            >
              {signingIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-ink">Content editor</h1>
            <p className="mt-2 font-body text-sm text-muted">
              Signed in as {user.email}. Changes here are live — every visitor sees them immediately,
              no rebuild needed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="label-caps text-muted hover:text-ink"
          >
            Sign out
          </button>
        </div>

        {allProjects.length === 0 && journalEntries.length === 0 && (
          <div className="mt-8 border border-dashed border-line bg-bone p-5">
            <p className="font-body text-sm text-ink">
              Firestore looks empty. If this is a freshly connected project, import the site's
              original data once:
            </p>
            <button
              type="button"
              onClick={handleSeed}
              disabled={seedState === 'running'}
              className="label-caps mt-4 border border-ink/25 px-5 py-3 text-ink hover:border-ink disabled:opacity-50"
            >
              {seedState === 'running' ? 'Importing…' : 'Import existing data'}
            </button>
            {seedState === 'error' && (
              <p className="mt-2 font-body text-sm text-red-700">{seedError}</p>
            )}
          </div>
        )}

        <div className="mt-10 flex gap-8 border-b border-line">
          <button
            type="button"
            onClick={() => setTab('projects')}
            className={`label-caps -mb-px border-b-2 pb-3 ${
              tab === 'projects' ? 'border-ink text-ink' : 'border-transparent text-subtle'
            }`}
          >
            Project Index
          </button>
          <button
            type="button"
            onClick={() => setTab('journals')}
            className={`label-caps -mb-px border-b-2 pb-3 ${
              tab === 'journals' ? 'border-ink text-ink' : 'border-transparent text-subtle'
            }`}
          >
            Reading Room
          </button>
        </div>

        <div className="mt-8">
          {tab === 'projects' ? (
            <ProjectsAdmin allProjects={allProjects} />
          ) : (
            <JournalsAdmin entries={journalEntries} />
          )}
        </div>
      </div>
    </Container>
  );
}