import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {

    //Vid 485
    const navigate = useNavigate()
    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    //Vid 488
    const {mutate} = useMutation({
        mutationFn: createProject,
        //Vid 488 ,Si hay un error ejecuto este callback 
        onError: (error) => {
            //Vid 489
            toast.error(error.message)
        },
        onSuccess: (data) => {
            //Vid 486
            toast.success(data)
            //Vid 485
            navigate('/')
        }
    })

    //Vid 488 => mutate(formData)
    const handleForm = (formData : ProjectFormData) => mutate(formData)

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

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
                        value='Crear Proyecto'
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />  
                </form>
            </div>
        </>
    )
}
