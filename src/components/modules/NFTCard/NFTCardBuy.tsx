import {Box, Button, HStack, SimpleGrid, Spinner, useColorModeValue} from '@chakra-ui/react';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { Eth } from '@web3uikit/icons';
import {FC, useState} from 'react';
import {useContractWrite, useWaitForTransaction} from 'wagmi';
import { loadAbi } from '../../../utils/ethereumUtils';
import {Typography} from "@web3uikit/core";

export interface NFTCardParams {
    key: number;
    nft: EvmNft;
    buyerPrice: BigInt;
    id: number;
}

const NFTCardBuy: FC<NFTCardParams> = ({ nft, buyerPrice, id }) => {
    const bgColor = useColorModeValue('none', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const descBgColor = useColorModeValue('gray.100', 'gray.600');

    const exchangeContractAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS as `0x{string}`;

    let [txHash, setTxHash] = useState<string | null>(null);

    const { writeAsync: buyNFTWrite } = useContractWrite({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'buyNFT',
    });

    const { data: txReceipt, isLoading: txIsLoading } = useWaitForTransaction({
        hash: txHash as `0x{string}`,
        confirmations: 2,
    });

    async function buyNFT() {
        const result = await buyNFTWrite({
            args: [id],
            value: buyerPrice as bigint,
        });

        setTxHash(result.hash);
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
            {
                (txReceipt === null || txReceipt === undefined)
                    ? txIsLoading
                        ? <><Typography>Buying in process...</Typography><Spinner /></>
                        : <>
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
                                <Box>
                                    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
                                        Price
                                    </Box>
                                    <Box as="h4" noOfLines={1} fontSize="sm">
                                        {buyerPrice.toString()} Wei
                                    </Box>
                                </Box>
                                <Box>
                                    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
                                        ExchangeListingId
                                    </Box>
                                    <Box as="h4" noOfLines={1} fontSize="sm">
                                        {id.toString()}
                                    </Box>
                                </Box>
                            </SimpleGrid>
                            <HStack marginTop={2}>
                                <Button onClick={() => buyNFT()}>Buy</Button>
                            </HStack>
                        </>
                    : <Typography>You bought this ticket!</Typography>
            }
        </Box>
    );
};

export default NFTCardBuy;
