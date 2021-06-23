import { ButtonHTMLAttributes } from 'react'

import styles from '../styles/button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => {
	return <button className={styles.button} {...props} />
}

export default Button