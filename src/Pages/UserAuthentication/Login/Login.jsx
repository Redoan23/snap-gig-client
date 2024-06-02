import React from 'react';
import { useForm } from "react-hook-form"
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

    const { user, googleLogin, loginUser } = useAuth()


    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        loginUser(email, password)
            .then(res => {
                Toast.fire({
                    text: 'Login successful',
                    icon: 'success'
                })
            })
            .catch(err => {
                setError('password', {
                    type: 'manual',
                    message: 'Invalid Email or Password'
                })
                // Toast.fire({
                //     text: `${err.message}`,
                //     icon: 'error'
                // })
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                // TODO:redirect to the dashboard
                Toast.fire({
                    text: 'Login successful',
                    icon: 'success'
                })
            })
            .catch(err => {
                Toast.fire({
                    text: `${err.message}`,
                    icon: 'error'
                })
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='  p-16 pb-0'>
                <div className=' flex flex-col gap-4 px-24 py-10'>
                    <label htmlFor="email" className=' flex flex-col gap-1 w-full'>
                        Email*
                        <input type='email' placeholder='email'{...register("email", { required: true })} className=' bg-gray-100 p-3 w-full' />
                    </label>
                    {errors.email && <span className=' text-red-500'>Email is required*</span>}
                    <label htmlFor="password" className=' flex flex-col gap-1 w-full'>
                        Password*
                        <input type='password' placeholder='password'{...register("password", { required: 'password is required*' })} className=' bg-gray-100 p-3 w-full' />
                    </label>
                    {/* {errors.password && errors.password.message ? <span className=' text-red-500'>{errors.password.message}</span> : <span className=' text-red-500'>Password is required*</span>} */}
                    {errors.password && errors.message}
                    {errors?.password?.message && <span className=' text-red-500'>{errors?.password?.message}</span>}

                    <div className='w-full'>
                        <input type="submit" value='Login' className=' btn bg-[#007bff] text-white w-full' />
                    </div>
                </div>
                <div className=' divider'>
                    or login with social
                </div>
            </form>
            <div>
                <button className=' btn bg-[#007bff] text-white' onClick={handleGoogleLogin}>Google Login</button>
            </div>
        </div>
    );
};

export default Login;