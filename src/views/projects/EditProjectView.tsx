import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"

export default function EditProjectView() {
    //Vid 491 
    const params = useParams()
    const projectId = params.projectId!

    //Vid 494
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        //Intenta  hacer la conexion y sino cancelalo
        retry: false
    })

    //Vid 495
    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404' />
    //Vid 496
    //Vid 497,projectId={projectId}
    if(data) return <EditProjectForm data={data} projectId={projectId} />
}
