import { Box, Grid, Heading } from '@chakra-ui/react';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useNetwork } from 'wagmi';
import NFTCardSell from '../../../modules/NFTCard/NFTCardSell';
import {Typography} from "@web3uikit/core";

const NFTBalances = () => {
    const { data } = useSession();
    const { chain } = useNetwork();
    const session = useSession();

    const { data: nfts } = useEvmWalletNFTs({
        address: data?.user?.address,
        chain: chain?.id,
    });

    useEffect(() => console.log('nfts: ', nfts), [nfts]);

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Tickets
            </Heading>
            {
                session.status === "unauthenticated"
                    ? <Typography>Log In to see your Tickets!</Typography>
                    : nfts?.length
                        ? (
                            <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
                                {nfts.map((nft, key) => (
                                    <NFTCardSell nft={nft} key={key} />
                                ))}
                            </Grid>
                        )
                        : <Box>Looks Like you do not have any NFTs</Box>
            }
        </>
    );
};

export default NFTBalances;
