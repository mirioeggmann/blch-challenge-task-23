import { Box, Grid, Heading } from '@chakra-ui/react';
import { useContractRead, useNetwork } from 'wagmi';
import { loadAbi } from '../../../utils/ethereumUtils';
import MarketplaceElement from './MarketplaceElement';
import NftTransferTable from '../transfers/NFT/NftTransferTable';

const Marketplace = () => {
    const exchangeContractAddress = '0x726A8bBFeE820aa8cbDa08dbe6ba5d06A3A3eAA9';
    const { chain } = useNetwork();

    const { data: listings } = useContractRead({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'getAllListings',
    });

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Marketplace History
            </Heading>
            <NftTransferTable address={exchangeContractAddress} chain={chain?.id}></NftTransferTable>

            <Heading size="lg" marginTop={6} marginBottom={6}>
                Marketplace
            </Heading>
            {listings?.length ? (
                <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
                    {listings.map((listing, key) => {
                        if (!listing.isSold) {
                            return (
                                <MarketplaceElement
                                    key={key}
                                    tokenId={listing.tokenId}
                                    id={listing.id}
                                    nftContractAdress={listing.nftContract}
                                    price={listing.price}
                                />
                            );
                        }
                    })}
                </Grid>
            ) : (
                <Box>Looks like the Exchange does not have any NFTs</Box>
            )}
        </>
    );
};

export default Marketplace;
