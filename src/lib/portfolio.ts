import { supabase } from './supabase';

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
};

export async function getAllPortfolioItems() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

export async function getPortfolioItem(id: string) {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export async function addPortfolioItem(item: {
  title: string;
  category: string;
  image_url: string;
}) {
  const { data, error } = await supabase
    .from('portfolio')
    .insert([item])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updatePortfolioItem(
  id: string,
  updates: Partial<PortfolioItem>
) {
  const { data, error } = await supabase
    .from('portfolio')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deletePortfolioItem(id: string) {
  const { error } = await supabase
    .from('portfolio')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return true;
}