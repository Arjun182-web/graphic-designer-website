import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SESSIONS_PATH = path.join(process.cwd(), 'src', 'data', 'sessions.json');

type Session = { token: string; createdAt: string; expiresAt: string };

function readSessions(): Session[] {
  try {
    const raw = fs.readFileSync(SESSIONS_PATH, 'utf-8');
    return JSON.parse(raw) as Session[];
  } catch (err) {
    return [];
  }
}

function writeSessions(sessions: Session[]) {
  fs.writeFileSync(SESSIONS_PATH, JSON.stringify(sessions, null, 2), 'utf-8');
}

export function createSession(ttlHours = 24) {
  const token = crypto.randomBytes(32).toString('hex');
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + ttlHours * 3600 * 1000).toISOString();
  const sessions = readSessions();
  sessions.push({ token, createdAt, expiresAt });
  writeSessions(sessions);
  return token;
}

export function verifySession(token?: string) {
  if (!token) return false;
  const sessions = readSessions();
  const now = new Date();
  const idx = sessions.findIndex((s) => s.token === token);
  if (idx === -1) return false;
  const session = sessions[idx];
  if (new Date(session.expiresAt) < now) {
    // remove expired
    sessions.splice(idx, 1);
    writeSessions(sessions);
    return false;
  }
  return true;
}

export function revokeSession(token?: string) {
  if (!token) return;
  const sessions = readSessions();
  const idx = sessions.findIndex((s) => s.token === token);
  if (idx !== -1) {
    sessions.splice(idx, 1);
    writeSessions(sessions);
  }
}
