import React, { useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { SimpleGrid, Box, Text, Table, Tbody, Th, Td, Tr, Thead, Popover, PopoverTrigger, Button, PopoverContent, PopoverCloseButton, PopoverBody, PopoverArrow, List } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import millify from 'millify'



const StockSustainabilityComponent = ({ esgScores }) => {

  
  const controversy = { '0': 'None', '1': 'Low Controversy level', '2': 'Moderate Controversy level', '3': 'Significant Controversy level', '4': 'High Controversy level', '5': 'Severe Controversy Level', }
  const allProductAreas = ['adult', 'alcoholic', 'animalTesting', 'controversialWeapons',  'smallArms', 'furLeather', 'gambling', 'gmo', 'militaryContract', 'nuclear', 'pesticides', 'palmOil', 'coal', 'tobacco']


  const [showTooltip1, setShowTooltip1] = useState(false)
  const [showTooltip2, setShowTooltip2] = useState(false)
  
  if (!esgScores) return 'No Sustainability Info Found...'

  const renderProductInvolvementAreas = () => {
    const areas = []

    for (let product of allProductAreas) {
      if (esgScores[product]) {
        areas.push(product)
      }
    }

    return areas.length > 0 ? (
       <UnorderedList>
         {areas.map(item => (
           <ListItem>{item}</ListItem>
         ))}
       </UnorderedList>
    ) : (
      <>
      <br/>
      <Text>None</Text>
      </>
    )

  }

  const renderQuestionOne = () => (
    <Popover>
      <PopoverTrigger>
        <Button size='xs' bg='purple.200'><AiOutlineQuestionCircle /></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody fontSize='xs' fontWeight='normal'>Sustainalytics’ ESG Risk Ratings assess the degree to which a company’s enterprise business value is at risk driven by environmental, social and governance issues. The rating employs a two-dimensional framework that combines an assessment of a company’s exposure to industry-specific material ESG issues with an assessment of how well the company is managing those issues. The final ESG Risk Ratings scores are a measure of unmanaged risk on an absolute scale of 0-100, with a lower score signaling less unmanaged ESG Risk.</PopoverBody>
      </PopoverContent>
  </Popover>
  )

  const renderQuestionTwo = () => (
    <Popover>
      <PopoverTrigger>
        <Button size='xs' bg='purple.200'><AiOutlineQuestionCircle /></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody fontSize='xs' fontWeight='normal'>Sustainalytics’ Controversies Research identifies companies involved in incidents and events that may negatively impact stakeholders, the environment or the company’s operations. Controversies are rated on a scale from one to five with five denoting the most serious controversies with the largest potential impact.</PopoverBody>
      </PopoverContent>
    </Popover>
  )

  const renderQuestionThree = () => (
      <Popover>
        <PopoverTrigger>
          <Button size='xs' bg='purple.200'><AiOutlineQuestionCircle /></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody fontSize='xs' fontWeight='normal'>Flags a company’s involvement in products, services and business activities commonly used for screening purposes.</PopoverBody>
        </PopoverContent>
      </Popover>
  )

  return (
    <>
       <SimpleGrid columns={1} p='5' as='samp' w={{ base: '200%', xl: '100%' }}>
        <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>

            <Text fontWeight='bold' as='mark' mr='1'>Environment, Social and Governance (ESG) Risk Ratings</Text>{renderQuestionOne()}<br />
            <Text as='i'>(Peers' Values)</Text>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Total ESG Score</Th>
                        <Th>Environment Risk Score</Th>
                        <Th>Social Risk Score</Th>
                        <Th>Governance Risk Score</Th>
                    </Tr>
                </Thead>
                <Tbody>
                        <Tr>
                            <Td>{esgScores.totalEsg.fmt || 'N/A'} = {esgScores.percentile.fmt || 'N/A'} percentile</Td>
                            <Td>{esgScores.environmentScore?.fmt ? `${esgScores.environmentScore.fmt} (${millify(esgScores.peerEnvironmentPerformance?.avg || 0) || 'N/A'})` : 'N/A'}</Td>
                            <Td>{esgScores.socialScore?.fmt ? `${esgScores.socialScore.fmt} (${millify(esgScores.peerSocialPerformance?.avg || 0) || 'N/A'})` : 'N/A'}</Td>
                            <Td>{esgScores.governanceScore?.fmt ? `${esgScores.governanceScore.fmt} (${millify(esgScores.peerGovernancePerformance?.avg || 0) || 'N/A'})` : 'N/A'}</Td>
                        </Tr>                    
                </Tbody>
            </Table>
      </Box>
    </SimpleGrid>

    <SimpleGrid columns={1} p='5' as='samp' w={{ base: '200%', xl: '100%'}}>
        <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>

            <Text fontWeight='bold' as='mark' mr='1'>Controversy Level</Text>{renderQuestionTwo()}
            <Text fontWeight='bold' fontSize='2xl'>{esgScores.highestControversy} - {controversy[esgScores.highestControversy]}</Text><br />

            <Slider fontSize={{ base: 'xs', xl: 'sm'}} value={Number(esgScores.highestControversy)} min={0} max={5} onMouseEnter={() => setShowTooltip1(true)} onMouseLeave={() => setShowTooltip1(false)}>
              <SliderMark value={0} mt='1' ml='-2.5'><Text fontWeight='bold'>0 None</Text></SliderMark>
              <SliderMark value={1} mt='1' ml='-2.5'><Text fontWeight='bold'>1 Low</Text></SliderMark>
              <SliderMark value={2} mt='1' ml='-2.5'><Text fontWeight='bold'>2 Moderate</Text></SliderMark>
              <SliderMark value={3} mt='1' ml='-2.5'><Text fontWeight='bold'>3 Significant</Text></SliderMark>
              <SliderMark value={4} mt='1' ml='-2.5'><Text fontWeight='bold'>4 High</Text></SliderMark>
              <SliderMark value={5} mt='1' ml='-2.5'><Text fontWeight='bold'>5 Severe</Text></SliderMark>
              <SliderTrack bg='purple.100'>
              <Tooltip
                  hasArrow
                  bg='yellow.300'
                  color='black'
                  placement='top'
                  isOpen={showTooltip1}
                  label={esgScores.highestControversy}
                >
                  <SliderThumb />
                </Tooltip>
                <Box position='relative' right={10} />
                <SliderFilledTrack bg='yellow.300' />
              </SliderTrack>
              <SliderThumb boxSize={3} />
            </Slider>

            <br /><br /><br /><br /><br />

            <Text fontWeight='bold' fontSize='2xl'>Peers' Controversy Level</Text><br />  

            <Slider fontSize={{ base: 'xs', xl: 'sm'}} value={Number(esgScores.peerHighestControversyPerformance.avg)} min={0} max={5} onMouseEnter={() => setShowTooltip2(true)} onMouseLeave={() => setShowTooltip2(false)}>
              <SliderMark value={0} mt='1' ml='-2.5'><Text fontWeight='bold'>0 None</Text></SliderMark>
              <SliderMark value={1} mt='1' ml='-2.5'><Text fontWeight='bold'>1 Low</Text></SliderMark>
              <SliderMark value={2} mt='1' ml='-2.5'><Text fontWeight='bold'>2 Moderate</Text></SliderMark>
              <SliderMark value={3} mt='1' ml='-2.5'><Text fontWeight='bold'>3 Significant</Text></SliderMark>
              <SliderMark value={4} mt='1' ml='-2.5'><Text fontWeight='bold'>4 High</Text></SliderMark>
              <SliderMark value={5} mt='1' ml='-2.5'><Text fontWeight='bold'>5 Severe</Text></SliderMark>
              <SliderTrack bg='purple.100'>
              <Tooltip
                  hasArrow
                  bg='yellow.300'
                  color='black'
                  placement='top'
                  isOpen={showTooltip2}
                  label={millify(esgScores.peerHighestControversyPerformance.avg || 0)}
                >
                  <SliderThumb />
                </Tooltip>
                <Box position='relative' right={10} />
                <SliderFilledTrack bg='yellow.300' />
              </SliderTrack>
              <SliderThumb boxSize={3} />
            </Slider>
      </Box>
    </SimpleGrid>

    <SimpleGrid columns={2} p='5' as='samp' fontSize={{ base: 'sm', xl: 'md'}}>
        <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>
            <Text fontWeight='bold' as='mark' mr='1'>Related Controversy</Text>

            {!esgScores.relatedControversy ? (
              <>
              <br />
              <Text>None</Text>
              </>
              ) : (
              <UnorderedList>
                  {esgScores.relatedControversy.map(item => (
                    <ListItem>{item}</ListItem>
                  ))}
              </UnorderedList>
              
            )}
    
      </Box>

      <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>
            <Text fontWeight='bold' as='mark' mr='1'>Product Involvement Areas</Text>{renderQuestionThree()}

            {renderProductInvolvementAreas() || 'None'}
    
      </Box>
    </SimpleGrid>
    
    
    
    </>
  )
}

export default StockSustainabilityComponent