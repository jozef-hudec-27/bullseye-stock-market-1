import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchStockDetails, fetchStockHistory } from '../utils/fetchApi'
import LineChart from '../components/LineChart'
import { Box, Text, Select } from '@chakra-ui/react'
import StockSummaryComponent from '../components/StockSummaryComponent'
import StockStatisticsComponent from '../components/StockStatisticsComponent'
import StockProfileComponent from '../components/StockProfileComponent'
import StockHoldersComponent from '../components/StockHoldersComponent'
import StockSustainabilityComponent from '../components/StockSustainabilityComponent'
import StockFinancialsComponent from '../components/StockFinancialsComponent'
import { baseSearchUrl, fetchSearchApi } from '../utils/fetchApi';
import StockNewsComponent from '../components/StockNewsComponent'

const StockDetails = ({ range, setRange }) => {
    const { stockSymbol } = useParams()
    const [details, setDetails] = useState(null)
    const [error, setError] = useState(true)
    const [stockHistory, setStockHistory] = useState(null)
    const [stockOption, setStockOption] = useState('summary')
    const [stockNews, setStockNews] = useState([])
     
    useEffect(async () => {
        const detailsData = await fetchStockDetails(stockSymbol)
        setDetails(detailsData[0][0])
        setError(detailsData[1])

        const historyData = await fetchStockHistory(stockSymbol, range)
        setStockHistory(historyData)
    }, [range])
       
    useEffect(async () => {
      const longName = details?.price?.longName
      const shortName = details?.price?.shortName
      const symbol = details?.price?.symbol
      const newsResults = await fetchSearchApi(`${baseSearchUrl}/search?q=${longName},${shortName},${symbol}&freshness=Week&count=8`)
      setStockNews(newsResults)
    }, [details])


    if (error || !stockHistory) return 'Stock Not Found'

    const afterPeriodMC = details.price.regularMarketPrice.fmt?.split('.')[1]
    const beforePeriodMC = details.price.regularMarketPrice.fmt?.split('.')[0].split(',').join('')
    const currentPrice = `${beforePeriodMC}.${afterPeriodMC}`

    const afterPeriodEPS = details.defaultKeyStatistics?.trailingEps.fmt?.split('.')[1]
    const beforePeriodEPS = details.defaultKeyStatistics?.trailingEps.fmt?.split('.')[0].split(',').join('')
    const currentEPS = `${beforePeriodEPS}.${afterPeriodEPS}`

  return (
    <Box align='center'>
      <LineChart stockHistory={stockHistory} currentPrice={details?.price?.regularMarketPrice?.fmt} stockName={stockSymbol} currency={details?.summaryDetail?.currency} range={range} setRange={setRange} />
      
      <Text as='sub'>{details.price.exchangeName} - {details.price.quoteSourceName +'.'} Currency in {details?.summaryDetail?.currency}</Text>
      
      <Select placeholder='Select option' size='sm' w='150px' mt='2' value={stockOption} onChange={e => setStockOption(e.target.value)}>
        <option value='summary'>Summary</option>
        <option value='statistics'>Statistics</option>
        <option value='profile'>Profile</option>
        <option value='financials'>Financials</option>
        <option value='holders'>Holders</option>
        <option value='sustainability'>Sustainability</option>
        <option value='news'>News</option>
      </Select>

      {stockOption === 'summary' && <StockSummaryComponent details={details} currentPrice={currentPrice} currentEPS={currentEPS} earningsHistory={details.earningsHistory}/>}
      {stockOption === 'statistics' && <StockStatisticsComponent details={details} />}
      {stockOption === 'profile' && <StockProfileComponent assetProfile={details.assetProfile || []} name={details.price.longName} />}
      {stockOption === 'holders' && <StockHoldersComponent details={details} />}
      {stockOption === 'sustainability' && <StockSustainabilityComponent esgScores={details.esgScores} />}
      {stockOption === 'financials' && <StockFinancialsComponent details={details} />}
      {stockOption === 'news' && <StockNewsComponent stockNews={stockNews} searchQuery={`${details.price.longName},${details.price.shortName},${details.price.symbol}`}/>}

      
    </Box>
  )
}

export default StockDetails