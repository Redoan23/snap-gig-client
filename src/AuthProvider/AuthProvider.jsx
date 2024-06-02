import React, { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase/firebase';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import useAxiosPublic from '../Hooks/useAxiosPublic/useAxiosPublic';

export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic()
    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                const email = currentUser.email
                axiosPublic.post('/jwt', { email })
                    .then(res => {
                        const token = res.data.token
                        localStorage.setItem('access-token', token)
                    })

            }
            else{
                localStorage.removeItem('access-token')
            }
        })

        return () => {
            return unsubscribe()
        }
    }, [])

    const authInfo = { createUser, loginUser, googleLogin, user, loading, setLoading, logOut }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )




};

export default AuthProvider;