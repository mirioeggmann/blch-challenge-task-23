import {Box, Button, Heading, HStack, Input, useColorModeValue} from "@chakra-ui/react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import {FormEvent} from "react";

const Marketplace = () => {
    const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

    async function buyNft(event: any) {
        event.preventDefault();
        console.log(event.target[0].value);
        console.log(process.env.EXCHANGE_ADDRESS);
    }

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Marketplace
            </Heading>
            <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
                <form onSubmit={buyNft}>
                    <HStack>
                        <label htmlFor={"address"}>Address</label>
                        <Input
                            id={"address"}
                            type={"text"}
                            placeholder='Address'
                            name={"address"}
                            required
                        />
                        <Button type={"submit"}>Buy</Button>
                    </HStack>
                </form>
            </Box>
        </>
    );
};

export default Marketplace;
