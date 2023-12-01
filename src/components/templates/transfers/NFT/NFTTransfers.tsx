import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
    Heading,
    Box,
    useColorModeValue,
} from '@chakra-ui/react';
import {useEvmWalletNFTTransfers} from '@moralisweb3/next';
import {useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {getEllipsisTxt} from 'utils/format';
import {useNetwork} from 'wagmi';
import NftTransferTable from "./NftTransferTable";
import {Typography} from "@web3uikit/core";

const NFTTransfers = () => {
    const {data} = useSession();
    const {chain} = useNetwork();
    const session = useSession();

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Your NFT Transfers
            </Heading>

            {
                session.status === "unauthenticated"
                    ? <Typography>Log In to see your Transfers!</Typography>
                    : <NftTransferTable address={data?.user?.address} chain={chain?.id}></NftTransferTable>
            }
        </>
    );
};

export default NFTTransfers;
