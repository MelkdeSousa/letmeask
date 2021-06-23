import Link from 'next/link'

import Button from '../components/Button'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'

import styles from '../styles/auth.module.scss'
import { useAuth } from '../contexts/AuthContext'

const NewRoom = () => {
  const { user: { name } } = useAuth()

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
          <form>
            <input type='text' placeholder='Nome da sala' />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link href="/"><a>Clique aqui</a></Link></p>
        </div>
      </main>
    </div>
  )
}

export default NewRoom
