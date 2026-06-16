import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppTopbar } from "@/components/layout/app-topbar"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  const child = session?.user
    ? await prisma.childProfile.findFirst({
        where: { parentId: session.user.id, deletedAt: null },
        select: {
          firstName: true,
          xp: true,
          level: true,
          streakDays: true,
          avatarUrl: true,
        },
      })
    : null

  const profile = child
    ? {
        name: child.firstName,
        xp: child.xp,
        level: child.level,
        streakDays: child.streakDays,
        avatarUrl: child.avatarUrl ?? null,
      }
    : null

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar profile={profile} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppTopbar profile={profile} />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-6xl py-6 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
