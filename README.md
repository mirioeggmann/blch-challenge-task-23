# [Blockchain Challenge Task HS 2023](https://dsl.i.ost.ch/lect/hs23/)

## Repo setup

- https://github.com/mirioeggmann/blch-challenge-task-23 (main repo with the frontend and the documentation/presentation in `docs/`)
- https://github.com/mirioeggmann/blch-challenge-task-23-contract (seperate for the contract, to work well with remix localhost integration/hardhat)

## Our solution

A system to mint, buy and resell event tickets making use of the Ethereum blockchain.
We use a react (next) frontend and a two different smart contracts (one for the tickets and one for the marketplace).

## Getting Started

Install [MetaMask](https://metamask.io/download/) in your Browser and get yourself some Sepolia Testnet ETH on [Alchemy Sepolia Faucet](https://sepoliafaucet.com/) or [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia).

Either use the deployed version on https://blch-challenge-task-23.vercel.app/ or run it locally:

First, clone the repo and then create a `.env.local` file in the root directory of the project with the following content:
```bash
MORALIS_API_KEY=xxxx
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=7197b3e8dbee5ea6274cab37245eec212
EXCHANGE_ADDRESS=0x3288b0e0194b2b74571a62a344c67b7d62637f7b
```

Then install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Description of the task

This semester's challenge task (CT) is the design and implementation of a blockchain-based solution to a specific problem that you have identified in your own life or community. 
Ideally, the application is a decentralized application (DApp).

Find use-case or idea for your app:
- Your app must include a simple frontend (e.g., HTML, Vue, React, Svelte, ...)
- Your app must include a public blockchain (e.g., Ethereum, Solana, ...)

### Requirements

All requirements below must be met in order to pass this lecture.
- [x] A working prototype for your use-case.
- [x] Use latest stable releases of chosen libraries and frameworks.
- [x] Interaction with a public blockchain (can be testnet).
- [x] At least 2 participants need to be involved.
- [x] Transparent Audit Trail. Your solution must include a feature where all transactions and changes are recorded and can be viewed transparently by all participants.
- [x] Status and process need to be shown in the frontend.

The solution may use existing libraries and code, but those must open software software.

### Deliverables

- First hand-in: 29.10.2023, 23:59 (CET) Your initial version of your challenge task (initial version, does not need to run). 
- Second hand-in: 03.12.2023, 23:59 (CET)
  - well documented infrastructure (Readme.md or can be slides) and the source code (github/gitlab or similar) via invite or email to thomas.bocek-at-ost.ch 
  - The code and configuration should be easy to read and/or well documented. 
- Presentation on 11.12.2023:
  - you should show the architecture, components, and design decisions in 10-15 min, a demo in 5-10 min, and the Q&A will be 5-10 min. 
  - After your presentation, you need to hand in your PDF presentation.

You are allowed to use any language, framework, and platforms. 
However, the supervisors are familiar with those: Golang, Java, JavaScript/TypeScript, Ethereum, Bitcoin, Linux.

## Possible further product improvements in a next step after this challenge task

- Add a feature to redeem tickets in a nice fashion (with QR code scanning or similar)

## Contributors

- [@MaissenSamuel](https://github.com/MaissenSamuel)
- [@daeglasi](https://github.com/daeglasi)
- [@mirioeggmann](https://github.com/mirioeggmann)

## Credits

- [Ethereum Boilerplate](https://github.com/ethereum-boilerplate/ethereum-boilerplate/tree/main)

## Related work
- [eventsea](https://github.com/Consensys/eventsea)
- [ticketing solution of unlock-protocol](https://app.unlock-protocol.com/event)
