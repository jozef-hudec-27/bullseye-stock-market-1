import React from 'react'
import { Box, Text, SimpleGrid, Table, Thead, Tr, Th, Td, Tbody } from '@chakra-ui/react'




const StockProfileComponent = ({ assetProfile: { address1, city, zip, country, phone, website, industry, sector, longBusinessSummary, fullTimeEmployees, companyOfficers }, name}) => {
  return (
    <>
        <SimpleGrid columns={2} spacing={0} p='5' as='samp' fontSize={{ base: 'xs', xl: 'md' }}>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p='10'>
                <Text as='mark' fontWeight='bold'>{name}</Text>
                <Text>{address1}</Text>
                <Text>{city} {zip}</Text>
                <Text>{country}</Text>
                <Text>{phone}</Text>
                <a href={website} target='_blank' >{website}</a>
            </Box>

            <Box bg='#B794F4' p='10' height={{ bg: '500px', sm: '800px' }}>
                <Text>Sector: {sector || 'N/A'}</Text>
                <Text>Industry: {industry || 'N/A'}</Text>
                <Text>Full Time Employees: {fullTimeEmployees || 'N/A'}</Text>
            </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} p='5' as='samp' w={{ base: '200%', xl: '100%' }} fontSize={{ base: 'xs', xl: 'md' }}>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p={{ base: '2', xl: '10' }}>
                <Text as='mark' fontWeight='bold'>Key Executives</Text>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Title</Th>
                            <Th>Pay</Th>
                            <Th>Exercised</Th>
                            <Th>Age</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {companyOfficers?.map(({ name, age, title, totalPay, exercisedValue }) => (
                            <Tr>
                                <Td>{name || 'N/A'}</Td>
                                <Td>{title || 'N/A'}</Td>
                                <Td>{totalPay?.fmt || 'N/A'}</Td>
                                <Td>{exercisedValue.fmt || 'N/A'}</Td>
                                <Td>{age || 'N/A'}</Td>
                            </Tr>
                        ))}
                        
                    </Tbody>
                </Table>
            </Box>
        </SimpleGrid>

        <SimpleGrid columns={1} spacing={0} p='5' as='samp' fontSize={{ base: 'xs', xl: 'md' }}>
            <Box bg='#B794F4' height={{ bg: '500px', sm: '800px' }} p={{ base: '3', xl: '10' }}>
                <Text as='mark' fontWeight='bold'>Description</Text>
                <Text>
                    {longBusinessSummary || 'N/A'}
                </Text>
            </Box>
        </SimpleGrid>
    </>
  )
}

export default StockProfileComponent