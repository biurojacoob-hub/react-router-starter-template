export type MoneyFact = {
  id: string
  emoji: string
  title: string
  fact: string
  unlocksOnDay: number
  category: "historia" | "świat" | "tajemnica" | "nauka"
}

export const MONEY_FACTS: MoneyFact[] = [
  {
    id: "first-coins",
    emoji: "🪙",
    title: "Pierwsze monety",
    fact: "Pierwsze monety powstały ponad 2600 lat temu w starożytnej Lidii — królestwie w dzisiejszej Turcji. Były zrobione z elektronu, naturalnego stopu złota i srebra.",
    unlocksOnDay: 1,
    category: "historia",
  },
  {
    id: "oldest-currency",
    emoji: "💷",
    title: "Najstarsza waluta",
    fact: "Funt brytyjski to najstarsza waluta na świecie wciąż w użyciu — istnieje od ponad 1200 lat! Dolar ma zaledwie około 250 lat.",
    unlocksOnDay: 3,
    category: "historia",
  },
  {
    id: "paper-money-china",
    emoji: "📜",
    title: "Papierowe pieniądze",
    fact: "Chiny wynalazły papierowe pieniądze ponad 1000 lat temu. Europejczycy zaczęli ich używać dopiero 600 lat później — i początkowo im nie ufali!",
    unlocksOnDay: 5,
    category: "historia",
  },
  {
    id: "atm-underwater",
    emoji: "🌊",
    title: "Bankomat pod wodą",
    fact: "Istnieje bankomat na stacji badawczej McMurdo na Antarktydzie. To jeden z najbardziej odizolowanych bankomatów na świecie — obsługuje naukowców pracujących na lodzie.",
    unlocksOnDay: 7,
    category: "świat",
  },
  {
    id: "compound-interest",
    emoji: "🔮",
    title: "8. cud świata",
    fact: "Albert Einstein miał podobno powiedzieć, że procent składany to 'ósmy cud świata'. Jeśli odkładasz 10 zł miesięcznie od 10. roku życia, w wieku 60 lat możesz mieć ponad 30 000 zł — bez pracy!",
    unlocksOnDay: 10,
    category: "nauka",
  },
  {
    id: "monopoly-money",
    emoji: "🎲",
    title: "Monopoly drukuje więcej",
    fact: "Każdego roku drukuje się więcej pieniędzy do gry Monopoly niż prawdziwych dolarów w USA. W 2020 roku Hasbro wydrukowało 30 miliardów dolarów monopolowych!",
    unlocksOnDay: 12,
    category: "tajemnica",
  },
  {
    id: "richest-person-history",
    emoji: "👑",
    title: "Najbogatszy człowiek w historii",
    fact: "Najbogatszym człowiekiem w historii był Mansa Musa z Mali (XIV wiek). Jego majątek wynosiłby dziś ok. 400 miliardów dolarów. Kiedy podróżował przez Egipt, tak rozrzucał złoto, że wywołał inflację na 12 lat!",
    unlocksOnDay: 14,
    category: "historia",
  },
  {
    id: "credit-card-age",
    emoji: "💳",
    title: "Karta kredytowa",
    fact: "Pierwsza karta kredytowa powstała w 1950 roku. Jej właściciel zapomniał portfela podczas kolacji i postanowił stworzyć kartę, żeby to się nie powtórzyło. Pomysł wart miliardy!",
    unlocksOnDay: 16,
    category: "historia",
  },
  {
    id: "bitcoin-pizza",
    emoji: "🍕",
    title: "Najdroższa pizza w historii",
    fact: "W 2010 roku programista kupił 2 pizze za 10 000 bitcoinów. Dziś te bitcoiny byłyby warte setki milionów złotych. To najdroższa pizza w historii!",
    unlocksOnDay: 18,
    category: "tajemnica",
  },
  {
    id: "saving-habit",
    emoji: "🐷",
    title: "Skąd wzięła się świnka skarbonka?",
    fact: "W średniowieczu naczynia robiono z taniej gliny zwanej 'pygg'. Ludzie trzymali w nich oszczędności. Z czasem garncarze zaczęli robić je w kształcie świni — i tak powstała skarbonka!",
    unlocksOnDay: 20,
    category: "historia",
  },
  {
    id: "money-bacteria",
    emoji: "🦠",
    title: "Pieniądze i bakterie",
    fact: "Badania wykazały, że na jednym banknocie może żyć do 3000 różnych rodzajów bakterii. Dlatego mycie rąk po liczeniu gotówki to naprawdę dobry pomysł!",
    unlocksOnDay: 22,
    category: "nauka",
  },
  {
    id: "switzerland-notes",
    emoji: "🇨🇭",
    title: "Szwajcarski sekret",
    fact: "Szwajcaria drukuje banknoty z włókna bawełnianego i lnu, a nie papieru. Dlatego są prawie niezniszczalne — możesz je prać w pralce i nadal będą działać!",
    unlocksOnDay: 24,
    category: "tajemnica",
  },
  {
    id: "millionaire-age",
    emoji: "🌱",
    title: "Sekret milionerów",
    fact: "Badania pokazują, że większość milionerów zaczęła oszczędzać regularnie przed 25. rokiem życia. Ty zaczynasz znacznie wcześniej — to Twoja największa przewaga!",
    unlocksOnDay: 26,
    category: "nauka",
  },
  {
    id: "stock-market-kids",
    emoji: "📈",
    title: "Giełda dla dzieci",
    fact: "Warren Buffett, jeden z najbogatszych ludzi na świecie, kupił swoje pierwsze akcje w wieku 11 lat. Żałował, że nie zaczął wcześniej. Ty uczysz się finansów już teraz!",
    unlocksOnDay: 28,
    category: "świat",
  },
  {
    id: "day30-master",
    emoji: "🏆",
    title: "Skarb wiedzy",
    fact: "Ukończyłeś 30 dni finansowej przygody! Wiesz dziś więcej o pieniądzach niż 90% dorosłych w Polsce. Ta wiedza zostanie z Tobą na całe życie — i jest warta więcej niż jakikolwiek skarb.",
    unlocksOnDay: 30,
    category: "tajemnica",
  },
]

export function getUnlockedFacts(currentDay: number): MoneyFact[] {
  return MONEY_FACTS.filter((f) => f.unlocksOnDay <= currentDay)
}

export function getLatestUnlockedFact(currentDay: number): MoneyFact | null {
  const unlocked = getUnlockedFacts(currentDay)
  return unlocked.length > 0 ? unlocked[unlocked.length - 1]! : null
}

export function getNextFact(currentDay: number): MoneyFact | null {
  return MONEY_FACTS.find((f) => f.unlocksOnDay > currentDay) ?? null
}
