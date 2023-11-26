import {Box, Button, HStack, Image, SimpleGrid, useColorModeValue} from '@chakra-ui/react';
import {EvmNft} from '@moralisweb3/common-evm-utils';
import {Eth} from '@web3uikit/icons';
import {FC} from 'react';
import {resolveIPFS} from 'utils/resolveIPFS';
import {useContractWrite} from "wagmi";
import {loadAbi} from "../../../utils/ethereumUtils";

export interface NFTCardParams {
    key: number;
    nft: EvmNft;
    isSelling: boolean;
}

const NFTCard: FC<NFTCardParams> = ({nft, isSelling}) => {
    const bgColor = useColorModeValue('none', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const descBgColor = useColorModeValue('gray.100', 'gray.600');


    const exchangeContractAddress = '0x31026ebe2841825cb0639aa2e138f770d3b1a4f9';

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'buyNFT',
    });

    function buyNFT(listingId: number) {
        write({
            args: [listingId],
            value: BigInt(1)
        });
    }

    function buy(nft: EvmNft): void {
        buyNFT(nft.tokenId as number);
    }

    return (
        <Box maxWidth="315px" bgColor={bgColor} padding={3} borderRadius="xl" borderWidth="1px"
             borderColor={borderColor}>
            <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
                {nft.name}
            </Box>
            <HStack alignItems={'center'}>
                <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
                    {nft.contractType}
                </Box>

                <Eth fontSize="20px"/>
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
            {
                isSelling
                    ? <HStack marginTop={2}>
                        <Button onClick={() => buy(nft)}>Buy</Button>
                    </HStack>
                    : <HStack marginTop={2}>
                        <Button>Validate</Button>
                        <Button>Use</Button>
                        <Button>Resell</Button>
                    </HStack>
            }
        </Box>
    );
};

export default NFTCard;
