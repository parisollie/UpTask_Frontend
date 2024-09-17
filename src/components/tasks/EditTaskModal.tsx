import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { updateTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

//Vid 516
type EditTaskModalProps = {
    data: Task
    taskId: Task['_id']
}

export default function EditTaskModal({data, taskId} : EditTaskModalProps) {
    //Vid 515
    const navigate = useNavigate()

    /**Vid 517 ,Obtener projectId */
    const params = useParams()
    const projectId = params.projectId!

    //Vid 516
    const { register, handleSubmit, reset, formState: {errors}  } = useForm<TaskFormData>({defaultValues: {
        name: data.name,
        description: data.description
    }})

    //Vid 517 
    const queryClient = useQueryClient()
    //Vid 517
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            //Vid 517 
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            //Vid 525
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    //Vid 516
    const handleEditTask = (formData: TaskFormData) => {
        //Vid 517
        const data = { projectId, taskId, formData }
        mutate(data)
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true}) }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    //Vid 516
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >
                                    <TaskForm
                                    //Vid 516
                                        register={register}
                                        errors={errors}
                                    />
                    
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}