import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember } from "@/types/index"
import { addUserToProject } from "@/api/TeamAPI"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

//Vid 588
type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

//Vid 588
//Vid 590,extraemos reset 
export default function SearchResult({ user, reset }: SearchResultProps) {

    //Vid 590 
    const navigate = useNavigate()
    //Vid 589
    const params = useParams()
    const projectId = params.projectId!
    //Vid 593
    const queryClient = useQueryClient()

    //Vid 589
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            //Vid 590
            navigate(location.pathname, {replace: true})
            //Vid 593
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
        }
    })

    //Vid 589
    const handleAddUserToProject = () => {
        const data = {
            projectId,
            id: user._id
        }
        mutate(data)
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                    //Vid 589
                    onClick={handleAddUserToProject}
                >Agregar al Proyecto</button>
            </div>
        </>
    )
}
