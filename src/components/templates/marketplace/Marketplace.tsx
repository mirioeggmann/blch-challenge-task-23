import {Box, Button, Grid, Heading, HStack, Input, useColorModeValue} from "@chakra-ui/react";
import {useSession} from "next-auth/react";
import {useContractWrite, useNetwork} from "wagmi";
import {loadAbi} from "../../../utils/ethereumUtils";
import {parseEther} from "viem";
import {useEvmWalletNFTs} from "@moralisweb3/next";
import {NFTCard} from "../../modules";

const Marketplace = () => {
    const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

    const contractAddress = '0xDB789A3d6dbc83Ba7f2d0738dDD8130C3ccd12f3';

    const {chain} = useNetwork();
    const {data: nfts} = useEvmWalletNFTs({
        address: contractAddress,
        chain: chain?.id,
    });

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: contractAddress,
        abi: loadAbi(),
        functionName: 'buyNFT',
    });

    function buyNFT(listingId: number) {
        write({
            args: [listingId],
            value: BigInt(1)
        });
    }

    async function onSubmit(event: any) {
        event.preventDefault();
        const listingId = event.target[0].value;
        buyNFT(listingId);
    }

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Marketplace
            </Heading>
            <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
                <form onSubmit={onSubmit}>
                    <HStack>
                        <label htmlFor={"address"}>Listing ID: </label>
                        <Input
                            id={"address"}
                            type={"text"}
                            name={"address"}
                            required
                        />
                        <Button type={"submit"}>Buy</Button>
                    </HStack>
                </form>
            </Box>
            {nfts?.length ? (
                <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
                    {nfts.map((nft, key) => (
                        <NFTCard nft={nft} key={key}/>
                    ))}
                </Grid>
            ) : (
                <Box>Looks the Exchange does not have any NFTs</Box>
            )}
        </>
    );
};

export default Marketplace;
