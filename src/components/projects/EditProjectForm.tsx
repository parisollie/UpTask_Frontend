import ProjectForm from './ProjectForm'
import { Link, useNavigate } from 'react-router-dom'
import { Project, ProjectFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '@/api/ProjectAPI'
import { toast } from 'react-toastify'

//Vid 496
type EditProjectFormProps = {
    data: ProjectFormData
    //Vid 497
    projectId: Project['_id']
}

//Vid 495
//Vid 496, : EditProjectFormProps
//Vid 497, projectId
export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

    //Vid 498
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        //Vid 496 
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }})
    
    //Vid 500
    const queryClient = useQueryClient()
    
    //Vid 497
    //Vid 498
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            //Vid 498
           toast.error(error.message)
        },
        //Vid 498
        onSuccess: (data) => {
            //Vid 500 
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            //Vid 498
            toast.success(data)
            navigate('/')
        }
    })

    //Vid 495
    //Vid 496, formData: ProjectFormData
    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            //Vid 497
            projectId
        }
        //Vid 497
        mutate(data)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>

                <nav className="my-5 ">
                    <Link
                        className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to='/'
                    >Volver a Proyectos</Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <ProjectForm 
                        register={register}
                        errors={errors}
                    />
                    
                    <input
                        type="submit"
                        value='Guardar Cambios'
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />  
                </form>
            </div>
        </>
    )
}
