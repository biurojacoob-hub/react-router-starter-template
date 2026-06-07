import { buildSafetySystemPrompt } from "../safety"
import type { AgeGroup, ChildLearningProfile, Difficulty } from "../types"

export function lessonSystemPrompt(ageGroup: AgeGroup): string {
  return `${buildSafetySystemPrompt(ageGroup)}

Jesteś twórcą angażujących lekcji finansowych dla dzieci.
Twoje lekcje używają historii, analogii i interaktywnych przykładów.
Każda lekcja musi mieć praktyczne ćwiczenie lub zadanie do przemyślenia.`
}

export function lessonUserPrompt(
  topic: string,
  ageGroup: AgeGroup,
  difficulty: Difficulty,
  profile?: Partial<ChildLearningProfile>
): string {
  const contextParts = []
  if (profile?.strongTopics?.length) {
    contextParts.push(`Dziecko dobrze zna: ${profile.strongTopics.join(", ")}`)
  }
  if (profile?.weakTopics?.length) {
    contextParts.push(`Dziecko ma trudności z: ${profile.weakTopics.join(", ")}`)
  }
  if (profile?.interests?.length) {
    contextParts.push(`Zainteresowania dziecka: ${profile.interests.join(", ")}`)
  }

  return `
Stwórz lekcję finansową dla grupy wiekowej ${ageGroup} (${ageGroupLabel(ageGroup)}) na temat: "${topic}".
Poziom trudności: ${difficulty}.
${contextParts.length ? "\nKontekst ucznia:\n" + contextParts.join("\n") : ""}

Odpowiedź jako JSON z następującą strukturą:
{
  "title": "Tytuł lekcji",
  "description": "Krótki opis (1-2 zdania)",
  "contentBlocks": [
    { "type": "TEXT", "content": { "markdown": "tekst..." } },
    { "type": "TIP", "content": { "text": "wskazówka...", "variant": "info" } },
    { "type": "CHALLENGE", "content": { "prompt": "wyzwanie...", "hint": "podpowiedź..." } },
    { "type": "SUMMARY", "content": { "points": ["punkt 1", "punkt 2"] } }
  ],
  "metadata": {
    "ageGroup": "${ageGroup}",
    "difficulty": "${difficulty}",
    "xpReward": 10,
    "estimatedMinutes": 10,
    "topics": ["temat1"],
    "keywords": ["słowo1"]
  }
}

Uwzględnij 4-7 bloków treści. Zacznij od krótkiego wstępu (TEXT), dodaj wskazówkę (TIP), wyzwanie (CHALLENGE) i podsumowanie (SUMMARY).
`.trim()
}

export function quizSystemPrompt(ageGroup: AgeGroup): string {
  return `${buildSafetySystemPrompt(ageGroup)}

Jesteś twórcą angażujących quizów edukacyjnych dla dzieci.
Pytania muszą testować zrozumienie, nie tylko pamięć.
Każde pytanie powinno mieć jasne wyjaśnienie poprawnej odpowiedzi.`
}

export function quizUserPrompt(
  lessonTitle: string,
  lessonContent: string,
  ageGroup: AgeGroup,
  difficulty: Difficulty
): string {
  return `
Na podstawie lekcji "${lessonTitle}" dla grupy ${ageGroup} (${ageGroupLabel(ageGroup)}), stwórz quiz z 5 pytaniami.
Poziom trudności: ${difficulty}.

Streszczenie lekcji:
${lessonContent.slice(0, 1500)}

Odpowiedź jako JSON:
{
  "title": "Tytuł quizu",
  "questions": [
    {
      "question": "Pytanie?",
      "type": "SINGLE_CHOICE",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "explanation": "Wyjaśnienie dlaczego A jest poprawna",
      "difficulty": "${difficulty}"
    }
  ],
  "metadata": {
    "ageGroup": "${ageGroup}",
    "difficulty": "${difficulty}",
    "xpReward": 20,
    "topics": ["temat"],
    "passingScore": 60
  }
}

Mix typów: 3x SINGLE_CHOICE, 1x MULTI_SELECT (correctAnswer to tablica), 1x TRUE_FALSE (opcje: ["Prawda", "Fałsz"]).
`.trim()
}

export function missionSystemPrompt(ageGroup: AgeGroup): string {
  return `${buildSafetySystemPrompt(ageGroup)}

Jesteś twórcą angażujących misji edukacyjnych — praktycznych zadań, które dzieci wykonują w prawdziwym życiu.
Misje łączą naukę z działaniem. Każda misja powinna być osiągalna i motywująca.`
}

