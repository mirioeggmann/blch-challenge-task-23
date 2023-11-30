import { Box, Button, HStack, Input, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { Eth } from '@web3uikit/icons';
import { FC } from 'react';
import { useContractWrite } from 'wagmi';
import { loadAbi } from '../../../utils/ethereumUtils';

export interface NFTCardSellParams {
    key: number;
    nft: EvmNft;
}

const NFTCard: FC<NFTCardSellParams> = ({ nft }) => {
    const bgColor = useColorModeValue('none', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const descBgColor = useColorModeValue('gray.100', 'gray.600');

    const exchangeContractAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS as `0x{string}`;

    const { write: createListingWrite } = useContractWrite({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'createListing',
    });

    function createListingExec(nftContract: string, tokenId: number, price: BigInt): void {
        createListingWrite({
            args: [nftContract, tokenId, price],
        });
    }

    async function onSubmit(event: any) {
        event.preventDefault();

        const sellingPrice = event.target[0].value;
        const nftContractAdress = event.target[1].value as string;
        const tokenId = event.target[2].value;

        createListingExec(nftContractAdress, tokenId, sellingPrice);
    }

    return (
        <Box
            maxWidth="315px"
            bgColor={bgColor}
            padding={3}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
        >
            <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
                {nft.name}
            </Box>
            <HStack alignItems={'center'}>
                <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
                    {nft.contractType}
                </Box>

                <Eth fontSize="20px" />
            </HStack>
            <SimpleGrid columns={2} spacing={4} bgColor={descBgColor} padding={2.5} borderRadius="xl" marginTop={2}>
                <Box>
                    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
                        Token ID
                    </Box>
                    <Box as="h4" noOfLines={1} fontSize="sm">
                        {nft.tokenId}
                    </Box>
                </Box>
                <Box>
                    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
                        Amount
                    </Box>
                    <Box as="h4" noOfLines={1} fontSize="sm">
                        {nft.amount}
                    </Box>
                </Box>
            </SimpleGrid>
            <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
                <form onSubmit={onSubmit}>
                    <HStack>
                        <Input required type={'number'} id={'sellingPrice'} placeholder={'Selling Price'} />
                        <Input hidden value={nft.tokenAddress['_value']} />
                        <Input hidden value={nft.tokenId} />
                        <Button type={'submit'}>Resell</Button>
                    </HStack>
                </form>
            </Box>
        </Box>
    );
};

export default NFTCard;
