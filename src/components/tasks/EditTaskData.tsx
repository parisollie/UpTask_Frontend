import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
    const params = useParams()
    const projectId = params.projectId!

    //Vid 513 
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!
    
    //Vid 514 ,Vid 517, isError
    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        //Vid 515, !! comvierte la variable a un  boolean 
        enabled: !!taskId
    })

    //Vid 517 
    if(isError) return <Navigate to={'/404'} />

    //Vid 517
    if(data) return <EditTaskModal data={data} taskId={taskId} />
}
