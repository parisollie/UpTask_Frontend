import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getFullProject } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"

//Vid 503 
export default function ProjectDetailsView() {

    //Vid 597
    const { data: user, isLoading: authLoading } = useAuth()
    //Vid 503
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!
    const { data, isLoading, isError } = useQuery({
        //Vid 519
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    })
    //Vid 599
    const canEdit = useMemo(() => data?.manager === user?._id , [data, user])
    //Vid 597 && authLoading
    if (isLoading && authLoading) return 'Cargando...'

    if (isError) return <Navigate to='/404' />
    //Vid 597 && user
    if (data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {isManager(data.manager, user._id) && (//Vid 597
                <nav className="my-5 flex gap-3">
                    <button
                    //Vid 503
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        //Vid 504
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >Agregar Tarea</button>

                    <Link
                    //Vid 585
                        to={'team'}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    >Colaboradores</Link>
                </nav>
            )}

            <TaskList
                //Vid 508
                tasks={data.tasks}
                //Vid 599
                canEdit={canEdit}
            />
            
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
