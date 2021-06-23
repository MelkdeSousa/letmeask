import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { firebase, auth } from '../services/firebase';

type UserType = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: UserType
  signInWithGoogle: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType>()

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    const { user } = await auth.signInWithPopup(provider)

    if (user) {
      const { displayName: name, photoURL: avatar, uid: id } = user

      if (!name || !avatar) throw new Error('Missing information from Google Account.')

      setUser({
        id, name, avatar
      })
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName: name, photoURL: avatar, uid: id } = user

        if (!name || !avatar) throw new Error('Missing information from Google Account.')

        setUser({
          id, name, avatar
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
