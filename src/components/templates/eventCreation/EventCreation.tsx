import {Box, Button, Heading, HStack, Input} from "@chakra-ui/react";


const EventCreation = () => {

    async function onSubmit(event: any) {
        event.preventDefault();

        const name = event.target[0].value;
        const abbr = event.target[1].value as string;
        const price = event.target[2].value;
        const amount = event.target[3].value;

        
    }

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Create Event
            </Heading>
            <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
                <form onSubmit={onSubmit}>
                    <HStack>
                        <label htmlFor={"name"}>Name</label>
                        <Input
                            required
                            type={"text"}
                            id={"name"}
                            placeholder={"Name"}
                        />
                        <label htmlFor={"abbr"}>Abbreviation</label>
                        <Input
                            required
                            type={"text"}
                            id={"abbr"}
                            placeholder={"Abbreviation"}
                        />
                        <label htmlFor={"price"}>Price</label>
                        <Input
                            required
                            type={"number"}
                            id={"price"}
                            placeholder={"Price"}
                        />
                        <label htmlFor={"amount"}>Amount</label>
                        <Input
                            required
                            type={"number"}
                            id={"amount"}
                            placeholder={"Amount"}
                        />
                    </HStack>
                    <HStack marginTop={2}>
                        <Button type={"submit"}>Create</Button>
                    </HStack>
                </form>
            </Box>
        </>
    );
};

export default EventCreation;
