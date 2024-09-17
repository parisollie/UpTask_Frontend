import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

//Vid 543
export default function AuthLayout() {
  return (
    <>
        <div className='bg-gray-800 min-h-screen'>
            <div className='py-10 lg:py-20 mx-auto w-[450px]'>
                <Logo />
                <div className='mt-10'>
                    <Outlet />
                </div>
            </div>
        </div>
        <ToastContainer
        //Vid 546
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
