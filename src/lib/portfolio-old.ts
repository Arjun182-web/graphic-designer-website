import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  src: string; // public URL path (e.g. /uploads/filename.jpg)
  alt?: string;
  createdAt: string;
};

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export function readData(): PortfolioItem[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as PortfolioItem[];
  } catch (err) {
    return [];
  }
}

export function writeData(items: PortfolioItem[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), 'utf-8');
}

export async function addPortfolioItem(payload: {
  title: string;
  category: string;
  filename: string; // file contents already saved to public/uploads
  alt?: string;
}) {
  ensureUploadsDir();
  const items = readData();
  const id = String(Date.now());
  const item: PortfolioItem = {
    id,
    title: payload.title,
    category: payload.category,
    src: `/uploads/${payload.filename}`,
    alt: payload.alt || payload.title,
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  writeData(items);
  return item;
}

export function getAllPortfolioItems() {
  return readData();
}

export function getPortfolioItem(id: string) {
  const items = readData();
  return items.find((i) => i.id === id) || null;
}

export function updatePortfolioItem(id: string, data: Partial<PortfolioItem>) {
  const items = readData();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  writeData(items);
  return items[idx];
}

export function deletePortfolioItem(id: string) {
  const items = readData();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  const [removed] = items.splice(idx, 1);
  writeData(items);
  // optionally remove file from uploads
  try {
    const filePath = path.join(process.cwd(), 'public', removed.src.replace(/^\//, ''));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (e) {}
  return true;
}
