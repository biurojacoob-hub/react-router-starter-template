import { z } from "zod"

export const SignUpSchema = z.object({
  firstName: z.string().min(2, "Imię musi mieć min. 2 znaki").max(50),
  lastName: z.string().min(2, "Nazwisko musi mieć min. 2 znaki").max(50),
  email: z.string().email("Podaj poprawny adres email"),
  password: z
    .string()
    .min(8, "Hasło musi mieć min. 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
    .regex(/[0-9]/, "Hasło musi zawierać cyfrę"),
})

export const SignInSchema = z.object({
  email: z.string().email("Podaj poprawny adres email"),
  password: z.string().min(1, "Podaj hasło"),
})

export const OnboardingStep1Schema = z.object({
  familyName: z.string().min(2, "Nazwa rodziny musi mieć min. 2 znaki").max(80),
})

export const OnboardingStep2Schema = z.object({
  childrenCount: z.coerce
    .number()
    .int()
    .min(1, "Podaj liczbę dzieci")
    .max(10, "Max 10 dzieci"),
})

export const OnboardingStep3Schema = z.object({
  childrenAges: z
    .array(z.coerce.number().int().min(4).max(18))
    .min(1, "Podaj wiek przynajmniej jednego dziecka"),
})

export const OnboardingStep4Schema = z.object({
  educationalGoals: z
    .array(z.string())
    .min(1, "Wybierz przynajmniej jeden cel"),
})

export const InviteByEmailSchema = z.object({
  email: z.string().email("Podaj poprawny adres email"),
  role: z.enum(["CHILD", "PARENT"]),
})

export const JoinFamilySchema = z.object({
  code: z.string().length(8, "Kod zaproszenia ma 8 znaków").toUpperCase(),
  firstName: z.string().min(2, "Imię musi mieć min. 2 znaki").max(50),
  lastName: z.string().min(2, "Nazwisko musi mieć min. 2 znaki").max(50),
  email: z.string().email("Podaj poprawny adres email"),
  password: z
    .string()
    .min(8, "Hasło musi mieć min. 8 znaków")
    .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
    .regex(/[0-9]/, "Hasło musi zawierać cyfrę"),
})

export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignInInput = z.infer<typeof SignInSchema>
export type JoinFamilyInput = z.infer<typeof JoinFamilySchema>
