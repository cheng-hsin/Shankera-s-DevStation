import NextImage from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ priority, loading, ...rest }) => (
  <NextImage priority={priority} loading={loading || (priority ? undefined : 'lazy')} {...rest} />
)

export default Image
