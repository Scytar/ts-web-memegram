import classNames from 'classnames'

import { FontSize } from 'components/enums/font-size'

import { TypographyDefaultProps } from '..'
import styles from './styles.module.scss'

export interface CaptionProps extends TypographyDefaultProps {
  /**
   * Is the text bold?
   */
  bold?: boolean
  /**
   * The caption font size
   */
  fontSize?: FontSize
}

const Caption = ({
  text,
  bold = false,
  fontSize = FontSize.normal,
  className,
}: CaptionProps): JSX.Element => {
  return (
    <span
      className={classNames(
        styles.caption,
        styles[fontSize],
        { [styles.bold]: bold },
        className
      )}
    >
      {text}
    </span>
  )
}

export { Caption }
