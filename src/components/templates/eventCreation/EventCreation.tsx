import { Box, Button, Heading, HStack, Input } from '@chakra-ui/react';
import { deployContract } from 'viem/contract';
import { createWalletClient, custom, http } from 'viem';
import { sepolia } from '@wagmi/core/chains';
import { loadAbiNftContract, loadBytecodeNftContract } from '../../../utils/ethereumUtils';

const EventCreation = () => {
    async function onSubmit(event: any) {
        event.preventDefault();

        const name = event.target[0].value;
        const abbr = event.target[1].value as string;
        const price = event.target[2].value;
        const amount = event.target[3].value;

        // TODO call 1: creation of contract, cleanup to insert form stuff etc.

        const client = createWalletClient({
            chain: sepolia,
            // @ts-ignore
            transport: custom(window.ethereum),
        });

        const [address] = await client.getAddresses();

        const result = await deployContract(client, {
            abi: loadAbiNftContract(),
            bytecode: `0x${loadBytecodeNftContract()}`,
            args: [address],
            account: address,
        });

        console.log(result); // contract wird erfolgreich erstellt, achtung return wert ist nicht contract addresse sondern tx adresse, welche aufzeigt von wem der contract erstellt wurde

        // TODO call 2: vermutlich in neuem form für list event contractwrite (analog zu create listing - aber mit bulk listing funktion) -> auf exchange contract
    }

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Create Event
            </Heading>
            <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
                <form onSubmit={onSubmit}>
                    <HStack>
                        <label htmlFor={'name'}>Name</label>
                        <Input required type={'text'} id={'name'} placeholder={'Name'} />
                        <label htmlFor={'abbr'}>Abbreviation</label>
                        <Input required type={'text'} id={'abbr'} placeholder={'Abbreviation'} />
                        <label htmlFor={'price'}>Price</label>
                        <Input required type={'number'} id={'price'} placeholder={'Price'} />
                        <label htmlFor={'amount'}>Amount</label>
                        <Input required type={'number'} id={'amount'} placeholder={'Amount'} />
                    </HStack>
                    <HStack marginTop={2}>
                        <Button type={'submit'}>Create</Button>
                        {/*TODO auslagern in sinnvolle view*/}
                        <Button type={'submit'}>List Event</Button>
                    </HStack>
                </form>
            </Box>
        </>
    );
};

export default EventCreation;
