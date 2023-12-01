import { createWalletClient, custom, getContractAddress } from 'viem';
import { sepolia } from '@wagmi/core/chains';
import { loadAbi } from '../../../utils/ethereumUtils';
import { useContractWrite } from 'wagmi';
import { getTransactionCount } from 'viem/actions';
import {Button} from "@chakra-ui/react";
import {Typography} from "@web3uikit/core";

interface ListEventProps {
    price: number | null,
    amount: number | null,
    name: string | null
}

const ListEvent = (props: ListEventProps) => {

    const exchangeContractAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS as `0x{string}`;

    const { write: createBulkListingWrite } = useContractWrite({
        // @ts-ignore
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'createMultipleListing',
    });

    async function listEvent() {
        const client = createWalletClient({
            chain: sepolia,
            // @ts-ignore
            transport: custom(window.ethereum),
        });

        const [address] = await client.getAddresses();

        const nonce = await getTransactionCount(client, {
            address: address,
        });

        const contractAddress = getContractAddress({
            from: address,
            nonce: BigInt(nonce),
        });

        console.log(contractAddress, props);

        createBulkListingWrite({
            args: [contractAddress, props.price, 0, props.amount! - 1],
        });
    }

    return (
        <>
            <Typography>Your event was successfully created. Now it needs to be listed on the marketplace:</Typography><br/>
            <Button onClick={listEvent}>List event "{props.name}" on marketplace!</Button>
        </>
    );
};

export default ListEvent;
