import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const PostSkeleton = (): JSX.Element => {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton animation='wave' variant="text" sx={{ fontSize: '3rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton animation='wave' variant="rectangular" height={200} />
      <Skeleton animation='wave' variant="rectangular" width={"50%"} height={'1rem'} />
      <Skeleton animation='wave' variant="rectangular" width={"90%"} height={'1rem'} />
      <Skeleton animation='wave' variant="rectangular" width={"70%"} height={'1rem'} />
    </Stack>
  );
}

export { PostSkeleton };