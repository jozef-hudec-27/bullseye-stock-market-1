import React, { useState, useEffect } from 'react';
import { baseSearchUrl, fetchSearchApi, fetchTrendingStocks } from '../utils/fetchApi';
import { Wrap, WrapItem, Center, Box, Text, Image, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody  } from '@chakra-ui/react'
import moment from 'moment';
import demoImage from '../static/bullish-vs-bearish.webp'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import millify from 'millify'


const HomePage = () => {
  const [news, setNews] = useState([])
  const [stocks, setStocks] = useState([])
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]


  useEffect(async () => {
    const newsResults = await fetchSearchApi(`${baseSearchUrl}/search?q=stocks&freshness=Week&count=12`)
    setNews(newsResults)

    const stocksResults = await fetchTrendingStocks()
    const popularStocks = await stocksResults[0].quotes
    const showStocks = []

    while (true) {
      const randomIndex = Math.floor(Math.random()*numbers.length)
      if (!(showStocks.includes(popularStocks[randomIndex]))) {
        showStocks.push(popularStocks[randomIndex])
      }
      if (showStocks.length == 3) break
    }

    setStocks(showStocks)

  }, [])


  if (!news || !stocks) return 'Loading data...'

  return (
      <Box m='20px'>

        {/* <Wrap spacing='20px' justify='center'>
          {news.map(({ name, url, description, datePublished, image, provider }) => (
            <a href={url} target='_blank' rel="noreferrer">
              <WrapItem>
                <Box w='400px' h='310px' bg='purple.200' p='2' border='1px' align='center'>

                  <Text fontWeight='bold' as='samp'>
                    {name.length > 85 ? name.substring(0, 85) + '...' : name}
                  </Text>
                  
                  <br /><br />

                  <Text>
                    {description.length > 110 ? description.substring(0, 110) + '...' : description}
                  </Text>

                  <br />

                  <Image  src={image?.thumbnail?.contentUrl || demoImage} boxSize='75px' border='1px' />
  
                    
                  <Text fontWeight='bold' as='samp'>Source: {provider[0].name}</Text><br />
                  <Text fontSize='xs' as='i'>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                </Box>
              </WrapItem>
              </a>
          ))}  
        </Wrap>  */}

        <Wrap spacing='10px' justify='center'>
          {news.map(({ name, url, description, datePublished, image, provider }, i) => {

            if (!([3, 7, 11].includes(i)))  {
              return (
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
            } else {
              const stock = stocks[(i+1) / 4 - 1]
              return (

                <WrapItem>
                  <Box w='350px' h='215px' bg={'gray.200'} p='2' border='1px' align='center'>
                  <Text fontWeight='bold' as='samp'>{stock?.longName} ({stock?.symbol})</Text>

                  <br /><br />

                  <Text>➤ Market Cap: {stock?.currency} {millify(stock?.marketCap || 1)}</Text>
                  <Text>➤ Price: {stock?.currency} {stock?.regularMarketPrice}</Text>
                  <Text>➤ Volume: {millify(stock?.regularMarketVolume || 1)}</Text>

                  <br />

                  <Popover>
                    <PopoverTrigger>
                        <Button rightIcon={<AiOutlineQuestionCircle />} colorScheme='purple' variant='solid' size='xs'>More Info</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Box fontSize='xs'>

                            <Text fontWeight='bold'>• Market Cap: {stock?.currency} {millify(stock?.marketCap || 1)}</Text>
                            <Text fontWeight='bold'>• Price: {stock?.currency} {stock?.regularMarketPrice}</Text>

                            <Text>• Region: {stock?.region}</Text>
                            <Text>• Exchange: {stock?.fullExchangeName}</Text>

                            <Text>• Bid: {stock?.currency} {stock?.bid}</Text>
                            <Text>• Ask: {stock?.currency} {stock?.ask}</Text>

                            <Text>• Day Range: {stock?.currency} {stock?.regularMarketDayRange}</Text>
                            <Text>• 52 Week Range: {stock?.currency} {stock?.fiftyTwoWeekRange}</Text>

                            <Text>• Previous Close: {stock?.currency} {stock?.regularMarketPreviousClose}</Text>
                            <Text>• Market Open: {stock?.currency} {stock?.regularMarketOpen}</Text>

                            <Text>• EPS TTM: {stock?.currency} {stock?.epsTrailingTwelveMonths}</Text>
                            <Text>• EPS FORWARD: {stock?.currency} {stock?.epsForward}</Text>
                            <Text>• EPS CURRENT YEAR: {stock?.currency} {stock?.epsCurrentYear}</Text>

                            <Text>• Book Value: {stock?.bookValue}</Text>

                            <Text>• 50 Day Average: {stock?.currency} {stock?.fiftyDayAverage}</Text>
                            <Text>• 200 Day Average: {stock?.currency} {stock?.twoHundredDayAverage}</Text>

                            <Text>• Forward PE: {stock?.forwardPE}</Text>
                            <Text>• Price to Book: {stock?.priceToBook}</Text>

                            <Text>• Shares Outstanding: {millify(stock?.sharesOutstanding || 1)}</Text>
                            <Text>• Volume: {millify(stock?.regularMarketVolume || 1)}</Text>

                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                  </Popover>
                  </Box>  
                </WrapItem>

               

                    
              )
            }



          })}  
        </Wrap> 

      

      </Box>
  )
};

export default HomePage;
