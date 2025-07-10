import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utoclzjvigrygpcxkvgz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0b2Nsemp2aWdyeWdwY3hrdmd6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTk3MjkxMSwiZXhwIjoyMDY3NTQ4OTExfQ.mnfdBlg2BH6PAOJ8o3IVcOYfcBiaUBiWB8DVYhdkCi8';   

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
