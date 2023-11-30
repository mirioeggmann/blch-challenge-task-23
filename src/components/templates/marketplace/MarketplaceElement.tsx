import { useEvmNFTMetadata } from '@moralisweb3/next';
import { NFTCardBuy } from '../../modules';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { useEffect, useState } from 'react';

export interface TicketInfo {
    tokenId: any;
    nftContractAdress: string;
    price: any;
    id: any;
    key: number;
}

const MarketplaceElement = (props: TicketInfo) => {
    const [nft, setNft] = useState<EvmNft>();

    // TODO hier muss irgendwie geprüft werden, damit es im network nicht ein loop von calls gibt
    const { fetch: fetchNftMetadata } = useEvmNFTMetadata();

    async function loadTicket() {
        const nft = await fetchNftMetadata({
            chain: 11155111,
            address: props.nftContractAdress,
            tokenId: BigInt(props.tokenId).toString(),
        });

        if (nft !== undefined) {
            setNft(nft);
        }
    }

    useEffect(() => {
        loadTicket();
    }, [loadTicket, props.nftContractAdress, props.tokenId]);

    return (
        <>
            {nft !== undefined ? (
                <NFTCardBuy nft={nft} key={props.key} buyerPrice={BigInt(props.price)} id={props.id} />
            ) : (
                <></>
            )}
        </>
    );
};

export default MarketplaceElement;
