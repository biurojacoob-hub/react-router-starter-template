export const FINN = {
  name: "Finn",
  emoji: "🦉",
  title: "Twój finansowy przewodnik",
}

// Day opening — Finn sets the scene before child starts
export const DAILY_START = [
  "Dzisiejszy dzień to nie lekcja. To misja. Gotowy?",
  "Coś odkryjesz dziś, czego większość dorosłych nie wie.",
  "Każda wielka przygoda zaczyna się od jednego kroku. Zaczynam.",
  "Finn tu jest. Razem odkryjemy dziś coś wyjątkowego.",
  "Jedna decyzja finansowa zmienia wszystko. Zacznijmy od tej dzisiejszej.",
]

// After hero action (lesson/quiz/mission primary) completed
export const HERO_ACTION_COMPLETE = [
  "Zrobiłeś to co ważne. Reszta to bonus. 💪",
  "Główna przygoda dnia — zaliczona. Finn jest pod wrażeniem.",
  "To był najtrudniejszy krok. Gratulacje — naprawdę. ✅",
  "Wiedza zdobyta. Dzień można uznać za wygrany!",
]

// After ALL 3 done — full day loop complete
export const DAY_COMPLETE = [
  "Trzy aktywności. Jeden dzień. Jeden bohater. To Ty. 🏆",
  "Pełna przygoda ukończona! Wróć jutro po kolejny rozdział. 🌅",
  "Finn jest z Ciebie wyjątkowo dumny. Naprawdę — to rzadkość. ⭐",
  "Dzień zamknięty. Jutro czeka na Ciebie coś jeszcze lepszego. 🚀",
]

export const FINN_AFTER_DISCOVERY = [
  "Niesamowite! Właśnie nauczyłeś się czegoś, czego większość dorosłych nie rozumie. 🎉",
  "Wow! To odkrycie zostanie z Tobą na całe życie. 💡",
  "Byłeś skupiony jak prawdziwy ekspert! Jestem z Ciebie dumny. 🦅",
  "To wiedza, którą możesz dziś wieczór pokazać rodzicom. Założę się, że nie wiedzieli! 😄",
]

export const FINN_AFTER_CHALLENGE = [
  "Udowodniłeś, że to wiesz! Nie każdy by to zrobił. 🏆",
  "Twój mózg właśnie ćwiczył jak na siłowni finansowej! 💪",
  "Większość dorosłych nie zaliczyłoby tego testu. A Ty? Tak! ⚡",
  "Wyzwanie pokonane! Jesteś coraz bliżej bycia mistrzem pieniędzy. 🎯",
]

export const FINN_AFTER_MISSION = [
  "Zrobiłeś to w prawdziwym życiu! To właśnie odróżnia ekspertów od reszty. 🌍",
  "Misja terenowa zaliczona! Twoja wiedza właśnie stała się umiejętnością. ✅",
  "Wiesz co jest wyjątkowe? Naprawdę to zrobiłeś, nie tylko o tym przeczytałeś. 🚀",
]

export const FINN_AFTER_DAY = [
  "Dzień ukończony! Wiesz co jest najlepsze? Jutro będziesz wiedzieć jeszcze więcej. 🌅",
  "Zrobiłeś coś dziś, czego większość dzieci w Twoim wieku nie zrobi nigdy. Naprawdę. 🌟",
  "Kiedy dorosniesz, będziesz pamiętać że zacząłeś tutaj. Dobra robota! 🚀",
  "Trzy aktywności w jeden dzień! Finn jest pod wrażeniem. Serio. 🦉",
]

export const FINN_PARTIAL_DAY = [
  "Dobry start! Nawet jeden krok to krok naprzód. Jutro idziemy dalej! 👣",
  "Świetnie, że zacząłeś! Finn czeka na Ciebie jutro z kolejnym krokiem. 🦉",
  "Zacząłeś — to najtrudniejsza część. Jutro dokończymy razem! 💪",
]

export const FINN_STREAK = [
  "Wróciłeś! Wiedziałem, że nie odpuścisz. 🔥",
  "Seria trwa! Twój mózg już czeka na nową porcję wiedzy. 🧠",
  "Każdy dzień to krok bliżej do bycia mistrzem pieniędzy! ⚡",
]

export const VARIABLE_REWARDS = [
  { emoji: "💡", text: "Gdybyś odkładał 1 zł dziennie przez rok, miałbyś 365 zł. W 10 lat — 3650 zł!" },
  { emoji: "🌍", text: "W Japonii dzieci uczą się finansów od 6. roku życia. Ty jesteś już w tej grupie!" },
  { emoji: "💰", text: "Większość milionerów zaczęła odkładać jako nastolatki. Ty zaczynasz wcześniej!" },
  { emoji: "🔮", text: "Procent składany to największy sekret finansów. Einstein podobno zwał go 8. cudem świata!" },
  { emoji: "🤫", text: "Sekret bogatych: zawsze najpierw odkładają, dopiero potem wydają resztę." },
  { emoji: "🎭", text: "Reklamy są zaprojektowane tak, żebyś wydał pieniądze zanim zdążysz pomyśleć. Teraz już wiesz!" },
  { emoji: "🏅", text: "Finn przyznaje Ci dziś: Odznakę Wytrwałości! Zdobyłeś ją swoją pracą." },
  { emoji: "⭐", text: "Wiesz co? 90% dzieci w Twoim wieku nigdy tego się nie uczy. Ty właśnie należysz do 10%." },
]

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

// Variable reward fires randomly ~40% of time after completing the day
export function shouldShowVariableReward(): boolean {
  return Math.random() < 0.4
}
