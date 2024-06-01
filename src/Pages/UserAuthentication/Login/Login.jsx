import React from 'react';
import { useForm } from "react-hook-form"
import useAuth from '../../../Hooks/useAuth';

const Login = () => {

    const { user, googleLogin, loginUser } = useAuth()

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
        console.log(data)
        loginUser(email, password)
            .then(res => {
                console.log(res.user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                console.log(res.user)
            })
            .catch(err => {
                console.log(err)
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
                        <input type='password' placeholder='password'{...register("password", { required: true })} className=' bg-gray-100 p-3 w-full' />
                    </label>
                    {errors.password && <span className=' text-red-500'>Password is required*</span>}

                    <div className='w-full'>
                        <input type="submit" value='Login' className=' btn bg-[#007bff] text-white w-full' />
                    </div>
                </div>
                <div className=' divider'>
                    or login with social
                </div>
                <div>
                    <button className=' btn bg-[#007bff] text-white' onClick={handleGoogleLogin}>Google Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;