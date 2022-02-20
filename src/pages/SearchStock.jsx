import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSearchStock } from '../utils/fetchApi';
import { Box, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { Link } from 'react-router-dom';



const SearchStock = () => {

    const params = useParams()
    const [searchedStock, setSearchedStock] = useState(params.searchedStock)
    const [foundStocks, setFoundStocks] = useState([])
    const [fake, setFake] = useState(0)

    useEffect(async () => {
        const stocks = await fetchSearchStock(searchedStock)
        setFoundStocks(stocks)
    }, [searchedStock])

    useEffect(() => {
      setFake(fake + 1)
    }, [useParams().searchedStock])

    useEffect(() => {
      setSearchedStock(params.searchedStock)
    }, [params])

    if (!foundStocks.length) return 'No Stocks Found'
                                

  return (
    <Box>

      <Table size='md' fontSize={{ xl: 'md', base: 'xs' }}>

          <Thead>
            <Tr>
              <Th>Company Name</Th>
              <Th>Symbol</Th>
              <Th>Exchange</Th>
            </Tr>
          </Thead>

          <Tbody>
            {foundStocks?.map(({ symbol, name, exchDisp }) => (
                <Tr>
                <Td>
                  <Link to={`/stock/${symbol}`}>{name}</Link>
                </Td>
                <Td>{symbol}</Td>
                <Td>{exchDisp}</Td>
              </Tr>
            ))}

            
          
          </Tbody>
  
        </Table><br /><br /><br /><br /><br />

    </Box>
  )
};

export default SearchStock;
