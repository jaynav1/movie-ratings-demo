import Head from 'next/head'
import Link from 'next/link';
import { Button, Input, Center, Stack, SimpleGrid, VStack, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import Poster from '../components/Poster'

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [results, setResults] = useState<Object[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleSearch = (event) => {
    setDisabled(true);
    setRefreshing(true);
    event.preventDefault();
    console.log(search);
    getTVtitles(search).then((res) => {
      console.log(res)
      setResults(res);
      setRefreshing(false);
    });
  };
  
  return (
    <div>
      <Head>
        <title>Ratings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h='200px'>
        <Stack spacing={8}>
          <h1>This is the Center</h1>
          <Input placeholder='Search by Name' value={search} onChange={handleChange}/>
          <Button
            size='md'
            height='48px'
            border='2px'
            borderColor='green.500'
            isDisabled={disabled}
            onClick={handleSearch}
          >
            Search
          </Button>
          
        </Stack>
        
      </Center>
      <PosterGrid results={results} refreshing={refreshing}/>
      
    </div>
  )
}

function PosterGrid(props) {
  const results = props.results;
  const refreshing = props.refreshing;
  if (refreshing) {
    return ( <Center><Spinner size='xs' /><h1>Loading...</h1></Center> )
  } else {
    if (results.length > 0) {
      return (
        <SimpleGrid minChildWidth='212px' spacing='40px' p='40px'>{results.map((result) => (<Poster {...result}/>))}</SimpleGrid>
      )
    } else {
      return ( <Center><h1>No Results</h1></Center> )
    }
  }
}

// export async function getServerSideProps(context) {


// }

export async function getTVtitles(query:string) {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=' + encodeURI(query));
  const data = await res.json();
  return data.map(entry => entry.show);
}