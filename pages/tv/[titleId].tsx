import { useRouter } from 'next/router'
import { Image } from "@chakra-ui/react"

export default function TV(props){
  const router = useRouter()
  const { titleId } = router.query
  

  return (
    <div>
      <Image src={props.title.Poster} alt={props.title.Title}/>
      <p>Title: {props.title.Title}</p>
      <p>Total Seasons: {props.title.totalSeasons}</p>
      <p>Year: {props.title.Year}</p>
      <p>Summary: {props.title.Plot}...</p>
      <p>IMDB Rating: {props.title.imdbRating}</p>
      <p>IMDB Votes: {props.title.imdbVotes}</p>
      {console.log(props.episodes)}
    </div>
  )
}

export async function getServerSideProps(context){
  const { titleId } = context.query
  const res = await fetch(`http://www.omdbapi.com/?apikey=a9d35deb&i=${titleId}`);
  const title = await res.json();
  let episodes = []

  for (let season = 0; season < title.totalSeasons; season++) {
    const seasonres = await fetch(`http://www.omdbapi.com/?apikey=a9d35deb&i=${titleId}&Season=${season+1}`);
    const seasonInfo = await seasonres.json();
    episodes.push(seasonInfo)
  }

  return {
    props: { title, episodes }
  }
}