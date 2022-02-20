import { Link } from 'react-router-dom'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Image, Text, Input   } from '@chakra-ui/react'
import { FcMenu } from 'react-icons/fc'
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiNews } from 'react-icons/bi'

const Navbar = () => {
    const [searchedStock, setSearchedStock] = useState('')
    const navigate = useNavigate()


  return (
        <Flex  boxShadow='lg' p='3' rounded='md' bg='white'>

            {/* <Image src={Logo} alt="globe" boxSize='70px' /> */}
            <Box fontWeight='bold' _hover={{  textShadow: '1px 1px 3px #999999' }}>
                <Link to='/'>
                    <Text color='purple.600' fontSize='3xl'>Bullseye</Text>
                    <Text fontSize='sm' as='samp'>stock market</Text>
                </Link>
            </Box>
            
            <Spacer />

            <Input placeholder='Search Stokcs by Name' width='500px' m='10px' value={searchedStock} onChange={e => setSearchedStock(e.target.value)} focusBorderColor='purple.400' />
            <IconButton
                colorScheme='purple'
                aria-label='Search database'
                icon={<BsSearch />}
                mt='10px'
                onClick={() => {
                    if (searchedStock) {
                        navigate(`/search/${searchedStock}`)
                    } else (
                        navigate('/')
                    )
                }}
                
                />

            <Spacer />

            <Box>
                <Menu>
                    <MenuButton as={IconButton} icon={<FcMenu />} variant='outlined' color='purple.600' />
                    <MenuList>

                        <Link to='/news'>
                            <MenuItem icon={<BiNews />}>News</MenuItem>
                        </Link>


                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    )
};

export default Navbar;