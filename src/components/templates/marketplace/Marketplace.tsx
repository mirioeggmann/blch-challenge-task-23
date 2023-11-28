import {Box, Grid, Heading} from '@chakra-ui/react';
import {useContractRead} from 'wagmi';
import {loadAbi} from '../../../utils/ethereumUtils';
import MarketplaceElement from "./MarketplaceElement";

const Marketplace = () => {
    const exchangeContractAddress = '0x7f13f94c59893ea456a39b5299f74aa0b307695e';

    const { data: listings } = useContractRead({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'getAllListings',
    });

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
