"use client";

import { useLayoutEffect, useState } from "react";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useLayoutEffect(() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const activeTheme =
      storedTheme === "light" ? "light" : storedTheme === "dark" ? "dark" : systemPrefersDark ? "dark" : "light";
    setTheme(activeTheme);
    if (activeTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  function handleToggleTheme() {
    const root = document.documentElement;
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-black/80 dark:shadow-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-slate-100">
            TM
          </div>
          <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Task Manager
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleTheme}
          className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-800/80"
        >
          {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
        </button>
      </div>
    </header>
  );
}