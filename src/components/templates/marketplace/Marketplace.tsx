import {Box, Grid, Heading} from "@chakra-ui/react";
import {useNetwork} from "wagmi";
import {useEvmWalletNFTs} from "@moralisweb3/next";
import {NFTCard} from "../../modules";

const Marketplace = () => {
    const exchangeContractAddress = '0x31026ebe2841825cb0639aa2e138f770d3b1a4f9';

    const {chain} = useNetwork();
    const {data: nfts} = useEvmWalletNFTs({
        address: exchangeContractAddress,
        chain: chain?.id,
    });

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Marketplace
            </Heading>
            {nfts?.length ? (
                <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
                    {nfts.map((nft, key) => (
                        <NFTCard nft={nft} key={key} isSelling={true}/>
                    ))}
                </Grid>
            ) : (
                <Box>Looks the Exchange does not have any NFTs</Box>
            )}
        </>
    );
};

export default Marketplace;
