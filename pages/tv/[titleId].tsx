import { useRouter } from 'next/router'
import { Img, Box, Wrap, Text, Stat, StatLabel, StatNumber, StatHelpText, StatGroup, Stack, Container } from "@chakra-ui/react"
import Graph from '../../components/Graph'

export default function TV(props){
  const router = useRouter()
  const { titleId } = router.query
  

  return (
    <div>
      <Wrap padding='20px' spacing='30px'>
        <Box borderWidth='2px' borderRadius='10px' maxWidth='304' overflow='hidden'>
          <Img src={props.title.Poster}   alt={props.title.Title}/>
        </Box>
        <Stack spacing={4}>
          <Text fontSize='50px' fontWeight='bold'>{props.title.Title}</Text>
          <StatGroup>
            <Stat>
              <StatLabel>Seasons</StatLabel>
              <StatNumber>{props.title.totalSeasons}</StatNumber>
              <StatHelpText>{props.title.Year}</StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>IMDb Rating</StatLabel>
              <StatNumber>{props.title.imdbRating}</StatNumber>
              <StatHelpText>from {props.title.imdbVotes} votes</StatHelpText>
            </Stat>
          </StatGroup>
        <Container >{props.title.Plot}...</Container>
        </Stack>
      </Wrap>
      <Graph props={props.episodes}/>
    </div>
  )
}

export async function getServerSideProps(context){
  const { titleId } = context.query
  const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${titleId}`);
  const title = await res.json();
  let episodes = []

  for (let season = 0; season < title.totalSeasons; season++) {
    const seasonres = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${titleId}&Season=${season+1}`);
    const seasonInfo = await seasonres.json();
    episodes.push(seasonInfo)
  }

  return {
    props: { title, episodes }
  }
}