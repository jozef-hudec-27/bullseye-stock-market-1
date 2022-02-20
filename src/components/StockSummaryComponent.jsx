import React from 'react'
import { SimpleGrid, Box, Text } from '@chakra-ui/react'
import millify from 'millify'
import BarChart from './BarChart'

const StockSummaryComponent = ({ details, currentEPS, currentPrice, earningsHistory }) => {

    const estPriceChange = details.financialData?.targetMeanPrice.raw - details.price.regularMarketPrice.raw
    const sign = estPriceChange >= 0 ? '+' : ''
    const estPiceChangePercent = millify((estPriceChange / details.price.regularMarketPrice.raw) || 0) * 100

  return (
      <>
        <SimpleGrid columns={2} spacing={0} p='5' fontSize={{ xl: '2xl', base: 'sm' }} as='samp'>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>
                <Text as='mark'>Previous Close:</Text> {details.summaryDetail.previousClose.fmt} <br />
                <Text as='mark'>Open:</Text> {details.summaryDetail.open.fmt} <br />
                <Text as='mark'>Bid:</Text> {details.summaryDetail.bid.fmt} <br />
                <Text as='mark'>Ask:</Text> {details.summaryDetail.ask.fmt} <br />
                <Text as='mark'>Day's Range:</Text> {details.summaryDetail.dayLow.fmt} - {details.summaryDetail.dayHigh.fmt} <br />
                <Text as='mark'>52 Week Range:</Text> {details.summaryDetail.fiftyTwoWeekLow.fmt} - {details.summaryDetail.fiftyTwoWeekHigh.fmt} <br />
                <Text as='mark'>Volume:</Text> {details.summaryDetail.volume.fmt || 'N/A'} <br />
                <Text as='mark'>Avg. Volume:</Text> {details.summaryDetail.averageVolume.fmt || 'N/A'} <br />
                <Text as='mark'>Price to Book:</Text> {details.defaultKeyStatistics?.priceToBook.fmt || 'N/A'}
            </Box>
            <Box bg='#B794F4' p='10' height={{ bg: '500px', sm: '800px' }}>
                <Text as='mark'>Market Cap:</Text> {details.price.marketCap.fmt} <br />
                <Text as='mark'>Beta:</Text> {details.summaryDetail.beta.fmt || 'N/A'} <br />
                <Text as='mark'>PE Ratio:</Text> {millify((Number(currentPrice) / Number(currentEPS)) || 0) || 'N/A'} <br />
                <Text as='mark'>EPS (TTM):</Text> {details.defaultKeyStatistics?.trailingEps.fmt || 'N/A'} <br />
                <Text as='mark'>Recommendation:</Text> {details.financialData?.recommendationKey.split('_').join(' ') || 'N/A'} <br />
                <Text as='mark'>Forward Dividend & Yield:</Text> {!(details.summaryDetail.dividendRate.fmt) ? 'N/A' : `${details.summaryDetail.dividendRate.fmt}(${details.summaryDetail.dividendYield.fmt})`} <br />
                <Text as='mark'>Ex-Dividend Date:</Text> {details.summaryDetail.exDividendDate.fmt || 'N/A'} <br />
                <Text as='mark'>1y Target Est:</Text> {details.financialData?.targetMeanPrice.fmt || 'N/A'} {details.financialData?.targetMeanPrice?.fmt && `(${sign}${estPiceChangePercent}%)`} <br />
                <Text as='mark'>Target Est. Range:</Text> {!details.financialData?.targetLowPrice.fmt ? 'N/A' : `${details.financialData?.targetLowPrice.fmt} - ${details.financialData?.targetHighPrice.fmt}`}
            </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} p='5' fontSize='2xl'>
        <Box bg='#B794F4' p='10' height={{ bg: '500px', sm: '800px' }}>
            <BarChart earningsHistory={earningsHistory} />
        </Box>
        </SimpleGrid>
    </>
)
}

export default StockSummaryComponent