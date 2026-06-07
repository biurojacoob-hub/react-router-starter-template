import { ALL_SKILLS, SKILLS_BY_ID } from "@/src/learning/graph/skills"
import { CONTENT_BY_SKILL_ID } from "./registry"
import type { CoverageEntry, CoverageReport } from "./types"

// ─────────────────────────────────────────────────────────────
// COVERAGE REPORT
// ─────────────────────────────────────────────────────────────

export function generateCoverageReport(): CoverageReport {
  const entries: CoverageEntry[] = ALL_SKILLS.map((skill) => {
    const content = CONTENT_BY_SKILL_ID[skill.id]

    const lessonsCount = content?.lessons.length ?? 0
    const hasQuiz = content?.quiz !== undefined
    const missionsCount = content?.missions.length ?? 0
    const isCovered = lessonsCount >= 3 && hasQuiz && missionsCount >= 3

    return {
      skillId: skill.id,
      skillName: skill.name,
      ageGroup: skill.ageGroup,
      lessonsCount,
      hasQuiz,
      missionsCount,
      isCovered,
    }
  })

  const coveredSkills = entries.filter((e) => e.isCovered).length
  const totalLessons = entries.reduce((sum, e) => sum + e.lessonsCount, 0)
  const totalQuizzes = entries.filter((e) => e.hasQuiz).length
  const totalMissions = entries.reduce((sum, e) => sum + e.missionsCount, 0)
  const missingSkillIds = entries
    .filter((e) => !e.isCovered)
    .map((e) => e.skillId)

  return {
    generatedAt: new Date(),
    totalSkills: ALL_SKILLS.length,
    coveredSkills,
    totalLessons,
    totalQuizzes,
    totalMissions,
    coveragePercent: Math.round((coveredSkills / ALL_SKILLS.length) * 100),
    entries,
    missingSkillIds,
  }
}

export function printCoverageReport(report: CoverageReport): void {
  console.log("\n══════════════════════════════════════════════")
  console.log("  CURRICULUM COVERAGE REPORT")
  console.log(`  Generated: ${report.generatedAt.toISOString()}`)
  console.log("══════════════════════════════════════════════")
  console.log(`  Skills:    ${report.coveredSkills}/${report.totalSkills} covered (${report.coveragePercent}%)`)
  console.log(`  Lessons:   ${report.totalLessons} (min 78 required)`)
  console.log(`  Quizzes:   ${report.totalQuizzes} (min 26 required)`)
  console.log(`  Missions:  ${report.totalMissions} (min 78 required)`)
  console.log("──────────────────────────────────────────────")

  const byAge: Record<string, CoverageEntry[]> = {}
  for (const entry of report.entries) {
    if (!byAge[entry.ageGroup]) byAge[entry.ageGroup] = []
    byAge[entry.ageGroup]!.push(entry)
  }

  for (const [ageGroup, ageEntries] of Object.entries(byAge)) {
    console.log(`\n  ${ageGroup}:`)
    for (const e of ageEntries) {
      const status = e.isCovered ? "✅" : "❌"
      console.log(
        `    ${status} ${e.skillId.padEnd(28)} L:${e.lessonsCount} Q:${e.hasQuiz ? 1 : 0} M:${e.missionsCount}`
      )
    }
  }

  if (report.missingSkillIds.length > 0) {
    console.log("\n  ⚠️  MISSING COVERAGE:")
    for (const id of report.missingSkillIds) {
      const skill = SKILLS_BY_ID[id]
      console.log(`    - ${id} (${skill?.name})`)
    }
  } else {
    console.log("\n  🎉 ALL SKILLS FULLY COVERED!")
  }

  console.log("\n══════════════════════════════════════════════\n")
}
