import React, { useState } from 'react'
import { Box, Text, Select, SimpleGrid, Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react'


const renderMajorHolders = (majorHoldersBreakdown, institutionOwnership, fundOwnership) => (
  <Box>
      <Text fontWeight='bold' as='mark' fontSize='3xl'>Major Holders</Text><br />

      <SimpleGrid columns={1} p='5' as='samp'>
        <Box bg='#B794F4' height={{ bg: '600px', sm: '800px' }} p='10'>
            <Text fontWeight='bold' as='mark'>Breakdown</Text>
            <Text>% of Shares Held by All Insiders: {majorHoldersBreakdown?.insidersPercentHeld.fmt || 'N/A'}</Text>
            <Text>% of Shares Held by Institutions: {majorHoldersBreakdown?.institutionsPercentHeld.fmt || 'N/A'}</Text>
            <Text>% of Float Held by Institutions: {majorHoldersBreakdown?.institutionsFloatPercentHeld.fmt || 'N/A'}</Text>
            <Text>Number of Institutions Holding Shares: {majorHoldersBreakdown?.institutionsCount.longFmt || 'N/A'}</Text>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={1} spacing={0} p='5' as='samp' w={{ base: '200%', xl: '100%' }} fontSize={{ base: 'sm', xl: 'md'}}>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>
                <Text as='mark' fontWeight='bold'>Top Institutional Holders</Text>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Holder</Th>
                            <Th>Shares</Th>
                            <Th>Date Reported</Th>
                            <Th>% Out</Th>
                            <Th>Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {institutionOwnership.ownershipList.map(({ organization, position, reportDate, pctHeld, value }) => (
                            <Tr>
                                <Td>{organization || 'N/A'}</Td>
                                <Td>{position.longFmt || 'N/A'}</Td>
                                <Td>{reportDate.fmt || 'N/A'}</Td>
                                <Td>{pctHeld.fmt || 'N/A'}</Td>
                                <Td>{value.longFmt || 'N/A'}</Td>
                            </Tr>
                        ))}
                        
                    </Tbody>
                </Table>
            </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} spacing={0} p='5' as='samp' w={{ base: '200%', xl: '100%' }} fontSize={{ base: 'sm', xl: 'md'}}>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>
                <Text as='mark' fontWeight='bold'>Top Mutual Fund Holders</Text>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Holder</Th>
                            <Th>Shares</Th>
                            <Th>Date Reported</Th>
                            <Th>% Out</Th>
                            <Th>Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {fundOwnership.ownershipList.map(({ organization, position, reportDate, pctHeld, value }) => (
                            <Tr>
                                <Td>{organization || 'N/A'}</Td>
                                <Td>{position.longFmt || 'N/A'}</Td>
                                <Td>{reportDate.fmt || 'N/A'}</Td>
                                <Td>{pctHeld.fmt || 'N/A'}</Td>
                                <Td>{value.longFmt || 'N/A'}</Td>
                            </Tr>
                        ))}
                        
                    </Tbody>
                </Table>
            </Box>
        </SimpleGrid>

  </Box>
)

const renderInsiderRoster = (insiderHolders) => (
    <Box>
      <Text fontWeight='bold' as='mark' fontSize='3xl'>Insider Roster</Text><br />

      <SimpleGrid columns={1} spacing={0} p='5' as='samp' w={{ base: '200%', xl: '100%' }}>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Individual or Entity</Th>
                            <Th>Most Recent Transaction</Th>
                            <Th>Date</Th>
                            <Th>Shares Owned as of Transaction Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {insiderHolders.holders.map(({ name, relation, transactionDescription, latestTransDate, positionDirect }) => (
                            <Tr>
                                <Td>{name} ({relation})</Td>
                                <Td>{transactionDescription || 'N/A'}</Td>
                                <Td>{latestTransDate.fmt || 'N/A'}</Td>
                                <Td>{positionDirect?.longFmt || 'N/A'}</Td>
                            </Tr>
                        ))}
                        
                    </Tbody>
                </Table>
            </Box>
        </SimpleGrid>


  </Box>
)

const renderInsiderTransactions = (insiderTransactions) => (
    <Box>
        <Text fontWeight='bold' as='mark' fontSize='3xl'>Insider Transactions</Text><br />

        <SimpleGrid columns={1} spacing={0} p='5' as='samp' w={{ base: '200%', xl: '100%' }}>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Insider</Th>
                            <Th>Transaction</Th>
                            <Th>Type</Th>
                            <Th>Value</Th>
                            <Th>Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {insiderTransactions?.transactions?.slice(0, 30).map(({ filerName, filerRelation, transactionText, ownership, startDate, value }) => (
                            <Tr>
                                <Td>{filerName} ({filerRelation})</Td>
                                <Td>{transactionText || 'N/A'}</Td>
                                <Td>{{ D: 'Direct', I: 'Indirect'}[ownership] || 'N/A'}</Td>
                                <Td>{value?.longFmt || 'N/A'}</Td>
                                <Td>{startDate.fmt || 'N/A'}</Td>
                            </Tr>
                        ))}
                        
                    </Tbody>
                    
                </Table>
            </Box>
        </SimpleGrid>


    </Box>
)


const StockHoldersComponent = ({ details: { institutionOwnership, majorHoldersBreakdown, insiderHolders, insiderTransactions, fundOwnership}}) => {
  
  const [page, setPage] = useState('majorHolders')
  
  return (
    <>
        <Select placeholder='Select option' size='sm' w='150px' mt='2' value={page} onChange={e => setPage(e.target.value)}>
            <option value='majorHolders'>Major Holders</option>
            <option value='insiderRoster'>Insider Roster</option>
            <option value='insiderTransactions'>Insider Transactions</option>
        </Select>
        <br />

        {page == 'majorHolders' && renderMajorHolders(majorHoldersBreakdown, institutionOwnership, fundOwnership)}
        {page == 'insiderRoster' && renderInsiderRoster(insiderHolders)}
        {page == 'insiderTransactions' && renderInsiderTransactions(insiderTransactions)}
      
    </>
  )
}

export default StockHoldersComponent