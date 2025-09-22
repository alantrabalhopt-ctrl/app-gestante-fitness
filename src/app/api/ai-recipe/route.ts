import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { ingredients, userProfile } = await request.json()

    // Simular geração de receita com IA (em produção, usar OpenAI API)
    const recipeTemplates = [
      {
        title: `Refogado Nutritivo com ${ingredients.slice(0, 2).join(' e ')}`,
        instructions: `Receita econômica e saudável criada pela IA usando os ingredientes disponíveis: ${ingredients.join(', ')}. Prepare refogando os vegetais, tempere com ervas naturais e sirva quente. Rica em nutrientes essenciais para gestantes.`,
        calories: 280,
        macros: { protein: 15, carbs: 35, fat: 8 },
        prepTime: '15 min'
      },
      {
        title: `Salada Completa com ${ingredients.slice(0, 2).join(' e ')}`,
        instructions: `Combine todos os ingredientes frescos: ${ingredients.join(', ')}. Tempere com azeite, limão e ervas. Uma refeição leve e nutritiva, perfeita para gestantes que buscam uma alimentação saudável.`,
        calories: 220,
        macros: { protein: 12, carbs: 25, fat: 10 },
        prepTime: '10 min'
      },
      {
        title: `Sopa Reconfortante com ${ingredients.slice(0, 2).join(' e ')}`,
        instructions: `Cozinhe os ingredientes em água ou caldo: ${ingredients.join(', ')}. Tempere a gosto e deixe cozinhar até ficar macio. Uma opção quente e nutritiva, ideal para o bem-estar durante a gestação.`,
        calories: 180,
        macros: { protein: 8, carbs: 28, fat: 5 },
        prepTime: '20 min'
      }
    ]

    // Selecionar template aleatório
    const selectedTemplate = recipeTemplates[Math.floor(Math.random() * recipeTemplates.length)]

    const newRecipe = {
      id: Date.now(),
      meal: "Refeição IA",
      title: selectedTemplate.title,
      ingredients: ingredients,
      instructions: selectedTemplate.instructions,
      calories: selectedTemplate.calories,
      macros: selectedTemplate.macros,
      budget: 'baixo',
      prepTime: selectedTemplate.prepTime,
      aiGenerated: true
    }

    return NextResponse.json({ recipe: newRecipe })
  } catch (error) {
    console.error('Erro ao gerar receita:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}