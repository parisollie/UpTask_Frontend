import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/hooks/useAuth"

//Vid 618
export default function ProfileView() {
    //Vid 620
    const { data, isLoading } = useAuth()
    if(isLoading) return 'Cargando...'
    if(data) return <ProfileForm data={data} />
}
