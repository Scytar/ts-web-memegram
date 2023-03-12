import classNames from 'classnames'

import { TypographyDefaultProps } from '..'
import styles from './styles.module.scss'

export enum TypographyWeight {
  normal = 'normal',
  semiBold = 'semiBold',
  light = 'light',
}

export interface ParagraphProps extends TypographyDefaultProps {
  /**
   The font weight of the text
  */
  weight?: TypographyWeight
}

const Paragraph = ({
  text,
  weight = TypographyWeight.normal,
}: ParagraphProps): JSX.Element => (
  <p className={classNames(styles.paragraph, styles[weight])}>{text}</p>
)

export { Paragraph }
