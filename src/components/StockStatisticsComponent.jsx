import React from 'react'
import { Text, Box, SimpleGrid } from '@chakra-ui/react'
const StockStatisticsComponent = ({ details: { summaryDetail, price, financialData, defaultKeyStatistics } }) => {

  return (
      <>
        <SimpleGrid columns={3} spacing={2} p={{ base: '1', xl: '5' }} as='samp' fontSize={{ base: 'xs', xl: 'md' }}>
            <Box bg='#B794F4' height={{ bg: '600px', sm: '800px' }} p={{ base: '2', xl: '10' }}>
                <Text fontWeight='bold' as='mark'>Valuation Measures</Text>
                <Text>Market Cap: {summaryDetail.marketCap.fmt || 'N/A'}</Text>
                <Text>Enterprise Value: {defaultKeyStatistics?.enterpriseValue.fmt || 'N/A'}</Text>
                <Text>Trailing PE: {summaryDetail.trailingPE?.fmt || 'N/A'}</Text>
                <Text>Forward PE: {summaryDetail.forwardPE.fmt || 'N/A'}</Text>
                <Text>PEG Ratio: {defaultKeyStatistics?.pegRatio.fmt || 'N/A'}</Text>
                <Text>Price/Sales TTM: {summaryDetail.priceToSalesTrailing12Months.fmt || 'N/A'}</Text>
                <Text>Price/Book MRQ: {defaultKeyStatistics?.priceToBook.fmt || 'N/A'}</Text>
                <Text>Enterprise Value/Revenue: {defaultKeyStatistics?.enterpriseToRevenue.fmt || 'N/A'}</Text>
                <Text>Enterprise Value/EBITDA: {defaultKeyStatistics?.enterpriseToEbitda.fmt || 'N/A'}</Text>
            </Box>

            <Box bg='#B794F4' p={{ base: '2', xl: '10' }} height={{ bg: '500px', sm: '800px' }}>
                <Text fontWeight='bold' as='mark'>Fiscal Year</Text>
                <Text>Fiscal Year Ends: {defaultKeyStatistics?.lastFiscalYearEnd.fmt || 'N/A'}</Text>
                <Text>Most Recent Quarter: {defaultKeyStatistics?.mostRecentQuarter.fmt || 'N/A'}</Text><br />
                <Text fontWeight='bold' as='mark'>Profitability</Text>
                <Text>Profit Margin: {financialData.profitMargins.fmt || 'N/A'}</Text>
                <Text>Operating Margin TTM: {financialData.operatingMargins.fmt || 'N/A'}</Text><br />
                <Text fontWeight='bold' as='mark'>Management Effectiveness</Text>
                <Text>Return on Assets TTM: {financialData.returnOnAssets.fmt || 'N/A'}</Text>
                <Text>Return on Equity TTM: {financialData.returnOnEquity.fmt || 'N/A'}</Text>
            </Box>

            <Box bg='#B794F4' p={{ base: '2', xl: '10' }} height={{ bg: '500px', sm: '800px' }}>
                <Text fontWeight='bold' as='mark'>Income Statement</Text>
                <Text>Revenue TTM: {financialData.totalRevenue.fmt || 'N/A'}</Text>
                <Text>Revenue Per Share: {financialData.revenuePerShare.fmt || 'N/A'}</Text>
                <Text>Quarterly Revenue Growth (yoy): {defaultKeyStatistics?.revenueQuarterlyGrowth.fmt || 'N/A'}</Text>
                <Text>EBITDA: {financialData.ebitda.fmt || 'N/A'}</Text>
                <Text>Net Income Avi to Common TTM: {defaultKeyStatistics?.netIncomeToCommon.fmt || 'N/A'}</Text>
                <Text>Quarterly Earnings Growth (yoy): {defaultKeyStatistics?.earningsQuarterlyGrowth.fmt || 'N/A'}</Text><br />
                <Text fontWeight='bold' as='mark'>Balance Sheet</Text>
                <Text>Total Cash (mrq): {financialData.totalCash.fmt || 'N/A'}</Text>
                <Text>Total Cash Per Share (mrq): {financialData.totalCashPerShare.fmt || 'N/A'}</Text>
                <Text>Total Debt (mrq): {financialData.totalDebt.fmt || 'N/A'}</Text>
                <Text>Total Debt/Equity (mrq): {financialData.debtToEquity.fmt || 'N/A'}</Text>
                <Text>Current Ratio (mrq): {financialData.currentRatio.fmt || 'N/A'}</Text>
                <Text>Book Value Per Share (mrq): {defaultKeyStatistics?.bookValue.fmt || 'N/A'}</Text><br />
                <Text fontWeight='bold' as='mark'>Cashflow Statement</Text>
                <Text>Operating Cashflow TTM: {financialData.operatingCashflow.fmt || 'N/A'}</Text>
            </Box>
        </SimpleGrid>

        <SimpleGrid columns={3} spacing={2} p={{ base: '1', xl: '5' }} mt={{ base: '0', xl: '-8' }} as='samp' fontSize={{ base: 'xs', xl: 'md' }}>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p={{ base: '2', xl: '10' }}>
                <Text fontWeight='bold' as='mark'>Stock Price History</Text>
                <Text>Beta (5Y Monthly): {summaryDetail.beta.fmt || 'N/A'}</Text>
                <Text>52-Week Change: {defaultKeyStatistics?.['52WeekChange'].fmt || 'N/A'}</Text>
                <Text>S&P500 52-Week Change: {defaultKeyStatistics?.SandP52WeekChange.fmt || 'N/A'}</Text>
                <Text>52 Week High: {summaryDetail.fiftyTwoWeekHigh.fmt || 'N/A'}</Text>
                <Text>52 Week Low: {summaryDetail.fiftyTwoWeekLow.fmt || 'N/A'}</Text>
                <Text>50-Day Moving Average: {summaryDetail.fiftyDayAverage.fmt || 'N/A'}</Text>
                <Text>200-day Moving Average: {summaryDetail.twoHundredDayAverage.fmt || 'N/A'}</Text>
            </Box>

            <Box bg='#B794F4' p={{ base: '2', xl: '10' }} height={{ bg: '500px', sm: '800px' }}>
                <Text fontWeight='bold' as='mark'>Share Statistics</Text>
                <Text>Avg Vol(3 Month): {price.averageDailyVolume3Month.fmt || 'N/A'}</Text>
                <Text>Avg Vol(10 Day): {price.averageDailyVolume10Day.fmt || 'N/A'}</Text>
                <Text>Shares Outstanding: {defaultKeyStatistics?.sharesOutstanding.fmt || 'N/A'}</Text>
                <Text>Implied Shares Outstanding: {defaultKeyStatistics?.impliedSharesOutstanding.fmt || 'N/A'}</Text>
                <Text>Float: {defaultKeyStatistics?.floatShares.fmt || 'N/A'}</Text>
                <Text>% Held by Insiders: {defaultKeyStatistics?.heldPercentInsiders.fmt || 'N/A'}</Text>
                <Text>% Held by Institutions: {defaultKeyStatistics?.heldPercentInstitutions.fmt}</Text>
                <Text>Shares Short: {defaultKeyStatistics?.sharesShort.fmt || 'N/A'}</Text>
                <Text>Short Ratio: {defaultKeyStatistics?.shortRatio.fmt || 'N/A'}</Text>
                <Text>Short % of Float: {defaultKeyStatistics?.shortPercentOfFloat.fmt || 'N/A'}</Text>
                <Text>Short % of Shares Outstanding: {defaultKeyStatistics?.sharesPercentSharesOut.fmt || 'N/A'}</Text>
                <Text>Shares Short (Prior Month): {defaultKeyStatistics?.sharesShortPriorMonth.fmt || 'N/A'}</Text>
            </Box>

            <Box bg='#B794F4' p={{ base: '2', xl: '10' }} height={{ bg: '500px', sm: '800px' }}>
                <Text fontWeight='bold' as='mark'>Dividends & Splits</Text>
                <Text>Forward Annual Dividend Rate: {summaryDetail.dividendRate.fmt || 'N/A'}</Text>
                <Text>Forward Annual Dividend Yield: {summaryDetail.dividendYield.fmt || 'N/A'}</Text>
                <Text>Trailing Annual Dividend Rate: {summaryDetail.trailingAnnualDividendRate.fmt || 'N/A'}</Text>
                <Text>Trailing Annual Dividend Yield: {summaryDetail.trailingAnnualDividendYield.fmt || 'N/A'}</Text>
                <Text>5 Year Average Dividend Yield: {summaryDetail.fiveYearAvgDividendYield.fmt || 'N/A'}</Text>
                <Text>Payout Ratio: {summaryDetail.payoutRatio.fmt || 'N/A'}</Text>
                <Text>Last Dividend Date: {defaultKeyStatistics?.lastDividendDate.fmt || 'N/A'}</Text>
                <Text>Ex-Dividend Date: {summaryDetail.exDividendDate.fmt || 'N/A'}</Text>
                <Text>Last Split Factor: {defaultKeyStatistics?.lastSplitFactor || 'N/A'}</Text>
                <Text>Last Split Date: {defaultKeyStatistics?.lastSplitDate.fmt || 'N/A'}</Text>
            </Box>
        </SimpleGrid>
    </>

    
  )
}

export default StockStatisticsComponent