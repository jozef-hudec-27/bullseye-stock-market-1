import React from 'react'
import demoImage from '../static/bullish-vs-bearish.webp'
import { Box, Wrap, Text, WrapItem, Image } from '@chakra-ui/react'
import moment from 'moment';


const StockNewsComponent = ({ stockNews, searchQuery }) => {

    if (!stockNews.length) return (
      <>
        <Text fontSize='xs' as='i'>Search Query: {searchQuery}</Text>
        <Text>No News Found</Text>
      </>
    )

  return (
    <Box m='20px'>

      <Text fontSize='xs' as='i'>Search Query: {searchQuery}</Text>


        <Wrap spacing='10px' justify='center'>
          {stockNews.map(({ name, url, description, datePublished, image, provider }, i) => (

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

export default StockNewsComponent