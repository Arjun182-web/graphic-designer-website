import { getAllPortfolioItems } from '@/lib/portfolio';

export default async function TestPage() {
  const data = await getAllPortfolioItems();

  console.log('SUPABASE DATA:', data);

  return <div>Check terminal</div>;
}