import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.container}>
      <img src="https://github.com/alekaimer.png" alt="Alexandre Kaimer" />
      <div>
        <strong>Alexandre Kaimer</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}