import { createWalletClient, custom, getContractAddress } from 'viem';
import { sepolia } from '@wagmi/core/chains';
import { loadAbi } from '../../../utils/ethereumUtils';
import {useContractWrite, useWaitForTransaction} from 'wagmi';
import { getTransactionCount } from 'viem/actions';
import {Button, Spinner} from '@chakra-ui/react';
import { Typography } from '@web3uikit/core';
import {useState} from "react";

interface ListEventProps {
    price: number | null;
    amount: number | null;
    name: string | null;
}

const ListEvent = (props: ListEventProps) => {
    const exchangeContractAddress = process.env.NEXT_PUBLIC_EXCHANGE_ADDRESS as `0x{string}`;
    let [txHash, setTxHash] = useState<string | null>(null);

    const { writeAsync: createBulkListingWrite,  } = useContractWrite({
        // @ts-ignore
        address: exchangeContractAddress,
        abi: loadAbi(),
        functionName: 'createMultipleListing',
    });

    const { data: txReceipt, isLoading: txIsLoading } = useWaitForTransaction({
        hash: txHash as `0x{string}`,
        confirmations: 2,
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

        // TODO nonce -1 schöner lösen
        const contractAddress = getContractAddress({
            from: address,
            nonce: BigInt(nonce - 1),
        });

        const result = await createBulkListingWrite({
            args: [contractAddress, props.price, 0, props.amount! - 1],
        });

        setTxHash(result.hash);
    }

    return (
        <>
            {
                (txReceipt === null || txReceipt === undefined)
                    ? txIsLoading
                        ? <><Typography>Your event is getting listed on the marketplace...</Typography><Spinner /></>
                        : <>
                            <Typography>Your event was successfully created. Now it needs to be listed on the marketplace:</Typography>
                            <br />
                            <Button onClick={listEvent}>List event &quot;{props.name}&quot; on marketplace!</Button>
                        </>
                    : <Typography>Your event "{props.name}" was successfully listed!</Typography>
            }
        </>
    );
};

export default ListEvent;
