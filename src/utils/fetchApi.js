import axios from 'axios'

// IN THE MAIN DIRECTORY, CREATE A '.env' FILE AND PASTE IN:
// REACT_APP_RAPIDAPI_KEY=*your rapidapi key*

const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY



export const baseSearchUrl = 'https://bing-news-search1.p.rapidapi.com/news'

export const fetchSearchApi = async (url) => {
    const { data: { value } }  = await axios.get(url, {
        headers: {
            'x-bingapis-sdk': 'true',
            'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
            'x-rapidapi-key': RAPIDAPI_KEY
          }
    })
    return value
}

export const fetchTrendingStocks = async () => {
    const options = {
        method: 'GET',
        url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved',
        params: {scrIds: 'day_gainers', count: '25'},
        headers: {
          'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
          'x-rapidapi-key': RAPIDAPI_KEY
        }
      };
      



    const { data: { finance }} = await axios.request(options)
    const result = await finance.result 

    return result
}


export const fetchSearchStock = async (searchTerm) => {
  const options = {
    method: 'GET',
    url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/autocomplete',
    params: {query: searchTerm, lang: 'en'},
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY
    }
  };

  const x = await axios.request(options)
  const { data:  { ResultSet } } = await x

  const stocks = await ResultSet.Result
  
  return stocks
}


export const fetchStockDetails = async (symbol) => {
  const options = {
    method: 'GET',
    url: `https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v11/finance/quoteSummary/${symbol}`,
    params: {modules: 'summaryDetail,price,financialData,defaultKeyStatistics,assetProfile,insiderHolders,majorHoldersBreakdown,insiderTransactions,fundOwnership,institutionOwnership,esgScores,incomeStatementHistory,cashflowStatementHistory,balanceSheetHistory,earningsHistory'},
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY
    }
  };
  
  const x = await axios.request(options)
  const { data:  { quoteSummary } } = await x

  const result = await quoteSummary.result
  const error = await quoteSummary.error

  return [result, error]
}


export const fetchStockHistory = async (symbol, range) => {
  const options = {
    method: 'GET',
    url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v8/finance/spark',
    params: {symbols: symbol, range: range, interval: '1d'},
    headers: {
      'x-rapidapi-host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY
    }
  };

  const x = await axios.request(options)
  const { data } = await x

  if (data.spark) {
    return null
  } else {
    const timestamp = await data[symbol].timestamp
    const history = await data[symbol].close
    return [timestamp, history]
  }

}