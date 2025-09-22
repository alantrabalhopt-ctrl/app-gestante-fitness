import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          age: number
          height: number
          pre_pregnancy_weight: number
          current_weight: number
          due_date: string
          fitness_level: 'iniciante' | 'intermediário' | 'avançado'
          medical_conditions: string[]
          preferences: string[]
          objectives: string[]
          pregnancy_stage: 'tentando-engravidar' | 'primeiro-trimestre' | 'segundo-trimestre' | 'terceiro-trimestre' | 'pos-parto'
          pregnancy_week: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          age: number
          height: number
          pre_pregnancy_weight: number
          current_weight: number
          due_date: string
          fitness_level: 'iniciante' | 'intermediário' | 'avançado'
          medical_conditions?: string[]
          preferences?: string[]
          objectives?: string[]
          pregnancy_stage: 'tentando-engravidar' | 'primeiro-trimestre' | 'segundo-trimestre' | 'terceiro-trimestre' | 'pos-parto'
          pregnancy_week: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          age?: number
          height?: number
          pre_pregnancy_weight?: number
          current_weight?: number
          due_date?: string
          fitness_level?: 'iniciante' | 'intermediário' | 'avançado'
          medical_conditions?: string[]
          preferences?: string[]
          objectives?: string[]
          pregnancy_stage?: 'tentando-engravidar' | 'primeiro-trimestre' | 'segundo-trimestre' | 'terceiro-trimestre' | 'pos-parto'
          pregnancy_week?: number
          created_at?: string
          updated_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          duration: string
          difficulty: 'fácil' | 'moderado' | 'avançado'
          type: 'casa' | 'ar-livre' | 'academia'
          trimester: string
          exercises: any[]
          ai_generated: boolean
          personalized_for: string | null
          target_muscles: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          duration: string
          difficulty: 'fácil' | 'moderado' | 'avançado'
          type: 'casa' | 'ar-livre' | 'academia'
          trimester: string
          exercises: any[]
          ai_generated?: boolean
          personalized_for?: string | null
          target_muscles?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          duration?: string
          difficulty?: 'fácil' | 'moderado' | 'avançado'
          type?: 'casa' | 'ar-livre' | 'academia'
          trimester?: string
          exercises?: any[]
          ai_generated?: boolean
          personalized_for?: string | null
          target_muscles?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      nutrition: {
        Row: {
          id: string
          user_id: string
          meal: string
          title: string
          ingredients: string[]
          instructions: string
          calories: number
          macros: any
          budget: 'baixo' | 'médio' | 'alto'
          prep_time: string
          ai_generated: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          meal: string
          title: string
          ingredients: string[]
          instructions: string
          calories: number
          macros: any
          budget?: 'baixo' | 'médio' | 'alto'
          prep_time?: string
          ai_generated?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          meal?: string
          title?: string
          ingredients?: string[]
          instructions?: string
          calories?: number
          macros?: any
          budget?: 'baixo' | 'médio' | 'alto'
          prep_time?: string
          ai_generated?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      agenda_events: {
        Row: {
          id: string
          user_id: string
          title: string
          date: string
          time: string
          type: 'appointment' | 'exam' | 'exercise' | 'personal'
          description: string | null
          location: string | null
          reminder: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          date: string
          time: string
          type: 'appointment' | 'exam' | 'exercise' | 'personal'
          description?: string | null
          location?: string | null
          reminder?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          date?: string
          time?: string
          type?: 'appointment' | 'exam' | 'exercise' | 'personal'
          description?: string | null
          location?: string | null
          reminder?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          text: string
          sender: 'user' | 'ai'
          type: 'psychologist' | 'medical' | 'recipe'
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          text: string
          sender: 'user' | 'ai'
          type: 'psychologist' | 'medical' | 'recipe'
          timestamp: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          text?: string
          sender?: 'user' | 'ai'
          type?: 'psychologist' | 'medical' | 'recipe'
          timestamp?: string
          created_at?: string
        }
      }
      workout_sessions: {
        Row: {
          id: string
          user_id: string
          workout_id: string
          started_at: string
          completed_at: string | null
          duration: number | null
          exercises_completed: number
          total_exercises: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          workout_id: string
          started_at: string
          completed_at?: string | null
          duration?: number | null
          exercises_completed?: number
          total_exercises: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          workout_id?: string
          started_at?: string
          completed_at?: string | null
          duration?: number | null
          exercises_completed?: number
          total_exercises?: number
          created_at?: string
        }
      }
    }
  }
}