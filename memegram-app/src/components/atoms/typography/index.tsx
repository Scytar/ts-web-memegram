import React from 'react'

import { Caption, CaptionProps } from './caption'
import { Heading, TypographyHeadingLevel } from './heading'
import { Label, LabelProps } from './label'
import { Link, LinkProps } from './link'
import { Paragraph, ParagraphProps } from './paragraph'

export enum TypographyVariant {
  caption = 'caption',
  label = 'label',
  link = 'link',
  p = 'p',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
}

export interface TypographyDefaultProps {
  /**
   * Text for Typography
   */
  text: string
  /**
   * Classname to adds custom css
   * */
  className?: string
}

export interface TypographyProps
  extends TypographyDefaultProps,
    LabelProps,
    CaptionProps,
    LinkProps,
    ParagraphProps {
  /**
   * Variant for Typography
   */
  variant: TypographyVariant
}

const TypographyVariantComponent = React.memo(
  ({ text, variant, ...props }: TypographyProps) => {
    switch (variant) {
      case TypographyVariant.h1:
      case TypographyVariant.h2:
      case TypographyVariant.h3:
      case TypographyVariant.h4:
      case TypographyVariant.h5:
        return (
          <Heading
            text={text}
            level={
              TypographyHeadingLevel[
                variant as keyof typeof TypographyHeadingLevel
              ]
            }
            {...props}
          />
        )
      case TypographyVariant.caption:
        return <Caption text={text} {...props} />

      case TypographyVariant.label:
        return <Label text={text} {...props} />

      case TypographyVariant.link:
        return <Link text={text} {...props} />

      case TypographyVariant.p:
        return <Paragraph text={text} {...props} />

      default:
        return <span>{text}</span>
    }
  }
)

const Typography = ({
  text,
  variant,
  ...props
}: TypographyProps): JSX.Element => (
  <TypographyVariantComponent text={text} variant={variant} {...props} />
)

export { Typography }
