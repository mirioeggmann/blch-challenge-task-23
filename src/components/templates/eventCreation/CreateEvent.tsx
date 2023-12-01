import { Box, Button, HStack, Input } from '@chakra-ui/react';
import { deployContract } from 'viem/contract';
import { createWalletClient, custom} from 'viem';
import { sepolia } from '@wagmi/core/chains';
import { loadAbiNftContract, loadBytecodeNftContract } from '../../../utils/ethereumUtils';
import {useState} from "react";

interface CreateEventProps {
    onNameChange: (name: string | null) => void,
    onPriceChange: (price: number | null) => void,
    onAmountChange: (amount: number | null) => void,
    onTxChange: (amount: string | null) => void
}

const CreateEvent = ({onPriceChange, onAmountChange, onTxChange, onNameChange}: CreateEventProps) => {
    let [name, setName] = useState<string>('');
    let [price, setPrice] = useState<number>(0);
    let [amount, setAmount] = useState<number>(0);
    let [abbreviation, setAbbreviation] = useState<string>('');

    const exchangeContractAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS as `0x{string}`;

    async function onSubmit(event: any) {
        event.preventDefault();

        const client = createWalletClient({
            chain: sepolia,
            // @ts-ignore
            transport: custom(window.ethereum),
        });

        const [address] = await client.getAddresses();

        onPriceChange(price);
        onAmountChange(amount);
        onNameChange(name);

        console.log(amount, name, abbreviation, exchangeContractAddress, address)

        const contractCreationTransactionId = await deployContract(client, {
            abi: loadAbiNftContract(),
            bytecode: `0x${loadBytecodeNftContract()}`,
            args: [amount, name, abbreviation, exchangeContractAddress],
            account: address,
        });

        // contract wird erfolgreich erstellt, achtung return wert ist nicht contract addresse sondern tx adresse, welche aufzeigt von wem der contract erstellt wurde
        onTxChange(contractCreationTransactionId);
    }

    return (
        <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
            <form onSubmit={onSubmit}>
                <HStack>
                    <label htmlFor={'name'}>Name</label>
                    <Input required type={'text'} id={'name'} placeholder={'Name'} value={name} onChange={(event) => setName(event.target.value)} />
                    <label htmlFor={'abbr'}>Abbreviation</label>
                    <Input required type={'text'} id={'abbr'} placeholder={'Abbreviation'} value={abbreviation} onChange={(event) => setAbbreviation(event.target.value)} />
                    <label htmlFor={'price'}>Price</label>
                    <Input required type={'number'} id={'price'} placeholder={'Price'} value={price} onChange={(event) => setPrice(parseInt(event.target.value))} />
                    <label htmlFor={'amount'}>Amount</label>
                    <Input required type={'number'} id={'amount'} placeholder={'Amount'} value={amount} onChange={(event) => setAmount(parseInt(event.target.value))} />
                </HStack>
                <HStack marginTop={2}>
                    <Button type={'submit'}>Create</Button>
                </HStack>
            </form>
        </Box>
    );
};

export default CreateEvent;
