import copyImg from '../assets/copy.svg'

import styles from '../styles/roomCode.module.scss'

type RoomCodeProps = {
  code: string
}

const RoomCode = ({ code }: RoomCodeProps) => {
  const copyCodeToClipboard = () => navigator.clipboard.writeText(code)

  return (
    <button className={styles.roomCode} onClick={copyCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}

export default RoomCode;
