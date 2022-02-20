import React from 'react';
import { Bar } from 'react-chartjs-2'
import { Text, Box, RadioGroup, Stack, Radio, Center } from '@chakra-ui/react';


import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)



const BarChart = ({ earningsHistory }) => {

    if (!earningsHistory || !earningsHistory?.history) return ''
    
    const epsData = []
    const epsLabels = []

    const color = earningsHistory.history[0].epsActual.raw > earningsHistory.history[earningsHistory.history.length - 1].epsActual.raw ? '255, 0, 0' : '0,255, 0'

    for (let item of earningsHistory?.history) {
        epsData.push(item?.epsActual?.raw)
        epsLabels.push(item?.quarter?.fmt)
    }

    const data = {
        labels: epsLabels,
        datasets: [{
          label: 'Earnings Per Share',
          data: epsData,
          backgroundColor: `rgba(${color}, 0.2)`,
          borderColor: `rgb(${color})`,
          borderWidth: 1
        }]
      };

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

         <Bar data={data} options={options} />
     </Box>
  )
};




export default BarChart;
