import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import { Text, Box, RadioGroup, Stack, Radio, Center } from '@chakra-ui/react';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as TitleChartJS,
    Tooltip,
    Legend
  } from 'chart.js';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TitleChartJS,
    Tooltip,
    Legend
  );



const LineChart = ({ stockHistory, currentPrice, stockName, currency, setRange, range }) => {
    
    const coinPrice = []
    const coinTimeStamp = []

    const history = stockHistory[1]
    const timestamp = stockHistory[0]

    const color = history[0] > history[history.length - 1] ? '#ff2631' : '#42f572'

    for (let i = 0; i < history.length; i+=1) {
        coinPrice.push(history[i])
        coinTimeStamp.push(new Date(timestamp[i] * 1000).toLocaleDateString())
 
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: `Price in ${currency}`,
                data: coinPrice,
                fill: false,
                backgroundColor: color,
                borderColor: color,
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
 
  return (
      <Box align='center' justify='center' alignItems='center' alignContent='center' justifyItems='center' justifyContent='center'>
            <br />
            <Box className='chart-header'>
                <Text fontSize='4xl' as='samp'>{stockName} Price Chart</Text>
                <Box className='price-container'>
                    <Box className='current-price' >Current {stockName} Price: {currency} {currentPrice}</Box>
                </Box>
            </Box>
            
            <Center>
                <RadioGroup size='sm' value={range} onChange={(value) => setRange(value)} colorScheme='purple' mt='2' mb='2' p='1'>
                    <Stack direction='row'>
                        <Radio value='1d'>1 Day</Radio>
                        <Radio value='5d'>5 Days</Radio>
                        <Radio value='3mo'>3 Months</Radio>
                        <Radio value='6mo'>6 Months</Radio>
                        <Radio value='1y'>1 Year</Radio>
                        <Radio value='5y'>5 Years</Radio>
                        <Radio value='max'>Max</Radio>
                    </Stack>
                </RadioGroup>
            </Center>
            
        

         <Line data={data} options={options} />
     </Box>
  )
};




export default LineChart;
