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

const NFTTransfers = () => {
    const {data} = useSession();
    const {chain} = useNetwork();

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                Your NFT Transfers
            </Heading>
            <NftTransferTable address={data?.user?.address} chain={chain?.id}></NftTransferTable>
        </>
    );
};

export default NFTTransfers;
