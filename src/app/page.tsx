'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Heart, Baby, Utensils, BookOpen, Home, Dumbbell, User, Play, Check, ArrowLeft, 
  Calendar, Clock, Camera, Barcode, Music, Bell, Droplets, Sparkles, Plus,
  TrendingUp, Activity, Moon, Sun, Weight, Ruler, FileText, Upload, 
  Bluetooth, Zap, Target, Award, Settings, ChevronRight, Search, Filter,
  RotateCcw, Volume2, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Star, Trophy, Flame, Brain, Eye, Muscle, Timer, Share2, Download,
  ChevronLeft, ChevronDown, ChevronUp, RefreshCw, Smartphone, Wifi
} from 'lucide-react'

type Screen = 'login' | 'dashboard' | 'workout' | 'nutrition' | 'content' | 'profile' | 'agenda' | 
             'workout-detail' | 'nutrition-detail' | 'content-detail' | 'pregnancy-tracker' |
             'ai-analysis' | 'music-player' | 'reminders' | 'photo-nutrition' | 'barcode-scanner' |
             'ai-workout-generator' | 'exercise-guide' | 'progress-photos' | 'photo-timeline' |
             'permissions' | 'workout-3d' | 'ai-trainer' | 'muscle-guide'

interface WorkoutData {
  id: number
  title: string
  trimester: string
  duration: string
  description: string
  videoUrl: string
  type: 'casa' | 'ar-livre' | 'academia'
  difficulty: 'fácil' | 'moderado' | 'avançado'
  exercises: ExerciseData[]
  aiGenerated?: boolean
  personalizedFor?: string
}

interface ExerciseData {
  id: number
  name: string
  duration: string
  reps?: string
  description: string
  muscleGroups: string[]
  safetyTips: string[]
  modifications: string[]
  animation3D?: string
}

interface NutritionData {
  id: number
  meal: string
  title: string
  ingredients: string[]
  instructions: string
  calories: number
  macros: { protein: number; carbs: number; fat: number }
}

interface PregnancyData {
  week: number
  babySize: string
  babyWeight: string
  symptoms: string[]
  tips: string[]
  development: string
}

interface ReminderData {
  id: number
  title: string
  time: string
  type: 'water' | 'medicine' | 'appointment' | 'selfcare'
  active: boolean
}

interface ProgressPhoto {
  id: number
  date: string
  week: number
  imageUrl: string
  notes?: string
  weight?: number
}

interface UserProfile {
  name: string
  age: number
  height: number
  prePregnancyWeight: number
  currentWeight: number
  dueDate: string
  fitnessLevel: 'iniciante' | 'intermediário' | 'avançado'
  medicalConditions: string[]
  preferences: string[]
}

