import { createClient } from '@supabase/supabase-js';

const API_URL = "https://fisrjaaezfuipwemzwke.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpc3JqYWFlemZ1aXB3ZW16d2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4OTc3MDEsImV4cCI6MjAxNTQ3MzcwMX0.HwkIY_ZwcMfEIE1BDkcWRazdBvNPKE9NoExLViiDVPE"

const supabase = createClient(API_URL, API_KEY);

export default supabase;