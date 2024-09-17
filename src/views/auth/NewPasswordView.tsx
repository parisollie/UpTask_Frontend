import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"
import { ConfirmToken } from "@/types/index"

//Vid 554
export default function NewPasswordView() {
    //Vid 559
    const [token, setToken] = useState<ConfirmToken['token']>('')
    //Vid 556
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer Password</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold">por email</span>
            </p>

            {!isValidToken ? 
            //Vid 559
                <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}  /> : 
                //Vid 560
                <NewPasswordForm token={token} />
            }
        </>
    )
}
