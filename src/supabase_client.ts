import { createClient } from '@supabase/supabase-js'

// Afficher toutes les variables d'environnement disponibles
console.log('All env vars:', import.meta.env)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Environment:', import.meta.env.MODE)
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing environment variables. Available vars:', import.meta.env)
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
