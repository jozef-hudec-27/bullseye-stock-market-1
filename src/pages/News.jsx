import React, { useEffect, useState } from 'react'
import demoImage from '../static/bullish-vs-bearish.webp'
import { Box, Wrap, Text, WrapItem, Image } from '@chakra-ui/react'
import moment from 'moment';
import { fetchSearchApi, baseSearchUrl } from '../utils/fetchApi';

const News = ({ searchQuery, freshness, count }) => {
    const [news, setNews] = useState([])

    useEffect(async () => {
        const searchResults = await fetchSearchApi(`${baseSearchUrl}/search?q=${searchQuery}&freshness=${freshness}&count=${count}`) 
        setNews(searchResults)
    }, [])

    if (!news) return 'No News Found...'


  return (
    <Box m='20px'>

        <Wrap spacing='10px' justify='center'>
          {news.map(({ name, url, description, datePublished, image, provider }, i) => (

                <a href={url} target='_blank' rel="noreferrer">
                  <WrapItem _hover={{  shadow: '3px 3px 5px #999999' }}>
                    <Box w='350px' h='215px' bg={'purple.200'} p='2' border='1px' align='center'>
                      <Text fontWeight='bold' as='samp'>
                        {name.length > 75 ? name.substring(0, 75) + '...' : name}
                      </Text>
                      
                      <br />
  
                      <Image  src={image?.thumbnail?.contentUrl || demoImage} boxSize='75px' border='1px' />
      
                      <Text fontWeight='bold' as='samp' fontSize='sm'>Source: {provider[0].name}</Text>
                      
                      <br />
  
                      <Text fontSize='xs' as='i'>{moment(datePublished).startOf('ss').fromNow()}</Text>
                    </Box>
                  </WrapItem>
                </a>
              ) 
            
          )}  
        </Wrap> 
      </Box>
  )
}

export default News