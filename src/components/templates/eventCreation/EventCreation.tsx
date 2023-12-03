import { Heading, Spinner } from '@chakra-ui/react';
import { useWaitForTransaction } from 'wagmi';
import { Typography } from '@web3uikit/core';
import { useSession } from 'next-auth/react';
import CreateEvent from './CreateEvent';
import ListEvent from './ListEvent';
import { useState } from 'react';

const EventCreation = () => {
    const session = useSession();

    let [txHash, setTxHash] = useState<string | null>(null);
    let [name, setName] = useState<string | null>(null);
    let [price, setPrice] = useState<number | null>(null);
    let [amount, setAmount] = useState<number | null>(null);

    const { data: txReceipt, isLoading: txIsLoading } = useWaitForTransaction({
        hash: txHash as `0x{string}`,
        confirmations: 2,
    });

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Event Creation
            </Heading>
            {
                session.status === 'unauthenticated'
                    ? ( <Typography>Log In to create Events!</Typography> )
                    : txReceipt !== undefined && txReceipt !== null
                        ? (txIsLoading
                            ? (
                                <>
                                    <Typography>Your event is getting created...</Typography>
                                    <Spinner />
                                </>
                            )
                            : (
                                <ListEvent amount={amount} price={price} name={name}></ListEvent>
                            )
                        )
                        : txIsLoading
                            ? ( <>
                        <Typography>Your event is getting created...</Typography>
                        <Spinner />
                    </> )
                            : (
                                <CreateEvent
                                    onAmountChange={setAmount}
                                    onPriceChange={setPrice}
                                    onTxChange={setTxHash}
                                    onNameChange={setName}
                                ></CreateEvent>
                            )
            }
        </>
    );
};

export default EventCreation;
