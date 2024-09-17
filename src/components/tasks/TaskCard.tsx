import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {  TaskProject } from "@/types/index"
import { deleteTask } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { useDraggable } from '@dnd-kit/core'

//Vid 508
type TaskCardProps = {
    //Vid 638, TaskProject
    task: TaskProject
    //Vid 598
    canEdit: boolean
}

//Vid 598 , canEdit
export default function TaskCard({ task, canEdit }: TaskCardProps) {

    //Vid 630
    const { attributes, listeners, setNodeRef, transform  } = useDraggable({
         //Vid 630
        id: task._id
    })
    //Vid 513 
    const navigate = useNavigate()
    //Vid 518
    const params = useParams()
    const projectId = params.projectId!
    //Vid 519
    const queryClient = useQueryClient()
    //Vid 518
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            //Vif 519
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
        }
    })

     //Vid 630
    const style = transform ? {
        //Vid 631
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        //Vid 636
        padding: "1.25rem",
        backgroundColor: '#FFF',
        width: '300px',
        display: 'flex',
        borderWidth: '1px',
        borderColor: 'rgb(203 213 225 / var(--tw-border-opacity))'
    } : undefined

    return (
        <li 
 
        className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
            <div 
            {...listeners} //Vid 630 y 636
            {...attributes}
            ref={setNodeRef}
            style={style}
            className=" min-w-0 flex flex-col gap-y-4">
                <p
                    className="text-xl font-bold text-slate-600 text-left"
                >{task.name}</p>
                <p className="text-slate-500">{task.description}</p>
            </div>

            <div className="flex shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                <button
                                    type='button'
                                    //Vid 520 
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                    //Vid 598
                                    onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                                >
                                    Ver Tarea
                                </button>
                            </Menu.Item>

                            {canEdit && (//Vid 598
                                <>
                                    <Menu.Item>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                            onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
                                        >
                                            Editar Tarea
                                        </button>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <button
                                        //Vid 518
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                            onClick={() => mutate({ projectId, taskId: task._id })}
                                        >
                                            Eliminar Tarea
                                        </button>
                                    </Menu.Item>
                                </>
                            )}

                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}
