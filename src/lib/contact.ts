import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'contact.json');

export type SocialLink = { name: string; url: string };
export type ContactData = {
  whatsapp: string;
  instagram: string;
  email: string;
  socials: SocialLink[];
  preferred?: 'email' | 'whatsapp';
  updatedAt?: string | null;
};

export function readContact(): ContactData {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as ContactData;
  } catch (err) {
    return { whatsapp: '', instagram: '', email: '', socials: [], preferred: 'email', updatedAt: null };
  }
}

export function writeContact(data: ContactData) {
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
