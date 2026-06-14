"use client"

import Image from "next/image"
import type { ContentBlock } from "@/src/lib/learning/types"
import { cn } from "@/lib/utils"

type Props = {
  block: ContentBlock
}

export function ContentBlockRenderer({ block }: Props) {
  switch (block.type) {
    case "TEXT": {
      const c = block.content as { markdown: string }
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{c.markdown}</p>
        </div>
      )
    }

    case "IMAGE": {
      const c = block.content as { url: string; alt: string; caption?: string }
      return (
        <figure className="my-4">
          <Image src={c.url} alt={c.alt} width={800} height={320} className="rounded-xl w-full object-cover max-h-80" />
          {c.caption && (
            <figcaption className="text-center text-xs text-muted-foreground mt-2">{c.caption}</figcaption>
          )}
        </figure>
      )
    }

    case "VIDEO": {
      const c = block.content as { url: string; durationSeconds: number; thumbnail?: string }
      const mins = Math.floor(c.durationSeconds / 60)
      const secs = c.durationSeconds % 60
      return (
        <div className="rounded-xl overflow-hidden bg-black aspect-video relative">
          <video
            src={c.url}
            poster={c.thumbnail}
            controls
            className="w-full h-full"
          />
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            {mins}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      )
    }

    case "TIP": {
      const c = block.content as { text: string; variant?: "info" | "warning" | "success" }
      const styles = {
        info: "bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-300",
        warning: "bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-950/40 dark:border-yellow-700 dark:text-yellow-300",
        success: "bg-green-50 border-green-300 text-green-800 dark:bg-green-950/40 dark:border-green-700 dark:text-green-300",
      }
      const icons = { info: "💡", warning: "⚠️", success: "✅" }
      const variant = c.variant ?? "info"
      return (
        <div className={cn("rounded-xl border p-4 flex gap-3", styles[variant])}>
          <span className="text-lg shrink-0">{icons[variant]}</span>
          <p className="text-sm leading-relaxed">{c.text}</p>
        </div>
      )
    }

    case "CHALLENGE": {
      const c = block.content as { prompt: string; hint?: string }
      return (
        <div className="rounded-xl border border-purple-300 bg-purple-50 dark:bg-purple-950/40 dark:border-purple-700 p-4 space-y-2">
          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-semibold text-sm">
            <span>🎯</span> Wyzwanie
          </div>
          <p className="text-sm text-purple-900 dark:text-purple-200 leading-relaxed">{c.prompt}</p>
          {c.hint && (
            <details className="mt-2">
              <summary className="text-xs text-purple-600 dark:text-purple-400 cursor-pointer select-none">
                Pokaż podpowiedź
              </summary>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">{c.hint}</p>
            </details>
          )}
        </div>
      )
    }

    case "SUMMARY": {
      const c = block.content as { points: string[] }
      return (
        <div className="rounded-xl border bg-muted/40 p-4 space-y-2">
          <div className="font-semibold text-sm flex items-center gap-2">
            <span>📋</span> Podsumowanie
          </div>
          <ul className="space-y-1.5">
            {c.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    default:
      return null
  }
}
