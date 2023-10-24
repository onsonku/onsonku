"use client";

import { ThemeToggle } from "@ossonu/ui"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return <ThemeToggle setTheme={setTheme}></ThemeToggle>
}