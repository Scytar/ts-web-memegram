export const formatText = (text: string, numberOfLetters: number): string => {
  const textWithLimit =
    text.length >= numberOfLetters
      ? `${text.substring(0, numberOfLetters - 4)}...`
      : text
  return textWithLimit
}
