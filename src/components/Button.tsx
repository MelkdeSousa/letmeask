import { ButtonHTMLAttributes } from 'react'

import styles from '../styles/button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined?: boolean
}

const Button = ({ isOutlined, ...props }: ButtonProps) => {
	return <button
		className={
			`${styles.button} ${isOutlined ? styles.outlined : ''}`
		}
		{...props} />
}

export default Button
