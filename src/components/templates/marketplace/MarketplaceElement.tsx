import {useEvmNFTMetadata} from '@moralisweb3/next';
import {NFTCard} from '../../modules';
import {EvmChain, EvmNft} from '@moralisweb3/common-evm-utils';
import {useEffect, useState} from "react";

export interface TicketInfo {
    tokenId: any;
    nftContractAdress: string;
    price: any;
    key: number;
}

const MarketplaceElement = (props: TicketInfo) => {
    const [nft, setNft] = useState<EvmNft>();

    const { fetch: fetchNftMetadata,  } = useEvmNFTMetadata();

    async function loadTicket() {
        const nft = await fetchNftMetadata({
            chain: 11155111,
            address: props.nftContractAdress,
            tokenId: BigInt(props.tokenId).toString()
        });

        console.log(nft);

        if (nft !== undefined) {
            setNft(nft);
        }
    }

    useEffect(() => {
        loadTicket();
    }, []);

    return (
        <>
            {
                nft !== undefined
                    ? <NFTCard nft={nft} key={props.key} isSelling={true}/>
                    : <></>
            }
        </>
    );
};

export default MarketplaceElement;
