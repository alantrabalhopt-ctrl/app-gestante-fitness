import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, type, mood } = await request.json()

    // Simular resposta da IA psicóloga (em produção, usar OpenAI API)
    let aiResponse = ""
    
    if (type === 'psychologist') {
      const responses = {
        happy: [
          "Que maravilha saber que você está se sentindo bem! É importante celebrar esses momentos positivos durante a gestação. Como posso ajudar a manter esse bem-estar?",
          "Fico muito feliz em saber que você está bem! Essa energia positiva faz muito bem para você e seu bebê. Que tal aproveitarmos para planejar algumas atividades que mantenham esse ânimo?",
          "É ótimo ver você radiante! Durante a gravidez, esses momentos de alegria são preciosos. Vamos conversar sobre como manter essa positividade?"
        ],
        sad: [
          "Entendo como você está se sentindo, e quero que saiba que é completamente normal ter dias mais difíceis durante a gestação. Suas emoções são válidas e importantes. Vamos conversar sobre o que está te deixando triste?",
          "Sinto muito que você esteja passando por um momento difícil. A gestação traz muitas mudanças emocionais, e é normal se sentir assim às vezes. Estou aqui para te apoiar. Quer me contar mais sobre o que está acontecendo?",
          "Obrigada por compartilhar seus sentimentos comigo. É corajoso reconhecer quando não estamos bem. Durante a gravidez, é comum ter altos e baixos emocionais. Como posso te ajudar hoje?"
        ],
        neutral: [
          "Entendo que você está se sentindo normal hoje. Às vezes, ter um dia tranquilo também é importante durante a gestação. Como tem sido sua rotina ultimamente?",
          "Dias normais também são valiosos! Durante a gravidez, é bom ter momentos de estabilidade emocional. Há algo específico que gostaria de conversar hoje?",
          "Que bom que você está se sentindo equilibrada hoje. Como posso te apoiar para manter esse bem-estar durante sua gestação?"
        ]
      }
      
      const moodResponses = responses[mood as keyof typeof responses] || responses.neutral
      aiResponse = moodResponses[Math.floor(Math.random() * moodResponses.length)]
    } else if (type === 'medical') {
      aiResponse = "Com base nos sintomas que você descreveu, recomendo que você procure seu médico para uma avaliação mais detalhada. Enquanto isso, mantenha-se hidratada e descanse. ⚠️ Lembre-se: esta é apenas uma orientação inicial, sempre consulte um profissional de saúde."
    } else if (type === 'recipe') {
      aiResponse = "Ótima escolha de ingredientes! Vou criar uma receita nutritiva e econômica para você. Que tal um refogado colorido com esses ingredientes? Rico em vitaminas essenciais para você e seu bebê!"
    }

    const aiMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date().toISOString(),
      type
    }

    return NextResponse.json({ message: aiMessage })
  } catch (error) {
    console.error('Erro ao gerar resposta da IA:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}