const { ethers } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");

const { MaxUint256 } = ethers.constants;
const MAX_UINT_256 = MaxUint256;

const ether = amount => {
    const weiString = ethers.utils.parseEther(amount.toString());
    return BigNumber.from(weiString);
};


describe("MyComposableNFT", () => {
    let deployer;
    let minterA;
    let minterB;
    let minter3;
    let myERC20;
    let myComposableNFT;

    before(async () => {
        [deployer, minterA, minterB, minter3] = await ethers.getSigners();

        const MyComposableNFT = await ethers.getContractFactory("MyComposableNFT");
        myComposableNFT = await MyComposableNFT.deploy();

        const MyERC20 = await ethers.getContractFactory("MyERC20");
        myERC20 = await MyERC20.deploy();

    });

    describe("mint ERC721 and ERC20 tokens", async () => {
        it("should mint ERC20 token for minter A", async () => {
            await myERC20.connect(minterA).mint(minterA.address, ether(10));
        });

        it("should mint ERC721 token, Composable 0 for minter A", async () => {
            await myComposableNFT.connect(minterA).mint(minterA.address, 0);
        });
    })

    describe("transfer ERC20 token to a Composable contract ", async () => {
        it("should fail when minterA tries to get erc20 from minterB", async () => {
            await expect(
                myComposableNFT.connect(minterA).getERC20(minterB.address, 0, myERC20.address, ether(10)),
            ).to.be.revertedWith("Not allowed to getERC20");
        });

        it("should successfully transfer ERC20 token to from minterA to Composable 0", async () => {
            await myERC20.connect(minterA).approve(myComposableNFT.address, MAX_UINT_256);
            await myComposableNFT.connect(minterA).getERC20(minterA.address, 0, myERC20.address, ether(10));
            expect(await myComposableNFT.balanceOfERC20(0, myERC20.address)).to.equal(ether(10));
        });
    });

    describe("transfer ERC20 from Composable contract", async () => {
        it("should fail when minterB tries to transfer minterA's erc20 token", async () => {
            await expect(
                myComposableNFT.connect(minterB).transferERC20(0, minterB.address, myERC20.address, ether(5)),
            ).to.be.revertedWith("ERC721 transfer caller is not owner nor approved");
        });

        it("should successfully transfer half of ERC20 Composable 0 to minterB", async () => {
            //await myERC20.connect(minterB).approve(myComposableNFT.address, MAX_UINT_256);
            await myComposableNFT.connect(minterA).transferERC20(0, minterB.address, myERC20.address, ether(5));
            expect(await myERC20.balanceOf(minterB.address)).to.equal(ether(5));
            expect(await myComposableNFT.balanceOfERC20(0, myERC20.address)).to.equal(ether(5));
        });
    });
});