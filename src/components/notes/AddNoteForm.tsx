import { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/api/NoteAPI'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

export default function AddNoteForm() {
    //Vid 613
    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    //Vid 612
    const initialValues : NoteFormData = {
        content: ''
    }
    //Vid 612
    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    //Vid 613
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData})
        //Vid 613,reiniciar el formulario
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}//Vid 611 y 612
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300"
                    {...register('content', {
                        required: 'El Contenido de la nota es obligatorio'
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <input
                type="submit"
                value='Crear Nota'
                className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
            />
        </form>
    )
}
