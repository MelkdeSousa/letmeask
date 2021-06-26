import { ReactNode } from 'react'

import styles from '../styles/question.module.scss'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  isHighlighted?: boolean
  isAnswered?: boolean
}

const Question = ({
  content,
  author,
  children,
  isHighlighted = false,
  isAnswered = false,
}: QuestionProps) => {
  return (
    <div
      className={`${styles.question}
        ${isAnswered && styles.answered}
        ${isHighlighted && !isAnswered && styles.highlighted}
      `}
    >
      <p>{content}</p>
      <footer>
        <div className={styles.userInfo}>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  )
}

export default Question
