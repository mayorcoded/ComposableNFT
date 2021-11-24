# composable-challenge

# Solution Analysis
I took the follow steps to solve this test:
- Started out by reading the EIP to understand the architecture of a Composable NFT
- I spent some time looking at the original implementation, and some more time going through the test to understand how 
  how to interact with the contract
- Focused on ERC721 and ERC20 Top-Down Composable to understand how to Transfer ERC721 and ERC20
  tokens to top-down composable contract.
- To transfer an ERC20 token to a Composable NFT contract, I went with the [second approach](https://eips.ethereum.org/EIPS/eip-998#erc20-top-down-composable) and used the `getERC20` function
  from the original implementation. 
- I completed the `MyComposableNFT` contract using some of the functions from the original implementation such as 
  `erc20Received` and  `getERC20`.
- I tested the contract by following a following the flow:
  - Mint ERC721 and ERC20 tokens from Composable and Token contract respectively
  - Transfer some of the minted ERC20 tokens to Composable 0
  - Transfer half of Composable O's tokens to another address
  - Check in all cases that no one can steal funds that are not theirs
  - Fetch and verify all balances



### Install dependencies

```
yarn
```

### Compile

```
yarn compile
```

### Test (truffle test files supported in `test/`)

```
yarn test
```
