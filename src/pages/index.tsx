import { useRouter } from 'next/router'

import useAuth from '../hooks/useAuth'

import Button from '../components/Button'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

import styles from '../styles/auth.module.scss'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { route } from 'next/dist/next-server/server/router'

const Home = () => {
  const [roomCode, setRoomCode] = useState('')

  const { user, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleSignIn = async () => {
    if (!user) await signInWithGoogle()

    router.push('/rooms/new')
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault()

    if (roomCode.trim() === '') return

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return
    }

    if (roomRef.val().endedAt) {
      alert('Sala encerrada.')
      return
    }

    router.push(`/rooms/${roomCode}`)
  }

  return (
    <div className={styles.pageAuth}>
      <aside>
        <img
          src={illustrationImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />
        <strong>Crie uma sala de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <img src={logoImg} alt='Letmeask' />
          <button onClick={handleSignIn} className={styles.createRoom}>
            <img src={googleIconImg} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
