import { Box, Button, Heading, HStack, Input } from '@chakra-ui/react';
import { deployContract } from 'viem/contract';
import { createWalletClient, custom, getContractAddress } from 'viem';
import { sepolia } from '@wagmi/core/chains';
import { loadAbi, loadAbiNftContract, loadBytecodeNftContract } from '../../../utils/ethereumUtils';
import { useContractWrite } from 'wagmi';
import { getTransactionCount } from 'viem/actions';

const EventCreation = () => {
    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const exchangeContractAddress = '0x3288b0e0194b2b74571a62a344c67b7d62637f7b';

    const { write: createBulkListingWrite } = useContractWrite({
        // @ts-ignore
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'createMultipleListing',
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

        const contractCreationTransactionId = await deployContract(client, {
            abi: loadAbiNftContract(),
            bytecode: `0x${loadBytecodeNftContract()}`,
            args: [amount, name, abbr, exchangeContractAddress],
            account: address,
        });

        console.log(contractCreationTransactionId); // contract wird erfolgreich erstellt, achtung return wert ist nicht contract addresse sondern tx adresse, welche aufzeigt von wem der contract erstellt wurde

        const nonce = await getTransactionCount(client, {
            address: address,
        });

        const contractAddress = getContractAddress({
            from: address,
            nonce: BigInt(nonce),
        });

        console.log(contractAddress);

        // TODO split in two actions with 2 buttons Create event / List event
        await delay(12000);

        createBulkListingWrite({
            args: [contractAddress, price, 0, amount - 1],
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
