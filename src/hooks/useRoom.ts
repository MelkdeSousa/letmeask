import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import useAuth from './useAuth'

type QuestionType = {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted: boolean
  isAnswered: boolean
  likeCount: number
  likeId: string | undefined
}

type QuestionFirebase = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

const useRoom = (roomCode: string) => {
  const [questions, setQuestions] = useState<QuestionType[]>()
  const [title, setTitle] = useState('')

  const { user } = useAuth()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomCode}`)

    roomRef.on('value', roomSnapshot => {
      const databaseRoom = roomSnapshot.val()
      const firebaseQuestions: QuestionFirebase = databaseRoom?.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([idQuestion, dataQuestion]) => ({
          id: idQuestion,
          content: dataQuestion.content,
          author: dataQuestion.author,
          isHighlighted: dataQuestion.isHighlighted,
          isAnswered: dataQuestion.isAnswered,
          likeCount: Object.values(dataQuestion.likes ?? {}).length,
          likeId: Object.entries(dataQuestion.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0],
        })
      )

      setTitle(databaseRoom?.title)
      setQuestions(parsedQuestions)
    })

    return () => roomRef.off('value')
  }, [roomCode, user?.id])

  return {
    questions,
    title,
  }
}

export default useRoom
