import {getAbiItem} from "viem";
import json5 from "json5";
import {useContractWrite} from "wagmi";

export function loadAbi() {
    const json = require('../../abi/exchange_abi.json');
    return json;
}