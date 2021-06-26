import { useRouter } from 'next/router'

import { database } from '../../../services/firebase'

import useRoom from '../../../hooks/useRoom'

import Button from '../../../components/Button'
import RoomCode from '../../../components/RoomCode'
import Question from '../../../components/Question'

import logoImg from '../../../assets/logo.svg'
import deleteImg from '../../../assets/delete.svg'
import answerImg from '../../../assets/answer.svg'
import checkImg from '../../../assets/check.svg'

import styles from '../../../styles/room.module.scss'

const AdminRoom = () => {
  const router = useRouter()
  const { id: roomCode } = router.query as { id: string }

  const { questions, title } = useRoom(roomCode)

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certerxa que você deseja excluir esta pergunta?'))
      await database.ref(`rooms/${roomCode}/questions/${questionId}`).remove()
  }

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomCode}`).update({
      endedAt: new Date(),
    })

    router.push('/')
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomCode}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  const handleHightlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomCode}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  return (
    <div id={styles.pageRoom}>
      <header>
        <div className={styles.content}>
          <img src={logoImg} alt='Letmeask' />
          <div>
            <RoomCode code={roomCode} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions?.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className={styles.questionList}>
          {questions?.map(
            ({ author, content, id, isAnswered, isHighlighted }) => (
              <Question
                content={content}
                author={author}
                isHighlighted={isHighlighted}
                isAnswered={isAnswered}
                key={id}
              >
                {!isAnswered && (
                  <>
                    <button
                      type='button'
                      onClick={() => handleCheckQuestionAsAnswered(id)}
                    >
                      <img
                        src={checkImg}
                        alt='Marcar pergunta como respondida'
                      />
                    </button>

                    <button
                      type='button'
                      onClick={() => handleHightlightQuestion(id)}
                    >
                      <img src={answerImg} alt='Dar destaque a pergunta' />
                    </button>
                  </>
                )}
                <button type='button' onClick={() => handleDeleteQuestion(id)}>
                  <img src={deleteImg} alt='Remover pergunta' />
                </button>
              </Question>
            )
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminRoom
