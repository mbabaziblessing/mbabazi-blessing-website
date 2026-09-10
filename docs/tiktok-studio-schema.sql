CREATE TABLE IF NOT EXISTS studio_oauth (id TEXT PRIMARY KEY, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS studio_sessions (id TEXT PRIMARY KEY, payload TEXT NOT NULL, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS studio_jobs (
  id TEXT PRIMARY KEY, owner TEXT NOT NULL, stage TEXT NOT NULL, size INTEGER NOT NULL,
  payload TEXT, created INTEGER NOT NULL, expires INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS studio_jobs_owner ON studio_jobs(owner);
CREATE INDEX IF NOT EXISTS studio_jobs_expiry ON studio_jobs(expires);
CREATE INDEX IF NOT EXISTS studio_sessions_expiry ON studio_sessions(expires);
