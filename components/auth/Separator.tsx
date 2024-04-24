import { Separator as Line } from '@/components/ui/separator'

export default function Separator() {
  return (
    <div className="flex items-center justify-center">
      <Line className="flex-1" />
      <span className="mx-2 text-xs text-zinc-500">or</span>
      <Line className="flex-1" />
    </div>
  )
}
