import Theme from '@/components/global/Theme'

export default function SettingsPage() {
  return (
    <section className="flex h-full flex-1 flex-col bg-zinc-100 dark:bg-zinc-950">
      <header className="flex h-16 flex-none items-center border-b border-zinc-200 bg-zinc-50 px-3 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Common Settings
        </h1>
        <Theme />
      </header>
    </section>
  )
}