export default function MamaeFitApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pregnancyWeek, setPregnancyWeek] = useState(24)
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutData | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<ExerciseData | null>(null)
  const [selectedNutrition, setSelectedNutrition] = useState<NutritionData | null>(null)
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([])
  const [dailyCalories, setDailyCalories] = useState(1850)
  const [consumedCalories, setConsumedCalories] = useState(1240)
  const [waterIntake, setWaterIntake] = useState(6)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState("Música Relaxante para Gestantes")
  const [progressPhotos, setProgressPhotos] = useState<ProgressPhoto[]>([])
  const [aiWorkouts, setAiWorkouts] = useState<WorkoutData[]>([])
  const [permissionsGranted, setPermissionsGranted] = useState({
    camera: false,
    storage: false,
    notifications: false,
    location: false
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  const userProfile: UserProfile = {
    name: "Maria Silva",
    age: 28,
    height: 165,
    prePregnancyWeight: 62,
    currentWeight: 68.5,
    dueDate: "2024-08-15",
    fitnessLevel: "intermediário",
    medicalConditions: [],
    preferences: ["yoga", "caminhada", "pilates"]
  }

  const exercises: ExerciseData[] = [
    {
      id: 1,
      name: "Agachamento Gestante",
      duration: "3 séries",
      reps: "12-15 repetições",
      description: "Fortalece glúteos e pernas, preparando para o parto",
      muscleGroups: ["Glúteos", "Quadríceps", "Core"],
      safetyTips: [
        "Mantenha os pés afastados na largura dos ombros",
        "Não desça muito baixo",
        "Pare se sentir desconforto"
      ],
      modifications: [
        "Use uma cadeira para apoio",
        "Reduza a amplitude do movimento",
        "Faça contra a parede"
      ],
      animation3D: "squat-pregnant"
    },
    {
      id: 2,
      name: "Prancha Modificada",
      duration: "3 séries",
      reps: "20-30 segundos",
      description: "Fortalece o core de forma segura durante a gestação",
      muscleGroups: ["Core", "Ombros", "Braços"],
      safetyTips: [
        "Mantenha a coluna neutra",
        "Respire normalmente",
        "Pare se sentir pressão abdominal"
      ],
      modifications: [
        "Apoie os joelhos no chão",
        "Use uma parede para apoio",
        "Reduza o tempo de sustentação"
      ],
      animation3D: "plank-modified"
    },
    {
      id: 3,
      name: "Elevação de Braços",
      duration: "3 séries",
      reps: "10-12 repetições",
      description: "Fortalece ombros e melhora a postura",
      muscleGroups: ["Deltoides", "Trapézio", "Romboides"],
      safetyTips: [
        "Use pesos leves (1-2kg)",
        "Movimento controlado",
        "Mantenha o core ativado"
      ],
      modifications: [
        "Faça sem peso",
        "Alterne os braços",
        "Faça sentada"
      ],
      animation3D: "arm-raises"
    }
  ]

  const workouts: WorkoutData[] = [
    {
      id: 1,
      title: "Yoga Pré-natal",
      trimester: "1º Trimestre",
      duration: "15 min",
      description: "Exercícios de alongamento e respiração para relaxar o corpo e mente.",
      videoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      type: "casa",
      difficulty: "fácil",
      exercises: exercises.slice(0, 2)
    },
    {
      id: 2,
      title: "Caminhada Ativa",
      trimester: "2º Trimestre", 
      duration: "20 min",
      description: "Exercício cardiovascular leve para manter o condicionamento físico.",
      videoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      type: "ar-livre",
      difficulty: "fácil",
      exercises: []
    },
    {
      id: 3,
      title: "Pilates Gestante",
      trimester: "3º Trimestre",
      duration: "25 min", 
      description: "Fortalecimento do core e preparação para o parto.",
      videoUrl: "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=400&h=300&fit=crop",
      type: "casa",
      difficulty: "moderado",
      exercises: exercises
    },
    {
      id: 4,
      title: "Treino Pós-parto",
      trimester: "Pós-parto",
      duration: "30 min",
      description: "Exercícios para recuperação e fortalecimento pós-parto.",
      videoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
      type: "casa", 
      difficulty: "moderado",
      exercises: exercises
    },
    {
      id: 5,
      title: "Treino com Bebê",
      trimester: "Pós-parto",
      duration: "20 min",
      description: "Exercícios que você pode fazer junto com seu bebê.",
      videoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      type: "casa",
      difficulty: "fácil",
      exercises: exercises.slice(0, 1)
    }
  ]

  const nutrition: NutritionData[] = [
    {
      id: 1,
      meal: "Café da Manhã",
      title: "Bowl de Frutas com Granola",
      ingredients: ["1 banana", "1/2 xícara de morangos", "2 colheres de granola", "1 colher de mel", "Iogurte natural"],
      instructions: "Corte as frutas, adicione o iogurte, granola e finalize com mel. Rico em fibras e vitaminas.",
      calories: 320,
      macros: { protein: 12, carbs: 45, fat: 8 }
    },
    {
      id: 2,
      meal: "Almoço", 
      title: "Salmão Grelhado com Quinoa",
      ingredients: ["150g de salmão", "1/2 xícara de quinoa", "Brócolis", "Azeite", "Limão"],
      instructions: "Grelhe o salmão, cozinhe a quinoa e refogue o brócolis. Tempere com azeite e limão.",
      calories: 480,
      macros: { protein: 35, carbs: 30, fat: 22 }
    },
    {
      id: 3,
      meal: "Lanche",
      title: "Smoothie Verde",
      ingredients: ["1 maçã", "Folhas de espinafre", "1/2 abacate", "Água de coco", "Gengibre"],
      instructions: "Bata todos os ingredientes no liquidificador até ficar cremoso. Rico em ácido fólico.",
      calories: 180,
      macros: { protein: 4, carbs: 25, fat: 8 }
    }
  ]

  const pregnancyData: PregnancyData = {
    week: pregnancyWeek,
    babySize: "Tamanho de uma berinjela",
    babyWeight: "~600g",
    symptoms: ["Enjoos matinais diminuindo", "Aumento do apetite", "Movimentos do bebê mais perceptíveis"],
    tips: ["Mantenha uma dieta balanceada", "Pratique exercícios leves", "Durma de lado esquerdo"],
    development: "O bebê está desenvolvendo os sentidos e pode ouvir sons externos. Os pulmões estão se preparando para respirar."
  }

  const reminders: ReminderData[] = [
    { id: 1, title: "Beber água", time: "A cada 2 horas", type: "water", active: true },
    { id: 2, title: "Vitamina pré-natal", time: "08:00", type: "medicine", active: true },
    { id: 3, title: "Consulta médica", time: "14:00 - Amanhã", type: "appointment", active: true },
    { id: 4, title: "Momento autocuidado", time: "19:00", type: "selfcare", active: false }
  ]

  // Simular fotos de progresso
  const sampleProgressPhotos: ProgressPhoto[] = [
    {
      id: 1,
      date: "2024-01-15",
      week: 12,
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop",
      notes: "Primeira foto do progresso!",
      weight: 63.2
    },
    {
      id: 2,
      date: "2024-02-15",
      week: 16,
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      notes: "Barriguinha começando a aparecer",
      weight: 64.8
    },
    {
      id: 3,
      date: "2024-03-15",
      week: 20,
      imageUrl: "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f9?w=300&h=400&fit=crop",
      notes: "Metade da gestação!",
      weight: 66.5
    },
    {
      id: 4,
      date: "2024-04-15",
      week: 24,
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=400&fit=crop",
      notes: "Sentindo os movimentos do bebê",
      weight: 68.5
    }
  ]

  useEffect(() => {
    setProgressPhotos(sampleProgressPhotos)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentScreen('permissions')
  }

  const handlePermissionsComplete = () => {
    setCurrentScreen('dashboard')
  }

  const handleWorkoutComplete = (workoutId: number) => {
    setCompletedWorkouts([...completedWorkouts, workoutId])
    setCurrentScreen('workout')
  }

  const getTrimesteFromWeek = (week: number) => {
    if (week <= 12) return "1º Trimestre"
    if (week <= 28) return "2º Trimestre"
    return "3º Trimestre"
  }

  const handlePhotoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleProgressPhotoUpload = () => {
    photoInputRef.current?.click()
  }

  const simulateAIAnalysis = (type: 'photo' | 'exam' | 'workout') => {
    setCurrentScreen('ai-analysis')
    setTimeout(() => {
      if (type === 'photo') {
        alert("IA detectou: Prato com ~450 calorias\n- Proteína: 25g\n- Carboidratos: 35g\n- Gordura: 18g")
        setCurrentScreen('nutrition')
      } else if (type === 'exam') {
        alert("IA analisou seus exames:\n- Todos os valores normais\n- Recomendação: Continue com exercícios leves\n- Próxima consulta em 2 semanas")
        setCurrentScreen('agenda')
      } else if (type === 'workout') {
        generateAIWorkout()
      }
    }, 3000)
  }

  const generateAIWorkout = () => {
    const newWorkout: WorkoutData = {
      id: Date.now(),
      title: "Treino IA Personalizado",
      trimester: getTrimesteFromWeek(pregnancyWeek),
      duration: "18 min",
      description: `Treino gerado pela IA especificamente para você na semana ${pregnancyWeek}, considerando seu nível ${userProfile.fitnessLevel} e preferências.`,
      videoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      type: "casa",
      difficulty: userProfile.fitnessLevel === 'iniciante' ? 'fácil' : userProfile.fitnessLevel === 'intermediário' ? 'moderado' : 'avançado',
      exercises: exercises.slice(0, 2),
      aiGenerated: true,
      personalizedFor: `Semana ${pregnancyWeek} - ${userProfile.fitnessLevel}`
    }
    
    setAiWorkouts([newWorkout, ...aiWorkouts])
    setSelectedWorkout(newWorkout)
    setCurrentScreen('workout-detail')
  }

  const handleProgressPhotoSave = (file: File) => {
    const newPhoto: ProgressPhoto = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      week: pregnancyWeek,
      imageUrl: URL.createObjectURL(file),
      notes: `Foto da semana ${pregnancyWeek}`,
      weight: userProfile.currentWeight
    }
    setProgressPhotos([newPhoto, ...progressPhotos])
  }

  const requestPermission = async (type: keyof typeof permissionsGranted) => {
    // Simular solicitação de permissão
    setTimeout(() => {
      setPermissionsGranted(prev => ({ ...prev, [type]: true }))
    }, 1000)
  }

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Mamãe Fit
          </h1>
          <p className="text-gray-600 text-lg">Sua jornada de bem-estar na maternidade</p>
          <p className="text-sm text-gray-500 mt-2">Personal trainer digital com IA</p>
        </div>
        
        <div className="space-y-4 mb-8">
          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/70 backdrop-blur-sm"
          />
          <input
            type="password"
            placeholder="Sua senha"
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/70 backdrop-blur-sm"
          />
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Entrar
        </button>
        
        <p className="text-center text-gray-500 mt-6">
          Não tem conta? <span className="text-pink-500 cursor-pointer font-semibold">Cadastre-se</span>
        </p>
      </div>
    </div>
  )

  const PermissionsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Permissões Necessárias</h1>
          <p className="text-gray-600">Para uma experiência completa, precisamos de algumas permissões</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <Camera className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-semibold text-gray-800">Câmera</p>
                <p className="text-sm text-gray-600">Para fotos de progresso e análise nutricional</p>
              </div>
            </div>
            <button
              onClick={() => requestPermission('camera')}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                permissionsGranted.camera 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {permissionsGranted.camera ? 'Permitido' : 'Permitir'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-purple-500" />
              <div>
                <p className="font-semibold text-gray-800">Armazenamento</p>
                <p className="text-sm text-gray-600">Para salvar fotos e dados de progresso</p>
              </div>
            </div>
            <button
              onClick={() => requestPermission('storage')}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                permissionsGranted.storage 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}
            >
              {permissionsGranted.storage ? 'Permitido' : 'Permitir'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-orange-500" />
              <div>
                <p className="font-semibold text-gray-800">Notificações</p>
                <p className="text-sm text-gray-600">Para lembretes e acompanhamento</p>
              </div>
            </div>
            <button
              onClick={() => requestPermission('notifications')}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                permissionsGranted.notifications 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
              }`}
            >
              {permissionsGranted.notifications ? 'Permitido' : 'Permitir'}
            </button>
          </div>
        </div>

        <button
          onClick={handlePermissionsComplete}
          disabled={!Object.values(permissionsGranted).every(Boolean)}
          className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
            Object.values(permissionsGranted).every(Boolean)
              ? 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  )

  const DashboardScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="p-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Olá, Mamãe! 👋</h1>
            <p className="text-gray-600 text-lg">Como você está se sentindo hoje?</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <Baby className="w-7 h-7 text-pink-500" />
          </div>
        </div>

        {/* Progresso da Gravidez */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Progresso da Gravidez</h2>
            <button 
              onClick={() => setCurrentScreen('pregnancy-tracker')}
              className="text-pink-500 hover:text-pink-600"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span className="font-semibold">Semana {pregnancyWeek}</span>
                <span className="text-pink-500">{getTrimesteFromWeek(pregnancyWeek)}</span>
              </div>
              <div className="bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-rose-400 to-pink-500 h-4 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${(pregnancyWeek / 40) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-3xl font-bold text-pink-500">{pregnancyWeek}/40</div>
          </div>
        </div>

        {/* IA Personal Trainer */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-6 mb-6 shadow-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">IA Personal Trainer</h2>
                <p className="text-white/80">Treinos personalizados para você</p>
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-white/80" />
          </div>
          <button
            onClick={() => setCurrentScreen('ai-workout-generator')}
            className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300"
          >
            Gerar Novo Treino com IA
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Água hoje</p>
                <p className="text-lg font-bold text-gray-800">{waterIntake}/8 copos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Calorias</p>
                <p className="text-lg font-bold text-gray-800">{consumedCalories}/{dailyCalories}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Principal */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <button
            onClick={() => setCurrentScreen('workout')}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-4 border border-white/20 transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-4 rounded-2xl shadow-lg">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-800 text-lg">Treinos Personalizados</h3>
              <p className="text-gray-600">Exercícios seguros com IA adaptativa</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>

          <button
            onClick={() => setCurrentScreen('exercise-guide')}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-4 border border-white/20 transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-4 rounded-2xl shadow-lg">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-800 text-lg">Guia de Exercícios 3D</h3>
              <p className="text-gray-600">Animações e músculos ativados</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>

          <button
            onClick={() => setCurrentScreen('progress-photos')}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-4 border border-white/20 transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-2xl shadow-lg">
              <Camera className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-800 text-lg">Registro Fotográfico</h3>
              <p className="text-gray-600">Acompanhe sua evolução semanal</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>

          <button
            onClick={() => setCurrentScreen('nutrition')}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-4 border border-white/20 transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-2xl shadow-lg">
              <Utensils className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-800 text-lg">Nutrição Inteligente</h3>
              <p className="text-gray-600">IA calcula calorias por foto</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentScreen('reminders')}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-4 shadow-lg text-white transform hover:scale-105 transition-all duration-300"
          >
            <Bell className="w-6 h-6 mb-2" />
            <p className="font-semibold">Lembretes</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('music-player')}
            className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl p-4 shadow-lg text-white transform hover:scale-105 transition-all duration-300"
          >
            <Music className="w-6 h-6 mb-2" />
            <p className="font-semibold">Música</p>
          </button>
        </div>
      </div>
    </div>
  )

  const AIWorkoutGeneratorScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">IA Personal Trainer</h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center mb-6">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Treino Personalizado com IA</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Nossa inteligência artificial criará um treino específico para você, considerando:
          </p>
          
          <div className="grid grid-cols-1 gap-4 mb-8 text-left">
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span className="text-gray-700">Semana {pregnancyWeek} de gestação</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-xl">
              <Target className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700">Nível {userProfile.fitnessLevel}</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">Suas preferências de exercício</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
              <Heart className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Condições médicas atuais</span>
            </div>
          </div>
          
          <button
            onClick={() => simulateAIAnalysis('workout')}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Gerar Treino Personalizado
          </button>
        </div>

        {/* Treinos IA Anteriores */}
        {aiWorkouts.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
              Treinos IA Anteriores
            </h3>
            <div className="space-y-3">
              {aiWorkouts.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">{workout.title}</p>
                    <p className="text-sm text-gray-600">{workout.personalizedFor}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedWorkout(workout)
                      setCurrentScreen('workout-detail')
                    }}
                    className="text-purple-500 font-semibold text-sm"
                  >
                    Repetir
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const ExerciseGuideScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-6 pb-24">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Guia de Exercícios 3D</h1>
        </div>

        <div className="space-y-4">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{exercise.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <Timer className="w-4 h-4 mr-1" />
                      {exercise.duration}
                    </span>
                    {exercise.reps && (
                      <span className="flex items-center">
                        <RotateCcw className="w-4 h-4 mr-1" />
                        {exercise.reps}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{exercise.description}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-3 rounded-2xl">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Músculos Ativados */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Muscle className="w-4 h-4 text-red-500 mr-2" />
                  Músculos Ativados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exercise.muscleGroups.map((muscle, index) => (
                    <span key={index} className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedExercise(exercise)
                  setCurrentScreen('workout-3d')
                }}
                className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>Ver Animação 3D</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const Workout3DScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('exercise-guide')}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-white">{selectedExercise?.name}</h1>
          <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg text-white">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Simulação de Esqueleto 3D */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl mb-6 text-center">
          <div className="relative">
            <div className="w-48 h-64 mx-auto bg-gradient-to-b from-blue-400/20 to-purple-400/20 rounded-3xl flex items-center justify-center mb-4 border-2 border-blue-400/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-400/40 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="w-8 h-24 bg-blue-400/40 rounded-lg mx-auto mb-2 animate-pulse"></div>
                <div className="flex space-x-2 justify-center mb-2">
                  <div className="w-6 h-16 bg-red-400/40 rounded-lg animate-pulse"></div>
                  <div className="w-6 h-16 bg-red-400/40 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex space-x-2 justify-center">
                  <div className="w-4 h-20 bg-blue-400/40 rounded-lg animate-pulse"></div>
                  <div className="w-4 h-20 bg-blue-400/40 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-red-500/80 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
              MÚSCULOS ATIVOS
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Animação 3D</h2>
          <p className="text-blue-200 mb-4">Visualização em tempo real dos músculos ativados</p>
          
          <div className="flex justify-center space-x-4 mb-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ▶ Reproduzir
            </button>
            <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ⏸ Pausar
            </button>
            <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🔄 Repetir
            </button>
          </div>
        </div>

        {/* Informações do Exercício */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Instruções de Segurança</h3>
          <div className="space-y-3">
            {selectedExercise?.safetyTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-gray-700 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Modificações</h3>
          <div className="space-y-3">
            {selectedExercise?.modifications.map((mod, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700 text-sm">{mod}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const ProgressPhotosScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Registro Fotográfico</h1>
          </div>
          <button
            onClick={() => setCurrentScreen('photo-timeline')}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            Ver Timeline
          </button>
        </div>

        {/* Adicionar Nova Foto */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center mb-6">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Foto da Semana {pregnancyWeek}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Registre seu progresso semanal e acompanhe sua jornada de transformação durante a gestação.
          </p>
          
          <input
            type="file"
            ref={photoInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                handleProgressPhotoSave(file)
                setCurrentScreen('photo-timeline')
              }
            }}
          />
          
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleProgressPhotoUpload}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Tirar Foto</span>
            </button>
            
            <button
              onClick={handleProgressPhotoUpload}
              className="w-full bg-white border-2 border-purple-300 text-purple-600 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Escolher da Galeria</span>
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 text-center">
            <div className="bg-purple-100 p-3 rounded-xl mb-3 inline-block">
              <Camera className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{progressPhotos.length}</p>
            <p className="text-sm text-gray-600">Fotos registradas</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 text-center">
            <div className="bg-pink-100 p-3 rounded-xl mb-3 inline-block">
              <TrendingUp className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-2xl font-bold text-gray-800">+6.5kg</p>
            <p className="text-sm text-gray-600">Ganho de peso</p>
          </div>
        </div>

        {/* Últimas Fotos */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
          <h3 className="font-semibold text-gray-800 mb-4">Últimas Fotos</h3>
          <div className="grid grid-cols-2 gap-4">
            {progressPhotos.slice(0, 4).map((photo) => (
              <div key={photo.id} className="relative">
                <img
                  src={photo.imageUrl}
                  alt={`Semana ${photo.week}`}
                  className="w-full h-32 object-cover rounded-2xl"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Semana {photo.week}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const PhotoTimelineScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="p-6 pb-24">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('progress-photos')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Timeline de Evolução</h1>
        </div>

        <div className="space-y-6">
          {progressPhotos.map((photo, index) => (
            <div key={photo.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Semana {photo.week}</h3>
                  <p className="text-sm text-gray-600">{new Date(photo.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-purple-500">{photo.weight}kg</p>
                  <p className="text-xs text-gray-500">
                    {index > 0 && progressPhotos[index - 1].weight 
                      ? `+${(photo.weight! - progressPhotos[index - 1].weight!).toFixed(1)}kg`
                      : 'Primeira foto'
                    }
                  </p>
                </div>
              </div>
              
              <img
                src={photo.imageUrl}
                alt={`Progresso semana ${photo.week}`}
                className="w-full h-64 object-cover rounded-2xl mb-4"
              />
              
              {photo.notes && (
                <div className="bg-purple-50 rounded-2xl p-4">
                  <p className="text-gray-700 text-sm">{photo.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <button className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                    <Share2 className="w-4 h-4 inline mr-1" />
                    Compartilhar
                  </button>
                  <button className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                    <Download className="w-4 h-4 inline mr-1" />
                    Salvar
                  </button>
                </div>
                <span className="text-xs text-gray-500">{getTrimesteFromWeek(photo.week)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-6 shadow-xl text-white text-center mt-6">
          <Trophy className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Parabéns pela Jornada!</h3>
          <p className="text-white/90">
            Você está documentando um momento único e especial da sua vida. Continue assim!
          </p>
        </div>
      </div>
    </div>
  )

  const WorkoutScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Treinos</h1>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <Dumbbell className="w-7 h-7 text-emerald-500" />
          </div>
        </div>

        {/* IA Quick Access */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-4 mb-6 shadow-xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6" />
              <div>
                <p className="font-semibold">IA Personal Trainer</p>
                <p className="text-xs text-white/80">Gere treinos personalizados</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen('ai-workout-generator')}
              className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold"
            >
              Gerar
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex space-x-3 mb-6 overflow-x-auto">
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
            Todos
          </button>
          <button className="bg-white/80 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
            1º Trimestre
          </button>
          <button className="bg-white/80 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
            2º Trimestre
          </button>
          <button className="bg-white/80 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
            3º Trimestre
          </button>
          <button className="bg-white/80 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
            Pós-parto
          </button>
        </div>

        <div className="space-y-4">
          {[...aiWorkouts, ...workouts].map((workout) => (
            <div key={workout.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">{workout.title}</h3>
                    {workout.aiGenerated && (
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" />
                        IA
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      workout.type === 'casa' ? 'bg-blue-100 text-blue-600' :
                      workout.type === 'ar-livre' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {workout.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{workout.trimester}</p>
                  <p className="text-sm text-gray-500">{workout.difficulty}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    {workout.duration}
                  </div>
                  {completedWorkouts.includes(workout.id) && (
                    <div className="flex items-center text-emerald-500 text-sm">
                      <Check className="w-4 h-4 mr-1" />
                      Concluído
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{workout.description}</p>
              <button
                onClick={() => {
                  setSelectedWorkout(workout)
                  setCurrentScreen('workout-detail')
                }}
                className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Iniciar Treino
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const WorkoutDetailScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('workout')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{selectedWorkout?.title}</h1>
          {selectedWorkout?.aiGenerated && (
            <span className="ml-2 bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              IA
            </span>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6 border border-white/20">
          <img
            src={selectedWorkout?.videoUrl}
            alt="Exercício"
            className="w-full h-48 object-cover rounded-2xl mb-4"
          />
          
          {/* Music Player Integration */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-full">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{currentSong}</p>
                  <p className="text-gray-600 text-xs">Playlist Relaxante</p>
                </div>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white p-2 rounded-full shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-gray-600" /> : <Play className="w-4 h-4 text-gray-600" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <button className="bg-gradient-to-r from-emerald-400 to-teal-500 p-6 rounded-full shadow-xl">
              <Play className="w-10 h-10 text-white" />
            </button>
          </div>
          
          <p className="text-gray-600 text-center mb-6 leading-relaxed">{selectedWorkout?.description}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="bg-emerald-100 p-3 rounded-xl mb-2">
                <Clock className="w-6 h-6 text-emerald-600 mx-auto" />
              </div>
              <p className="text-sm text-gray-600">Duração</p>
              <p className="font-semibold text-gray-800">{selectedWorkout?.duration}</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-xl mb-2">
                <Target className="w-6 h-6 text-blue-600 mx-auto" />
              </div>
              <p className="text-sm text-gray-600">Nível</p>
              <p className="font-semibold text-gray-800 capitalize">{selectedWorkout?.difficulty}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-xl mb-2">
                <Home className="w-6 h-6 text-purple-600 mx-auto" />
              </div>
              <p className="text-sm text-gray-600">Local</p>
              <p className="font-semibold text-gray-800 capitalize">{selectedWorkout?.type}</p>
            </div>
          </div>

          {/* Lista de Exercícios */}
          {selectedWorkout?.exercises && selectedWorkout.exercises.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Exercícios do Treino</h3>
              <div className="space-y-3">
                {selectedWorkout.exercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{exercise.name}</p>
                      <p className="text-sm text-gray-600">{exercise.duration} • {exercise.reps}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedExercise(exercise)
                        setCurrentScreen('workout-3d')
                      }}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      Ver 3D
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={() => selectedWorkout && handleWorkoutComplete(selectedWorkout.id)}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Concluir Treino
          </button>
        </div>
      </div>
    </div>
  )

  const NutritionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Nutrição</h1>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <Utensils className="w-7 h-7 text-orange-500" />
          </div>
        </div>

        {/* Progresso Calórico */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-xl border border-white/20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Progresso Diário</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Calorias consumidas</span>
            <span className="font-bold text-gray-800">{consumedCalories} / {dailyCalories} kcal</span>
          </div>
          <div className="bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(consumedCalories / dailyCalories) * 100}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Proteína</p>
              <p className="font-bold text-orange-500">71g</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Carboidratos</p>
              <p className="font-bold text-orange-500">100g</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gordura</p>
              <p className="font-bold text-orange-500">38g</p>
            </div>
          </div>
        </div>

        {/* IA Features */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setCurrentScreen('photo-nutrition')}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-4 shadow-lg text-white transform hover:scale-105 transition-all duration-300"
          >
            <Camera className="w-6 h-6 mb-2" />
            <p className="font-semibold text-sm">Foto do Prato</p>
            <p className="text-xs opacity-90">IA calcula calorias</p>
          </button>
          
          <button
            onClick={() => setCurrentScreen('barcode-scanner')}
            className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl p-4 shadow-lg text-white transform hover:scale-105 transition-all duration-300"
          >
            <Barcode className="w-6 h-6 mb-2" />
            <p className="font-semibold text-sm">Código de Barras</p>
            <p className="text-xs opacity-90">Dados nutricionais</p>
          </button>
        </div>

        <div className="space-y-4">
          {nutrition.map((meal) => (
            <div key={meal.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">{meal.title}</h3>
                  <p className="text-sm text-orange-500 font-semibold">{meal.meal}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{meal.calories} kcal</p>
                  <div className="flex space-x-2 text-xs text-gray-600 mt-1">
                    <span>P: {meal.macros.protein}g</span>
                    <span>C: {meal.macros.carbs}g</span>
                    <span>G: {meal.macros.fat}g</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedNutrition(meal)
                  setCurrentScreen('nutrition-detail')
                }}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Ver Receita
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const PhotoNutritionScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('nutrition')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Análise por Foto</h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tire uma foto do seu prato</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Nossa IA analisará a imagem e calculará automaticamente as calorias e macronutrientes da sua refeição.
          </p>
          
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={() => simulateAIAnalysis('photo')}
          />
          
          <button
            onClick={handlePhotoUpload}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 mb-4"
          >
            Abrir Câmera
          </button>
          
          <button
            onClick={handlePhotoUpload}
            className="w-full bg-white border-2 border-purple-300 text-purple-600 py-4 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300"
          >
            Escolher da Galeria
          </button>
        </div>
      </div>
    </div>
  )

  const BarcodeScannerScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('nutrition')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Scanner de Código</h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center">
          <div className="bg-gradient-to-r from-indigo-400 to-purple-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Barcode className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Escaneie o código de barras</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Aponte a câmera para o código de barras do produto e obtenha informações nutricionais completas instantaneamente.
          </p>
          
          <div className="bg-gray-100 rounded-2xl p-8 mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
              <Barcode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Posicione o código de barras aqui</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              alert("Produto encontrado!\n\nBiscoito Integral\n- 120 kcal por porção\n- Proteína: 3g\n- Carboidratos: 18g\n- Gordura: 4g")
              setCurrentScreen('nutrition')
            }}
            className="w-full bg-gradient-to-r from-indigo-400 to-purple-400 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Iniciar Scanner
          </button>
        </div>
      </div>
    </div>
  )

  const PregnancyTrackerScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="p-6 pb-24">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Acompanhamento</h1>
        </div>

        {/* Semana Atual */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-xl border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-pink-500 mb-2">Semana {pregnancyData.week}</h2>
            <p className="text-gray-600">{pregnancyData.babySize}</p>
            <p className="text-lg font-semibold text-gray-800">{pregnancyData.babyWeight}</p>
          </div>
          
          <div className="bg-pink-50 rounded-2xl p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Desenvolvimento do Bebê</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{pregnancyData.development}</p>
          </div>
        </div>

        {/* Sintomas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-xl border border-white/20">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 text-pink-500 mr-2" />
            Sintomas Comuns
          </h3>
          <div className="space-y-2">
            {pregnancyData.symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <p className="text-gray-600">{symptom}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-xl border border-white/20">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
            Dicas da Semana
          </h3>
          <div className="space-y-2">
            {pregnancyData.tips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <p className="text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Registro de Dados */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl p-4 shadow-lg text-white transform hover:scale-105 transition-all duration-300">
            <Weight className="w-6 h-6 mb-2" />
            <p className="font-semibold text-sm">Registrar Peso</p>
          </button>
          
          <button 
            onClick={() => simulateAIAnalysis('exam')}
            className="bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl p-4 shadow-lg text-white transform hover:scale-105 transition-all duration-300"
          >
            <FileText className="w-6 h-6 mb-2" />
            <p className="font-semibold text-sm">Upload Exame</p>
          </button>
        </div>
      </div>
    </div>
  )

  const RemindersScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Lembretes</h1>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <Bell className="w-7 h-7 text-purple-500" />
          </div>
        </div>

        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl ${
                    reminder.type === 'water' ? 'bg-blue-100' :
                    reminder.type === 'medicine' ? 'bg-green-100' :
                    reminder.type === 'appointment' ? 'bg-red-100' :
                    'bg-purple-100'
                  }`}>
                    {reminder.type === 'water' && <Droplets className="w-6 h-6 text-blue-500" />}
                    {reminder.type === 'medicine' && <Plus className="w-6 h-6 text-green-500" />}
                    {reminder.type === 'appointment' && <Calendar className="w-6 h-6 text-red-500" />}
                    {reminder.type === 'selfcare' && <Sparkles className="w-6 h-6 text-purple-500" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{reminder.title}</h3>
                    <p className="text-sm text-gray-600">{reminder.time}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  reminder.active ? 'bg-purple-500 border-purple-500' : 'border-gray-300'
                }`}>
                  {reminder.active && <Check className="w-4 h-4 text-white m-0.5" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="fixed bottom-24 right-6 bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-full shadow-xl">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )

  const MusicPlayerScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="p-6 pb-24">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Música para Treinar</h1>
        </div>

        {/* Player Principal */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Music className="w-16 h-16 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentSong}</h2>
          <p className="text-gray-600 mb-6">Playlist Relaxante para Gestantes</p>
          
          <div className="flex items-center justify-center space-x-6 mb-6">
            <button className="bg-gray-100 p-3 rounded-full">
              <SkipBack className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-gradient-to-r from-indigo-400 to-purple-400 p-4 rounded-full shadow-lg"
            >
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
            </button>
            <button className="bg-gray-100 p-3 rounded-full">
              <SkipForward className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <div className="bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full w-1/3"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>1:23</span>
            <span>4:15</span>
          </div>
        </div>

        {/* Playlists */}
        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <h3 className="font-semibold text-gray-800 mb-2">🧘‍♀️ Relaxamento e Yoga</h3>
            <p className="text-sm text-gray-600">15 músicas • 1h 2min</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <h3 className="font-semibold text-gray-800 mb-2">🚶‍♀️ Caminhada Energizante</h3>
            <p className="text-sm text-gray-600">20 músicas • 1h 15min</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <h3 className="font-semibold text-gray-800 mb-2">👶 Sons para o Bebê</h3>
            <p className="text-sm text-gray-600">12 músicas • 45min</p>
          </div>
        </div>
      </div>
    </div>
  )

  const AgendaScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Agenda</h1>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <Calendar className="w-7 h-7 text-blue-500" />
          </div>
        </div>

        {/* Próximas Consultas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-xl border border-white/20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Próximas Consultas</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl">
              <div className="bg-blue-500 p-3 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Dr. Ana Silva - Obstetra</h3>
                <p className="text-sm text-gray-600">Amanhã, 14:00</p>
              </div>
              <button className="text-blue-500 font-semibold">Lembrar</button>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl">
              <div className="bg-green-500 p-3 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Ultrassom Morfológico</h3>
                <p className="text-sm text-gray-600">Sexta-feira, 10:30</p>
              </div>
              <button className="text-green-500 font-semibold">Lembrar</button>
            </div>
          </div>
        </div>

        {/* Exames e Análise IA */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-xl border border-white/20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Análise de Exames com IA</h2>
          <p className="text-gray-600 mb-4">Faça upload dos seus exames e receba análises inteligentes</p>
          
          <button
            onClick={() => simulateAIAnalysis('exam')}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Upload de Exame</span>
          </button>
        </div>

        {/* Conexão Bluetooth */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dispositivos Conectados</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Bluetooth className="w-5 h-5 text-blue-500" />
                <span className="text-gray-800">Balança Inteligente</span>
              </div>
              <span className="text-green-500 text-sm font-semibold">Conectado</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-purple-500" />
                <span className="text-gray-800">Monitor Cardíaco</span>
              </div>
              <span className="text-gray-500 text-sm">Desconectado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const AIAnalysisScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center max-w-md mx-4">
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Zap className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">IA Analisando...</h2>
        <p className="text-gray-600 mb-6">
          Nossa inteligência artificial está processando suas informações para gerar recomendações personalizadas.
        </p>
        
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full animate-pulse w-3/4"></div>
        </div>
        
        <p className="text-sm text-gray-500">Isso pode levar alguns segundos...</p>
      </div>
    </div>
  )

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Perfil</h1>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <User className="w-7 h-7 text-purple-500" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6 border border-white/20">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{userProfile.name}</h2>
              <p className="text-gray-600">Semana {pregnancyWeek} de gestação</p>
              <p className="text-sm text-purple-500 font-semibold">{getTrimesteFromWeek(pregnancyWeek)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-50 rounded-2xl">
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="font-bold text-gray-800">{completedWorkouts.length}</p>
              <p className="text-sm text-gray-600">Treinos concluídos</p>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-2xl">
              <Target className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <p className="font-bold text-gray-800">85%</p>
              <p className="text-sm text-gray-600">Meta semanal</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Data prevista do parto</span>
              <span className="font-semibold text-gray-800">{new Date(userProfile.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Peso atual</span>
              <span className="font-semibold text-gray-800">{userProfile.currentWeight} kg</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Altura</span>
              <span className="font-semibold text-gray-800">{userProfile.height} cm</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Nível fitness</span>
              <span className="font-semibold text-gray-800 capitalize">{userProfile.fitnessLevel}</span>
            </div>
          </div>
        </div>

        {/* Configurações */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6 border border-white/20">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Settings className="w-5 h-5 text-gray-600 mr-2" />
            Configurações
          </h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <span className="text-gray-700">Notificações</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <span className="text-gray-700">Privacidade</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <span className="text-gray-700">Sobre o Mamãe Fit</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setIsLoggedIn(false)
            setCurrentScreen('login')
          }}
          className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Sair
        </button>
      </div>
    </div>
  )

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 px-6 py-4">
      <div className="flex justify-around">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === 'dashboard' ? 'text-pink-500' : 'text-gray-400'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button
          onClick={() => setCurrentScreen('workout')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === 'workout' || currentScreen === 'workout-detail' ? 'text-emerald-500' : 'text-gray-400'
          }`}
        >
          <Dumbbell className="w-6 h-6" />
          <span className="text-xs font-semibold">Treino</span>
        </button>
        <button
          onClick={() => setCurrentScreen('nutrition')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === 'nutrition' || currentScreen === 'nutrition-detail' || 
            currentScreen === 'photo-nutrition' || currentScreen === 'barcode-scanner' ? 'text-orange-500' : 'text-gray-400'
          }`}
        >
          <Utensils className="w-6 h-6" />
          <span className="text-xs font-semibold">Nutrição</span>
        </button>
        <button
          onClick={() => setCurrentScreen('agenda')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === 'agenda' ? 'text-blue-500' : 'text-gray-400'
          }`}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs font-semibold">Agenda</span>
        </button>
        <button
          onClick={() => setCurrentScreen('profile')}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === 'profile' ? 'text-purple-500' : 'text-gray-400'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-semibold">Perfil</span>
        </button>
      </div>
    </div>
  )

  const renderScreen = () => {
    if (!isLoggedIn) return <LoginScreen />
    
    switch (currentScreen) {
      case 'permissions':
        return <PermissionsScreen />
      case 'dashboard':
        return <DashboardScreen />
      case 'ai-workout-generator':
        return <AIWorkoutGeneratorScreen />
      case 'exercise-guide':
        return <ExerciseGuideScreen />
      case 'workout-3d':
        return <Workout3DScreen />
      case 'progress-photos':
        return <ProgressPhotosScreen />
      case 'photo-timeline':
        return <PhotoTimelineScreen />
      case 'workout':
        return <WorkoutScreen />
      case 'workout-detail':
        return <WorkoutDetailScreen />
      case 'nutrition':
        return <NutritionScreen />
      case 'nutrition-detail':
        return <NutritionDetailScreen />
      case 'photo-nutrition':
        return <PhotoNutritionScreen />
      case 'barcode-scanner':
        return <BarcodeScannerScreen />
      case 'content':
        return <ContentScreen />
      case 'content-detail':
        return <ContentDetailScreen />
      case 'pregnancy-tracker':
        return <PregnancyTrackerScreen />
      case 'reminders':
        return <RemindersScreen />
      case 'music-player':
        return <MusicPlayerScreen />
      case 'agenda':
        return <AgendaScreen />
      case 'ai-analysis':
        return <AIAnalysisScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <DashboardScreen />
    }
  }

  // Componentes auxiliares
  const Pause = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
    </svg>
  )

  const NutritionDetailScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('nutrition')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{selectedNutrition?.title}</h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6 border border-white/20">
          <div className="grid grid-cols-4 gap-4 mb-6 text-center">
            <div>
              <p className="text-2xl font-bold text-orange-500">{selectedNutrition?.calories}</p>
              <p className="text-xs text-gray-600">kcal</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500">{selectedNutrition?.macros.protein}g</p>
              <p className="text-xs text-gray-600">Proteína</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{selectedNutrition?.macros.carbs}g</p>
              <p className="text-xs text-gray-600">Carboidratos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">{selectedNutrition?.macros.fat}g</p>
              <p className="text-xs text-gray-600">Gordura</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Ingredientes:</h3>
            <ul className="space-y-2">
              {selectedNutrition?.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Modo de Preparo:</h3>
            <p className="text-gray-600 leading-relaxed">{selectedNutrition?.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const ContentScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Conteúdo</h1>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <BookOpen className="w-7 h-7 text-blue-500" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <h3 className="font-bold text-gray-800 text-lg mb-2">Cuidados no 1º Trimestre</h3>
            <p className="text-sm text-blue-500 mb-2">Saúde • 5 min</p>
            <p className="text-gray-600 text-sm mb-4">Dicas essenciais para os primeiros meses de gestação</p>
            <button className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Ler Artigo
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <h3 className="font-bold text-gray-800 text-lg mb-2">Exercícios Seguros na Gravidez</h3>
            <p className="text-sm text-green-500 mb-2">Fitness • 7 min</p>
            <p className="text-gray-600 text-sm mb-4">Como manter-se ativa de forma segura durante a gestação</p>
            <button className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Ler Artigo
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
            <h3 className="font-bold text-gray-800 text-lg mb-2">Preparação para o Parto</h3>
            <p className="text-sm text-purple-500 mb-2">Parto • 10 min</p>
            <p className="text-gray-600 text-sm mb-4">Tudo que você precisa saber para se preparar</p>
            <button className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Ler Artigo
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const ContentDetailScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('content')}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Cuidados no 1º Trimestre</h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
              Saúde
            </span>
            <span className="text-gray-500 text-sm">5 min de leitura</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            O primeiro trimestre é crucial para o desenvolvimento do bebê. É importante manter uma alimentação balanceada, 
            tomar ácido fólico e evitar exercícios muito intensos. Consulte sempre seu médico antes de iniciar qualquer 
            atividade física. Durante este período, é normal sentir enjoos matinais e fadiga. Mantenha-se hidratada e 
            descanse sempre que possível.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      {renderScreen()}
      {isLoggedIn && !['permissions', 'workout-detail', 'nutrition-detail', 'content-detail', 'photo-nutrition', 'barcode-scanner', 'ai-analysis', 'music-player', 'pregnancy-tracker', 'ai-workout-generator', 'exercise-guide', 'workout-3d', 'progress-photos', 'photo-timeline'].includes(currentScreen) && (
        <BottomNavigation />
      )}
    </div>
  )
}