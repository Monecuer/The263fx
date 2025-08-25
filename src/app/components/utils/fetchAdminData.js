// utils/fetchAdminData.js or inside your component
import { supabase } from '../../lib/supabaseClient';

export const fetchAdminData = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, created_at');

    if (error) {
      console.error('Supabase fetch error:', error.message);
      return [];
    }

    console.log('Fetched profiles:', data);
    return data;
  } catch (err) {
    console.error('Unexpected error:', err.message);
    return [];
  }
};