export function missionUserPrompt(profile: ChildLearningProfile): string {
  return `
Stwórz misję finansową dla dziecka z profilem:
- Wiek: ${ageGroupLabel(profile.ageGroup)}
- Poziom: ${profile.level} (${profile.xp} XP)
- Seria: ${profile.streakDays} dni
- Słabe tematy: ${profile.weakTopics.length ? profile.weakTopics.join(", ") : "brak danych"}
- Zainteresowania: ${profile.interests.length ? profile.interests.join(", ") : "ogólne"}
- Ostatnie tematy: ${profile.recentTopics.join(", ")}

Odpowiedź jako JSON:
{
  "id": "mission_${Date.now()}",
  "title": "Nazwa misji",
  "description": "Opis misji (2-3 zdania)",
  "tasks": [
    { "id": "t1", "instruction": "Zadanie 1", "hint": "Podpowiedź", "type": "REFLECTION" },
    { "id": "t2", "instruction": "Zadanie 2", "type": "PRACTICE" },
    { "id": "t3", "instruction": "Zadanie 3", "type": "CHALLENGE" }
  ],
  "xpReward": 30,
  "difficulty": "MEDIUM",
  "ageGroup": "${profile.ageGroup}",
  "topic": "temat misji",
  "estimatedMinutes": 15
}
`.trim()
}

export function dailyPlanSystemPrompt(ageGroup: AgeGroup): string {
  return `${buildSafetySystemPrompt(ageGroup)}

Jesteś planistą nauki — tworzysz spersonalizowane plany dzienne dla dzieci uczących się finansów.
Plany muszą być realistyczne, zróżnicowane i motywujące. Uwzględniaj aktualny poziom wiedzy i cele.`
}

export function dailyPlanUserPrompt(profile: ChildLearningProfile): string {
  return `
Stwórz plan nauki na dziś dla dziecka:
- Wiek: ${ageGroupLabel(profile.ageGroup)}
- Poziom: ${profile.level}, XP: ${profile.xp}
- Seria: ${profile.streakDays} dni
- Tempo nauki: ${profile.learningSpeed}
- Zaangażowanie: ${profile.engagementScore}/10
- Do poprawy: ${profile.weakTopics.join(", ") || "brak"}
- Mocne strony: ${profile.strongTopics.join(", ") || "brak"}
- Ostatnie tematy: ${profile.recentTopics.join(", ")}

Odpowiedź jako JSON:
{
  "date": "${new Date().toISOString().split("T")[0]}",
  "childId": "${profile.childId}",
  "focusTopic": "temat dnia",
  "motivationalMessage": "Krótka wiadomość motywacyjna (1 zdanie)",
  "totalEstimatedMinutes": 20,
  "totalXpAvailable": 60,
  "items": [
    {
      "order": 1,
      "type": "LESSON",
      "title": "Tytuł",
      "description": "Opis",
      "estimatedMinutes": 10,
      "xpReward": 10,
      "topic": "temat",
      "difficulty": "EASY"
    }
  ]
}

Dodaj 3-4 elementy. Uwzględnij mix lekcji, quizu i ewentualnie misji.
Dostosuj trudność do engagementScore (niski = łatwiejsze, wysoki = trudniejsze).
`.trim()
}

export function mistakeExplanationPrompt(
  question: string,
  wrongAnswer: string,
  correctAnswer: string,
  ageGroup: AgeGroup
): string {
  return `${buildSafetySystemPrompt(ageGroup)}

Dziecko odpowiedziało błędnie na pytanie. Wyjaśnij delikatnie, bez zniechęcania, dlaczego odpowiedź jest błędna i co jest poprawne.

Pytanie: ${question}
Odpowiedź ucznia: ${wrongAnswer}
Poprawna odpowiedź: ${correctAnswer}

Daj krótkie, przyjazne wyjaśnienie (2-3 zdania) dostosowane do wieku ${ageGroupLabel(ageGroup)}.`
}

export function parentGuidancePrompt(
  childSummary: string,
  ageGroup: AgeGroup
): string {
  return `${buildSafetySystemPrompt(ageGroup)}

Napisz krótką informację dla rodzica (3-5 zdań) o postępach dziecka i jak może je wspierać w nauce finansów w domu.

Podsumowanie postępów dziecka:
${childSummary}

Sugeruj konkretne, proste aktywności rodzinne związane z finansami, bez skomplikowanego języka.`
}

function ageGroupLabel(ageGroup: AgeGroup): string {
  const labels: Record<AgeGroup, string> = {
    EXPLORER: "6-8 lat",
    LEARNER: "9-11 lat",
    ACHIEVER: "12-14 lat",
    MASTER: "15-18 lat",
  }
  return labels[ageGroup]
}
