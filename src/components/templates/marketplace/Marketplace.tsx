import {Box, Button, Heading, Input, useColorModeValue} from "@chakra-ui/react";

const Marketplace = () => {
    const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Marketplace
            </Heading>
            <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
                <Input placeholder='Address'/>
                <Button>Buy</Button>
            </Box>
        </>
    );
};

export default Marketplace;
