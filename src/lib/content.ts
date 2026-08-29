import { supabase } from './supabase';
import type { ProjectEntry } from '../data/projects';
import type { JournalEntry } from '../data/journals';

/**
 * Supabase data layer.
 *
 * Two tables:
 *   - "projects" — one row per project entry. Each row is a ProjectEntry
 *     (title, location, panels — panels stored as a single `jsonb` column,
 *     so the nested image/alt/points shape needs no separate table or join)
 *     plus a `category` column holding the slug from PROJECTS.
 *   - "journals" — one row per Reading Room entry.
 *
 * Every read/write goes through here so Admin.tsx and the public pages
 * (Projects.tsx, Journals.tsx) never call the Supabase client directly —
 * if the table shape ever changes, this is the one file that needs to know.
 *
 * Real-time: subscribeProjects/subscribeJournals do an initial fetch, then
 * open a Postgres "postgres_changes" subscription and re-fetch on any
 * insert/update/delete. Simpler than diffing individual change payloads,
 * and at this table size the extra read costs nothing noticeable.
 */

export type ProjectDoc = ProjectEntry & { id: string; category: string };
export type JournalDoc = JournalEntry & { id: string };
export type CategoryDoc = {
  id: string;
  slug: string;
  title: string;
  /** Short version for the tab row, e.g. "Residential" for "Residential Architecture.". Falls back to `title` when blank. */
  shortLabel: string | null;
  /** Tile photo for the homepage "Selected Work" grid. Null shows a placeholder. */
  image: string | null;
};

type ProjectRow = {
  id: string;
  category: string;
  title: string;
  location: string | null;
  panels: ProjectEntry['panels'];
};
type JournalRow = {
  id: string;
  title: string;
  date: string | null;
  excerpt: string | null;
  file: string | null;
};
type CategoryRow = {
  id: string;
  slug: string;
  title: string;
  short_label: string | null;
  image: string | null;
};

function rowToProjectDoc(row: ProjectRow): ProjectDoc {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    location: row.location ?? undefined,
    panels: row.panels,
  };
}
function rowToJournalDoc(row: JournalRow): JournalDoc {
  return {
    id: row.id,
    title: row.title,
    date: row.date ?? '',
    excerpt: row.excerpt ?? '',
    file: row.file,
  };
}
function rowToCategoryDoc(row: CategoryRow): CategoryDoc {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortLabel: row.short_label,
    image: row.image,
  };
}

