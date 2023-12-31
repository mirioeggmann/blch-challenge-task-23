import { Box, Grid, Heading } from '@chakra-ui/react';
import { useContractRead, useNetwork } from 'wagmi';
import { loadAbi } from '../../../utils/ethereumUtils';
import MarketplaceElement from './MarketplaceElement';
import NftTransferTable from '../transfers/NFT/NftTransferTable';
import { useSession } from 'next-auth/react';
import { Typography } from '@web3uikit/core';

const Marketplace = () => {
    const exchangeContractAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS as `0x{string}`;
    const { chain } = useNetwork();
    const session = useSession();

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
            {session.status === 'unauthenticated' ? (
                <Typography>Log In to join the Marketplace!</Typography>
            ) : (
                <>
                    <Heading size="md" marginBottom={6}>
                        Trade History
                    </Heading>
                    <NftTransferTable address={exchangeContractAddress} chain={chain?.id}></NftTransferTable>

                    <Heading size="md" marginTop={6} marginBottom={6}>
                        Open Listings
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
            )}
        </>
    );
};

export default Marketplace;
