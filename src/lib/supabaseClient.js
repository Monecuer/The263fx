// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://roclvjwsgwqnqnzrxcdl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvY2x2andzZ3dxbnFuenJ4Y2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzUxNjUsImV4cCI6MjA2NzIxMTE2NX0.xsBH5kOuOAp56F8xXDrvN_meqUhlekQVqg5gk9v03zI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
