import React, { useState } from 'react';
import { useForm } from "react-hook-form"

const Register = () => {
    const poorRegex = /^[a-zA-Z]{1,}$/;
    const goodRegex = /^(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
    const strongRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm()



    const onSubmit = (data) => {
        if (data.role === 'selectrole') {
            setError('role', {
                type: 'manual',
            });
            return;
        }
        console.log(data)

    };


    // password strength watcher
    let passwordStrength = ''

    const password = watch('password');
    if (poorRegex.test(password)) {
        passwordStrength = 'poor'
    } else if (goodRegex.test(password)) {
        passwordStrength = 'good'
    } else if (strongRegex.test(password)) {
        passwordStrength = 'strong'
    }
    // else{
    //     passwordStrength='okay'
    // }



    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className=' p-16' >
                    <div className=' flex flex-col gap-4 px-24 py-10'>

                        <label htmlFor="name" className=' w-full flex flex-col gap-1'> Name*
                            <input type='text' placeholder='name' {...register("name", { required: true })} className=' w-fUll p-3 bg-gray-100' />
                        </label>
                        {errors.name && <span className=' text-red-500'> Name is required*</span>}

                        <label htmlFor="email" className=' w-full flex flex-col gap-1'>
                            Email*
                            <input type="email" name="email" id="email" className=' w-fUll p-3 bg-gray-100' placeholder='email' {...register('email', { required: 'Email is required*' }, { pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address format', } },)} />
                        </label>
                        {errors.email && <span className=' text-red-500'>{errors.email.message}</span>}
                        <div className=' flex flex-col gap-3'>
                            <label htmlFor="url" className=' w-full flex flex-col gap-1'>
                                Photo URL
                                <input type="text" name="url" id="" className=' w-fUll p-3 bg-gray-100' placeholder='profile picture URL' {...register('url')} />
                            </label>
                            {errors.url && <span className=' text-red-500'> Photo URL is required*</span>}
                            Or Upload a file
                            <label htmlFor="file" className=' flex flex-col w-full gap-1'>
                                <input type="file" name="file" id="file" className='w-full p-3 bg-gray-100' placeholder='Upload a file'{...register('file')} />
                            </label>
                        </div>

                        <label htmlFor="password" className=' w-full flex flex-col gap-1'>
                            Password*
                            <input type="password" name="password" id="password" className=' w-fUll p-3 bg-gray-100' placeholder='password' {...register('password', { required: true })} />
                        </label>


                        {errors.password && <span className='text-red-500'>{errors.password.message || 'Password is required*'}</span>}
                        {passwordStrength && <span className='text-green-500'>Password strength: {passwordStrength}</span>}

                        <label htmlFor="role" className=' w-full flex flex-col gap-1'>
                            Select Your Role*
                            <select defaultValue='selectrole' name="role" id="role" {...register('role', { required: true })} className=' w-fUll p-3 bg-gray-100'>
                                <option disabled value='selectrole'>Select Your Role</option>
                                <option value="worker">Worker</option>
                                <option value="taskcreator">Task Creator</option>
                            </select>
                        </label>
                        {errors.role && <span className=' text-red-500'>Select a role </span>}

                        <div>
                            <input type="submit" value='register' className=' btn w-full bg-[#007bff] text-white' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;