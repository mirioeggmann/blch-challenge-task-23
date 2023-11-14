import {Default} from 'components/layouts/Default';
import {Typography} from "@web3uikit/core";
import Marketplace from "../src/components/templates/marketplace/Marketplace";

const MarketplacePage = () => {
    return (
        <Default pageName="Marketplace">
            <Marketplace></Marketplace>
        </Default>
    );
};

export default MarketplacePage;
