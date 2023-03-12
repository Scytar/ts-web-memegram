import React from 'react'

import classNames from 'classnames'

import { TypographyDefaultProps } from '..'
import styles from './styles.module.scss'

export enum TypographyHeadingLevel {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
}

export interface HeadingProps extends TypographyDefaultProps {
  /**
   * The heading level: h1, h2, h3, h4 or h5
   */
  level: TypographyHeadingLevel
}

const Heading = ({
  text,
  level = TypographyHeadingLevel.h1,
  className,
  ...props
}: HeadingProps): JSX.Element => {
  const componentProps = {
    className: classNames(styles.heading, styles[level], className),
    ...props,
  }

  return React.createElement(level, { ...componentProps }, text)
}

export { Heading }
