import { Box, Image, Center, Link } from "@chakra-ui/react"

export default function Poster (props) {
  if (props.externals.imdb != undefined && props.image != null) {
    return (
      <Box maxW='sm' width='212px' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Link href={`/tv/${props.externals.imdb}`}>
          <Image src={props.image.medium} alt={props.name} width='210px' height='295px'/>
        </Link>
      </Box>
    )
  } else {
    return ( null )
  }
}