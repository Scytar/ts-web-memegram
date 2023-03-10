import classNames from 'classnames'

import { FontSize } from 'components/enums/font-size'
import { Status } from 'components/enums/status'

import { TypographyDefaultProps } from '..'
import styles from './styles.module.scss'

export interface LabelProps extends TypographyDefaultProps {
  /**
   * Status style for label
   */
  status?: Status
  /**
   * Label for element
   */
  htmlFor?: string
  /**
   * The label font size
   */
  fontSize?: FontSize
}

const Label = ({
  text = '',
  status = Status.default,
  fontSize = FontSize.normal,
  className,
}: LabelProps): JSX.Element => {
  return (
    <span
      className={classNames(
        styles.label,
        className,
        styles[fontSize],
        styles[status]
      )}
    >
      {text}
    </span>
  )
}

export { Label }
