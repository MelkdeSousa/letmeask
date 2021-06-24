import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import useAuth from '../../hooks/useAuth'
import { database } from '../../services/firebase'

import Button from '../../components/Button'
import RoomCode from '../../components/RoomCode'

import logoImg from '../../assets/logo.svg'

import styles from '../../styles/room.module.scss'

type QuestionType = {
  id?: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

type QuestionFirebase = Record<string, QuestionType>

const Room = () => {
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<QuestionType[]>()
  const [title, setTitle] = useState('')

  const { user } = useAuth()
  const router = useRouter()

  const { id: roomCode } = router.query as { id: string }

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault()

    if (newQuestion.trim() === '') return

    if (!user) throw new Error('You must be logged in.')

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomCode}/questions`).push(question)

    setNewQuestion('')
  }

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomCode}`)

    roomRef.once('value', roomSnapshot => {
      const databaseRoom = roomSnapshot.val()
      const firebaseQuestions: QuestionFirebase = databaseRoom?.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([idQuestion, dataQuestion]) => ({
        id: idQuestion,
        content: dataQuestion.content,
        author: dataQuestion.author,
        isHighlighted: dataQuestion.isHighlighted,
        isAnswered: dataQuestion.isAnswered
      }))

      setTitle(databaseRoom?.title)
      setQuestions(parsedQuestions)
    })
  }, [roomCode])

  return (
    <div id={styles.pageRoom}>
      <header>
        <div className={styles.content}>
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomCode} />
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions?.length > 0 && (<span>{questions.length} pergunta(s)</span>)}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className={styles.formFooter}>
            {user ? (
              <div className={styles.userInfo}>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça o login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        {JSON.stringify(questions, null, 2)}
      </main>
    </div>
  );
}

export default Room;
