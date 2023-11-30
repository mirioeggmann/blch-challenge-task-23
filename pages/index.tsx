import {Default} from 'components/layouts/Default';
import type {NextPage} from 'next';
import Marketplace from "../src/components/templates/marketplace/Marketplace";

const HomePage: NextPage = () => {
    return (
        <Default pageName="Marketplace">
            <Marketplace></Marketplace>
        </Default>
    );
};

export default HomePage;
