import { createClient } from '@supabase/supabase-js';

/**
 * Supabase configuration.
 *
 * ONE-TIME SETUP — see the chat message this shipped with for the full
 * step-by-step walkthrough (create project, run the SQL that creates the
 * tables and policies, create the storage bucket, create the admin user).
 * Once done, replace both values below with what the Supabase dashboard
 * shows under Project Settings → API.
 *
 * Neither value is secret. The "anon" key is meant to be public — it ships
 * inside the site's JS bundle by design, the same way a Firebase web config
 * would. What actually protects the data is Row Level Security (the SQL
 * policies applied to each table): public read, authenticated-only write.
 * Do not rely on this file being hidden, and never put the Supabase
 * "service_role" key here — that one is a real secret and must never ship
 * to the browser.
 *
 * IMPORTANT — the URL below must stay in valid https://…supabase.co form
 * even as a placeholder. Supabase's client validates the URL's *shape*
 * the instant this file is imported, before any network call happens —
 * so a value like 'REPLACE_WITH_YOUR_URL' throws immediately and blanks
 * the entire site, not just this page. Swap in the real subdomain once
 * you have a project; leaving the placeholder's shape intact is what
 * keeps everything else on the site working until then.
 */
const SUPABASE_URL = 'https://esspitcgfkaaoywacyzq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzc3BpdGNnZmthYW95d2FjeXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MTAyMTMsImV4cCI6MjEwODQ4NjIxM30.rfWUWZgQFcHFzy9EEou1zqwKAJbM7alLWXAa2mn53w8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
