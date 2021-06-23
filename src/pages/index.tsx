import { useRouter } from 'next/router'

import { useAuth } from '../contexts/AuthContext'

import Button from '../components/Button'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

import styles from '../styles/auth.module.scss'

const Home = () => {
  const { user, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleCreateRoom = async () => {
    if (!user) await signInWithGoogle()

    router.push('/new-room')
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
          <button onClick={handleCreateRoom} className={styles.createRoom}>
            <img src={googleIconImg} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form>
            <input type='text' placeholder='Digite o código da sala' />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
