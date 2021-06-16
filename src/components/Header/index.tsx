import styles from './header.module.scss';

export default function Header() {
  return(
    <header className={styles.headerContainer}>

      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="spacetraveling"/>
        <img src="/images/spacetraveling.svg" alt="spacetraveling"/>
        <span>.</span>

      </div>

    </header>
  );
}
