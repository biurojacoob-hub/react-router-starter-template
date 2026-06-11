import { redirect } from "next/navigation"

// Lessons are served through /courses — redirect to keep URLs clean
export default function LessonsPage() {
  redirect("/courses")
}
