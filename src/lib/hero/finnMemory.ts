export type FinnMemoryContext = {
  streakDays: number
  missionsCompleted: number
  badgesEarned: number
  currentDay: number
  level: number
  lessonsDoneTotal: number
}

type MemoryLine = {
  condition: (ctx: FinnMemoryContext) => boolean
  priority: number
  line: string
}

const MEMORY_LINES: MemoryLine[] = [
  {
    condition: (ctx) => ctx.currentDay === 30 && ctx.streakDays >= 25,
    priority: 100,
    line: "Pamiętasz dzień pierwszy? Przyszedłeś jako nowicjusz. Dziś jesteś mistrzem. 🏆",
  },
  {
    condition: (ctx) => ctx.streakDays >= 30,
    priority: 90,
    line: "30 dni z rzędu! Wiesz co to znaczy? Zbudowałeś nawyk. To trudniejsze niż jakikolwiek quiz. 🔥",
  },
  {
    condition: (ctx) => ctx.streakDays === 7,
    priority: 80,
    line: "Tydzień! Wracasz już 7 dni z rzędu. Dokładnie tak wyglądają ludzie, którym udaje się zmienić swoje życie. 🌟",
  },
  {
    condition: (ctx) => ctx.streakDays === 14,
    priority: 85,
    line: "Dwa tygodnie nieprzerwanej przygody! Finn jest z Ciebie wyjątkowo dumny. Naprawdę. 💪",
  },
  {
    condition: (ctx) => ctx.missionsCompleted === 1,
    priority: 70,
    line: "Pamiętasz swoją pierwszą misję terenową? Wtedy po raz pierwszy zabrałeś wiedzę w prawdziwe życie. 🌍",
  },
  {
    condition: (ctx) => ctx.missionsCompleted >= 5,
    priority: 65,
    line: `Masz już ${"{missionsCompleted}"} misji terenowych za sobą. Każda z nich była prawdziwym doświadczeniem. 🎯`,
  },
  {
    condition: (ctx) => ctx.badgesEarned === 1,
    priority: 60,
    line: "Pamiętasz swoją pierwszą odznakę? Finn pamiętał ten moment — to był dopiero początek! 🏅",
  },
  {
    condition: (ctx) => ctx.level === 5,
    priority: 75,
    line: "Właśnie osiągnąłeś poziom 5. To punkt, w którym większość osób odpuszcza. Ty nie. 🥇",
  },
  {
    condition: (ctx) => ctx.level === 10,
    priority: 80,
    line: "Poziom 10! Wiesz co osiągnąłeś? Więcej niż 80% uczniów, którzy zaczęli razem z Tobą. ⭐",
  },
  {
    condition: (ctx) => ctx.currentDay >= 15 && ctx.currentDay < 16,
    priority: 70,
    line: "W połowie drogi! 15 dni temu byłeś na początku. Teraz widzę jak bardzo urosłeś. 🌱",
  },
  {
    condition: (ctx) => ctx.streakDays >= 3 && ctx.streakDays < 7,
    priority: 40,
    line: `${"{streakDays}"} dni z rzędu. Widzę, że wracasz. To już więcej niż przypadek. 🦉`,
  },
  {
    condition: (ctx) => ctx.lessonsDoneTotal >= 10,
    priority: 45,
    line: `${"{lessonsDoneTotal}"} odkryć za Tobą! Twój mózg przechował już naprawdę dużo finansowej wiedzy. 💡`,
  },
]

export function getFinnMemoryLine(ctx: FinnMemoryContext): string | null {
  const matching = MEMORY_LINES
    .filter((m) => m.condition(ctx))
    .sort((a, b) => b.priority - a.priority)

  if (matching.length === 0) return null

  const line = matching[0]!.line
  return line
    .replace("{missionsCompleted}", String(ctx.missionsCompleted))
    .replace("{streakDays}", String(ctx.streakDays))
    .replace("{lessonsDoneTotal}", String(ctx.lessonsDoneTotal))
}
