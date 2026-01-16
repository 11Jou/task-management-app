import { User } from 'lucide-react'
import { useAppSelector } from '../../store/hooks'

export default function Avatar() {
    const { user } = useAppSelector((state) => state.auth)
    return (
        <div className="flex items-center gap-2">
            <User className="w-6 h-6" />
            <span className="text-sm font-medium">{user?.name}</span>
        </div>
    )
}