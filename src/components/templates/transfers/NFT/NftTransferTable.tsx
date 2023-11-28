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
import {EvmChainish} from "@moralisweb3/common-evm-utils";

export interface NftTransferTableParams {
    address: string;
    chain: EvmChainish | undefined;
}

const NftTransferTable = (props: NftTransferTableParams) => {
    const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

    const {data: transfers} = useEvmWalletNFTTransfers({
        address: props.address,
        chain: props.chain,
    });

    useEffect(() => console.log('transfers: ', transfers), [transfers]);

    return (
        <>
            {transfers?.length ? (
                <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
                    <TableContainer w={'full'}>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Token Id</Th>
                                    <Th>Value</Th>
                                    <Th>Amount</Th>
                                    <Th>Date</Th>
                                    <Th>Token</Th>
                                    <Th>From</Th>
                                    <Th>To</Th>
                                    <Th>Tx Hash</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {transfers?.map((transfer, key) => (
                                    <Tr key={key} _hover={{bgColor: hoverTrColor}} cursor="pointer">
                                        <Td>{transfer?.tokenId}</Td>
                                        <Td>{transfer.value?.ether} Ether</Td>
                                        <Td>{transfer.amount}</Td>
                                        <Td>{new Date(transfer.blockTimestamp).toLocaleDateString()}</Td>
                                        <Td>{transfer?.tokenAddress.checksum}</Td>
                                        <Td>{transfer?.fromAddress?.checksum}</Td>
                                        <Td>{transfer?.toAddress.checksum}</Td>
                                        <Td isNumeric>{transfer.transactionHash}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Token Id</Th>
                                    <Th>Value</Th>
                                    <Th>Amount</Th>
                                    <Th>Date</Th>
                                    <Th>Token</Th>
                                    <Th>From</Th>
                                    <Th>To</Th>
                                    <Th>Tx Hash</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
            ) : (
                <Box>There are no NFT transfers to display</Box>
            )}
        </>
    );
};

export default NftTransferTable;
