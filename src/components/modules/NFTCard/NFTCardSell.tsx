import { Box, Button, HStack, Input, SimpleGrid, Spinner, useColorModeValue } from '@chakra-ui/react';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { Eth } from '@web3uikit/icons';
import { FC, useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import {loadAbi, loadAbiNftContract} from '../../../utils/ethereumUtils';
import { Typography } from '@web3uikit/core';

export interface NFTCardSellParams {
    key: number;
    nft: EvmNft;
}

const NFTCard: FC<NFTCardSellParams> = ({ nft }) => {
    const bgColor = useColorModeValue('none', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const descBgColor = useColorModeValue('gray.100', 'gray.600');

    let [sellingPrice, setSellingPrice] = useState<BigInt>(BigInt(0));
    let [nftContractAddress] = useState<string>(nft.tokenAddress['_value']);
    let [tokenId] = useState<string | number>(nft.tokenId);
    let [txHash, setTxHash] = useState<string | null>(null);
    let [isOffered, setIsOffered] = useState<boolean>(false);

    const exchangeContractAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS as `0x{string}`;

    const { writeAsync: createListingWrite } = useContractWrite({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'createListing',
    });

    const { writeAsync: approveWrite } = useContractWrite({
        address: nftContractAddress as `0x{string}`,
        abi: loadAbiNftContract(),
        functionName: 'approve',
    });

    const { data: txReceipt, isLoading: txIsLoading } = useWaitForTransaction({
        hash: txHash as `0x{string}`,
        confirmations: 2,
    });

    async function createListingExec(nftContract: string, tokenId: number | string, price: BigInt) {
        const result = await createListingWrite({
            args: [nftContract, tokenId, price],
        });

        setTxHash(result.hash);
        setIsOffered(true);
    }

    async function approveTicket() {
        const result = await approveWrite({
            args: [exchangeContractAddress, tokenId],
        });

        setTxHash(result.hash);
    }

    async function onSubmit(event: any) {
        event.preventDefault();
        await createListingExec(nftContractAddress, tokenId, sellingPrice);
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
                txReceipt !== undefined && txReceipt !== null
                    ? ( isOffered
                            ? ( <><Typography>You offered this ticket for resell!</Typography></> )
                            : ( <>
                                <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
                            {nft.name}
                        </Box>
                                <HStack alignItems={'center'}>
                                    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
                                        {nft.contractType}
                                    </Box>

                                    <Eth fontSize="20px" />
                                </HStack>
                                <SimpleGrid
                                    columns={2}
                                    spacing={4}
                                    bgColor={descBgColor}
                                    padding={2.5}
                                    borderRadius="xl"
                                    marginTop={2}
                                >
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
                                            <Input
                                                required
                                                type={'number'}
                                                id={'sellingPrice'}
                                                placeholder={'Selling Price'}
                                                value={sellingPrice.toString()}
                                                onChange={(event) => setSellingPrice(BigInt(event.target.value))}
                                            />
                                            <Button type={'submit'}>Offer</Button>
                                        </HStack>
                                    </form>
                                </Box>
                            </> )
                    )
                    : ( txIsLoading
                            ? ( <><Typography>Ticket is getting processed...</Typography><Spinner /></> )
                            : ( <>
                                <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
                                    {nft.name}
                                </Box>
                                <HStack alignItems={'center'}>
                                    <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
                                        {nft.contractType}
                                    </Box>

                                    <Eth fontSize="20px" />
                                </HStack>
                                <SimpleGrid
                                    columns={2}
                                    spacing={4}
                                    bgColor={descBgColor}
                                    padding={2.5}
                                    borderRadius="xl"
                                    marginTop={2}
                                >
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
                                    <Button onClick={approveTicket}>Approve ticket</Button>
                                </Box>
                            </> )
                    )
            }

        </Box>
    );
};

export default NFTCard;
