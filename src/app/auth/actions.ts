'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '../../../utils/supabase/client';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/dashboard');
  redirect('/admin/dashboard');
}

export async function logout() {
  await supabase.auth.signOut();
  
  redirect('/auth/login');
}