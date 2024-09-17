import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Project, TaskProject, TaskStatus } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"
import DropTask from "./DropTask"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

//Vid 508 
type TaskListProps = {
    //Vid 638, TaskProject[]
    tasks: TaskProject[]
    //Vid 599
    canEdit: boolean
}
//Vid 508 
type GroupedTasks = {
    //Vid 638, TaskProject[]
    [key: string]: TaskProject[]
}
//Vid 508 
const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

//Vid 510 
const statusStyles: { [key: string]: string } = {
    //Vid 511 
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500',
}

//Vid 508
//Vid 599, , canEdit
export default function TaskList({ tasks, canEdit }: TaskListProps) {

    const params = useParams()
    //Vid 633
    const projectId = params.projectId!
    const queryClient = useQueryClient()
    //Vid 633
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
        }
    })

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    //Vid 632,para poder saltar las tareas 
    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e

        if (over && over.id) {
            //Vid 633
            const taskId = active.id.toString()
            const status = over.id as TaskStatus
            mutate({ projectId, taskId, status })

            //Vid 635 y  Vid 636,prevData: Project
            queryClient.setQueryData(['project', projectId], (prevData: Project) => {
                //Vid 636
                const updatedTasks = prevData.tasks.map((task) => {
                    if(task._id === taskId) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })

                return {
                     //Vid 635
                    ...prevData,
                    tasks: updatedTasks
                }
            })
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handleDragEnd} >
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3
                                
                                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]} `}
                                //Vid 510 
                            >{statusTranslations[status]}</h3>

                            <DropTask status={status} />

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (//Vid 629
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    //Vid 508
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
}
