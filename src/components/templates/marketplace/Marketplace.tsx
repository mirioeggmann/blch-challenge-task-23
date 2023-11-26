import {Box, Grid, Heading} from "@chakra-ui/react";
import {useNetwork} from "wagmi";
import {useEvmWalletNFTs} from "@moralisweb3/next";
import {NFTCard} from "../../modules";
import {useContractRead} from "wagmi";
import {loadAbi} from "../../../utils/ethereumUtils";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";

const Marketplace = () => {
    const exchangeContractAddress = '0x31026ebe2841825cb0639aa2e138f770d3b1a4f9';

    const {chain} = useNetwork();
    const {data: nfts} = useEvmWalletNFTs({
        address: exchangeContractAddress,
        chain: chain?.id,
    });

    console.log(nfts)

    const { data, isError, isLoading } = useContractRead({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'getAllListings',
    })

    console.log(data)

    // if (!isLoading || !data) {
    //     for (const d of data!) {
    //         getSingleNft(d.nftContract, d.tokenId);
    //     }
    // }
    //
    // async function getSingleNft (address: string, tokenId: string){
    //     const response = await Moralis.EvmApi.nft.getNFTMetadata({
    //         address: address,
    //         chain: EvmChain.SEPOLIA,
    //         tokenId: tokenId
    //     });
    //     console.log(response);
    // }

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
