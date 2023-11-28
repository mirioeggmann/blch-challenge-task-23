import {Box, Grid, Heading} from '@chakra-ui/react';
import {useEvmNFTMetadata} from '@moralisweb3/next';
import {useContractRead} from 'wagmi';
import {loadAbi} from '../../../utils/ethereumUtils';
import MarketplaceElement from "./MarketplaceElement";

const Marketplace = () => {
    const exchangeContractAddress = '0x654406b8a47Ae366e35D100695a95D9aa26b3eC4';

    const { data: listings } = useContractRead({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'getAllListings',
    });

    console.log(listings);

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Marketplace
            </Heading>
            {listings?.length ? (
                <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
                    {listings.slice(1).map((listing, key) => (
                        <MarketplaceElement key={key} tokenId={listing.tokenId} nftContractAdress={listing.nftContract} price={listing.price} />
                    ))}
                </Grid>
            ) : (
                <Box>Looks the Exchange does not have any NFTs</Box>
            )}
        </>
    );
};

export default Marketplace;
