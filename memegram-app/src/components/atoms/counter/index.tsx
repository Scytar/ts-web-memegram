import styles from './styles.module.scss'
import { Typography, TypographyVariant } from '../'

export interface ICounterProps {
  count: number
}

const Counter = ({ count }: ICounterProps): JSX.Element => {
  return <Typography
      className={styles.text}
      text={count.toString()}
      variant={TypographyVariant.p}
    />
}

export { Counter }