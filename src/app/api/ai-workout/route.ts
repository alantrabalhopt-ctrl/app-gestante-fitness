import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userProfile, pregnancyWeek, fitnessLevel } = await request.json()

    // Simular geração de treino com IA (em produção, usar OpenAI API)
    const workoutTypes = [
      {
        type: 'gestante-iniciante',
        title: 'Treino Suave para Iniciantes',
        description: 'Exercícios básicos e seguros para gestantes que estão começando',
        difficulty: 'fácil' as const,
        duration: '15 min',
        exercises: [
          {
            id: Date.now() + 1,
            name: "Caminhada no Local",
            duration: "5 minutos",
            reps: "Ritmo leve",
            description: "Aquecimento cardiovascular suave",
            muscleGroups: ["Cardiovascular", "Pernas"],
            safetyTips: ["Mantenha ritmo confortável", "Pare se sentir cansaço"],
            modifications: ["Reduza o tempo se necessário"],
            totalTime: 300,
            isActive: false,
            targetMuscles: ["cardiovascular"],
            intensity: 'baixa' as const
          },
          {
            id: Date.now() + 2,
            name: "Alongamento de Braços",
            duration: "3 séries",
            reps: "10 repetições",
            description: "Alongamento suave para ombros e braços",
            muscleGroups: ["Ombros", "Braços"],
            safetyTips: ["Movimento lento e controlado", "Não force"],
            modifications: ["Faça sentada se preferir"],
            totalTime: 180,
            isActive: false,
            targetMuscles: ["ombros"],
            intensity: 'baixa' as const
          }
        ]
      },
      {
        type: 'gestante-intermediaria',
        title: 'Treino Equilibrado para Gestantes',
        description: 'Combinação de fortalecimento e flexibilidade para gestantes ativas',
        difficulty: 'moderado' as const,
        duration: '25 min',
        exercises: [
          {
            id: Date.now() + 3,
            name: "Agachamento com Apoio",
            duration: "3 séries",
            reps: "12 repetições",
            description: "Fortalecimento de glúteos e pernas com segurança",
            muscleGroups: ["Glúteos", "Quadríceps"],
            safetyTips: ["Use cadeira para apoio", "Não desça muito"],
            modifications: ["Reduza amplitude se necessário"],
            totalTime: 240,
            isActive: false,
            targetMuscles: ["glúteos", "quadríceps"],
            intensity: 'moderada' as const
          },
          {
            id: Date.now() + 4,
            name: "Prancha Modificada",
            duration: "3 séries",
            reps: "20 segundos",
            description: "Fortalecimento do core adaptado para gestantes",
            muscleGroups: ["Core", "Ombros"],
            safetyTips: ["Apoie joelhos se necessário", "Respire normalmente"],
            modifications: ["Faça contra parede se preferir"],
            totalTime: 180,
            isActive: false,
            targetMuscles: ["core"],
            intensity: 'moderada' as const
          }
        ]
      }
    ]

    // Selecionar tipo baseado no perfil
    let selectedType = workoutTypes[0] // padrão
    
    if (fitnessLevel === 'iniciante') {
      selectedType = workoutTypes.find(w => w.type === 'gestante-iniciante') || workoutTypes[0]
    } else {
      selectedType = workoutTypes.find(w => w.type === 'gestante-intermediaria') || workoutTypes[0]
    }

    const getTrimesteFromWeek = (week: number) => {
      if (week <= 12) return "1º Trimestre"
      if (week <= 28) return "2º Trimestre"
      return "3º Trimestre"
    }

    const newWorkout = {
      id: Date.now(),
      title: selectedType.title,
      trimester: getTrimesteFromWeek(pregnancyWeek),
      duration: selectedType.duration,
      description: `${selectedType.description} Gerado especificamente para seu perfil: ${fitnessLevel}, semana ${pregnancyWeek}.`,
      videoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      type: "casa",
      difficulty: selectedType.difficulty,
      exercises: selectedType.exercises,
      aiGenerated: true,
      personalizedFor: `${fitnessLevel} - Semana ${pregnancyWeek}`,
      mode: 'normal',
      personalizedType: selectedType.type
    }

    return NextResponse.json({ workout: newWorkout })
  } catch (error) {
    console.error('Erro ao gerar treino:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}