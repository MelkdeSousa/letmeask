import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { database } from '../../services/firebase'
import useAuth from '../../hooks/useAuth'

import Button from '../../components/Button'

import illustrationImg from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'

import styles from '../../styles/auth.module.scss'

const NewRoom = () => {
  const [newRoom, setNewRoom] = useState('')

  const { user } = useAuth()
  const router = useRouter()

  const handleNewRoom = async (event: FormEvent) => {
    event.preventDefault()

    if (newRoom.trim() === '') return

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user.id
    })

    router.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleNewRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link href="/"><a>Clique aqui</a></Link></p>
        </div>
      </main>
    </div>
  )
}

export default NewRoom
