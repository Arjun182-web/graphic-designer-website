import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'profile.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

export type Profile = {
  bio: string;
  src: string;
  alt?: string;
  updatedAt?: string | null;
};

export function readProfile(): Profile {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as Profile;
  } catch (err) {
    return { bio: '', src: '', alt: '', updatedAt: null };
  }
}

export function writeProfile(profile: Profile) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(profile, null, 2), 'utf-8');
}

export function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export async function saveProfileImage(filename: string, b64: string) {
  ensureUploadsDir();
  const matches = b64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  const data = matches ? matches[2] : b64;
  const buffer = Buffer.from(data, 'base64');
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '-');
  const filePath = path.join(UPLOADS_DIR, safeName);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${safeName}`;
}