/** Live-subscribes to every project entry, across all categories. */
export function subscribeProjects(cb: (docs: ProjectDoc[]) => void) {
  async function load() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) cb((data as ProjectRow[]).map(rowToProjectDoc));
  }
  load();
  const channel = supabase
    .channel('projects-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, load)
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

/** Live-subscribes to every category, in the order they were created. */
export function subscribeCategories(cb: (docs: CategoryDoc[]) => void) {
  async function load() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) cb((data as CategoryRow[]).map(rowToCategoryDoc));
  }
  load();
  const channel = supabase
    .channel('categories-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, load)
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

/** Live-subscribes to every Reading Room entry. */
export function subscribeJournals(cb: (docs: JournalDoc[]) => void) {
  async function load() {
    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) cb((data as JournalRow[]).map(rowToJournalDoc));
  }
  load();
  const channel = supabase
    .channel('journals-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'journals' }, load)
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

export async function addProject(category: string, entry: ProjectEntry) {
  const { error } = await supabase.from('projects').insert({
    category,
    title: entry.title,
    location: entry.location ?? null,
    panels: entry.panels,
  });
  if (error) throw error;
}
export async function updateProject(id: string, entry: ProjectEntry) {
  const { error } = await supabase
    .from('projects')
    .update({ title: entry.title, location: entry.location ?? null, panels: entry.panels })
    .eq('id', id);
  if (error) throw error;
}
export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

export async function addJournal(entry: JournalEntry) {
  const { error } = await supabase.from('journals').insert({
    title: entry.title,
    date: entry.date,
    excerpt: entry.excerpt,
    file: entry.file,
  });
  if (error) throw error;
}
export async function updateJournal(id: string, entry: JournalEntry) {
  const { error } = await supabase
    .from('journals')
    .update({ title: entry.title, date: entry.date, excerpt: entry.excerpt, file: entry.file })
    .eq('id', id);
  if (error) throw error;
}
export async function deleteJournal(id: string) {
  const { error } = await supabase.from('journals').delete().eq('id', id);
  if (error) throw error;
}

export async function addCategory(cat: { slug: string; title: string; shortLabel: string; image: string | null }) {
  const { error } = await supabase.from('categories').insert({
    slug: cat.slug,
    title: cat.title,
    short_label: cat.shortLabel || null,
    image: cat.image,
  });
  if (error) throw error;
}
export async function updateCategory(
  id: string,
  cat: { slug: string; title: string; shortLabel: string; image: string | null }
) {
  const { error } = await supabase
    .from('categories')
    .update({ slug: cat.slug, title: cat.title, short_label: cat.shortLabel || null, image: cat.image })
    .eq('id', id);
  if (error) throw error;
}
/**
 * Deleting a category does not touch the projects filed under it — refusing
 * the delete while any exist is safer than silently orphaning them (they'd
 * still be in the database, just with no tab to find them under).
 */
export async function deleteCategory(id: string, slug: string) {
  const { count } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('category', slug);
  if ((count ?? 0) > 0) {
    throw new Error(
      `This category still has ${count} project${count === 1 ? '' : 's'} in it. Move or delete ${count === 1 ? 'it' : 'them'} first.`
    );
  }
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
}

/**
 * Uploads a photo to the "project-images" Storage bucket and returns its
 * public URL — this is what the admin form's "Upload" button calls, so a
 * project photo can go straight from the admin's computer onto the live
 * site with no FTP step and no manual file placement.
 */
export async function uploadProjectImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('project-images').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('project-images').getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Uploads a Reading Room PDF to the same "project-images" bucket and returns
 * its public URL. Sharing one bucket keeps setup to a single thing to create
 * with a single set of policies — the "journals/" path prefix is what keeps
 * these files distinguishable from project photos inside it.
 */
export async function uploadJournalPdf(file: File): Promise<string> {
  const path = `journals/${crypto.randomUUID()}.pdf`;
  const { error } = await supabase.storage
    .from('project-images')
    .upload(path, file, { contentType: 'application/pdf' });
  if (error) throw error;
  const { data } = supabase.storage.from('project-images').getPublicUrl(path);
  return data.publicUrl;
}

/**
 * One-time migration: pushes the site's existing static data (the
 * PROJECT_INDEX / JOURNAL_ENTRIES that used to ship inside the code) into
 * Supabase. Meant to be run once, from the Admin page, right after Supabase
 * is first connected — never automatically, and it refuses to run if either
 * table already has rows, so it can't silently duplicate data on a second
 * click.
 */
export async function seedFromStaticData(
  categories: { slug: string; title: string; image: string }[],
  projectIndex: Record<string, ProjectEntry[]>,
  journalEntries: JournalEntry[]
): Promise<{ categories: number; projects: number; journals: number }> {
  const [{ count: existingCategories }, { count: existingProjects }, { count: existingJournals }] =
    await Promise.all([
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('journals').select('*', { count: 'exact', head: true }),
    ]);
  if ((existingCategories ?? 0) > 0 || (existingProjects ?? 0) > 0 || (existingJournals ?? 0) > 0) {
    throw new Error(
      'Supabase already has rows in "categories", "projects", or "journals" — seeding again would duplicate them. Delete the existing rows first if you really want to re-seed.'
    );
  }

  const categoryRows = categories.map((c) => ({
    slug: c.slug,
    title: c.title,
    short_label: null,
    image: c.image,
  }));
  const projectRows = Object.entries(projectIndex).flatMap(([category, entries]) =>
    entries.map((entry) => ({
      category,
      title: entry.title,
      location: entry.location ?? null,
      panels: entry.panels,
    }))
  );
  const journalRows = journalEntries.map((entry) => ({
    title: entry.title,
    date: entry.date,
    excerpt: entry.excerpt,
    file: entry.file,
  }));

  if (categoryRows.length) {
    const { error } = await supabase.from('categories').insert(categoryRows);
    if (error) throw error;
  }
  if (projectRows.length) {
    const { error } = await supabase.from('projects').insert(projectRows);
    if (error) throw error;
  }
  if (journalRows.length) {
    const { error } = await supabase.from('journals').insert(journalRows);
    if (error) throw error;
  }

  return { categories: categoryRows.length, projects: projectRows.length, journals: journalRows.length };
}

/** Turns "Cafés & Food Courts" into "cafes-food-courts" for a category slug. */
export function slugify(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents (é → e)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}