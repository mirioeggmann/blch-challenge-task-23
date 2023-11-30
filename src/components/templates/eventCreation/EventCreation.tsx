import { Box, Button, Heading, HStack, Input } from '@chakra-ui/react';
import { deployContract } from 'viem/contract';
import { createWalletClient, custom, http } from 'viem';
import { sepolia } from '@wagmi/core/chains';
import { loadAbi, loadAbiNftContract, loadBytecodeNftContract } from '../../../utils/ethereumUtils';
import { useContractWrite } from 'wagmi';

const EventCreation = () => {
    // TODO muss noch auf range gewechselt werden und nicht single createListing
    const exchangeContractAddress = '0x726A8bBFeE820aa8cbDa08dbe6ba5d06A3A3eAA9';
    const { write: createBulkListingWrite } = useContractWrite({
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'createListing',
    });

    async function onSubmit(event: any) {
        event.preventDefault();

        const name = event.target[0].value;
        const abbr = event.target[1].value as string;
        const amount = event.target[3].value;
        const price = event.target[2].value;

        const client = createWalletClient({
            chain: sepolia,
            // @ts-ignore
            transport: custom(window.ethereum),
        });

        const [address] = await client.getAddresses();

        const result = await deployContract(client, {
            abi: loadAbiNftContract(),
            bytecode: `0x${loadBytecodeNftContract()}`,
            args: [address, amount, name, abbr],
            account: address,
        });

        console.log(result); // contract wird erfolgreich erstellt, achtung return wert ist nicht contract addresse sondern tx adresse, welche aufzeigt von wem der contract erstellt wurde

        // TODO hier noch dynamisch die neue contract adresse hinterlegen, die vorhin neu erzeut wurde
        // TODO auslagern in eigene funktion + (form?)
        createBulkListingWrite({
            args: ['0x4464Da745f26CD714fA9E4094b9CB8ED9F453612', amount, price],
        });
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
                    </HStack>
                </form>
            </Box>
        </>
    );
};

export default EventCreation;
