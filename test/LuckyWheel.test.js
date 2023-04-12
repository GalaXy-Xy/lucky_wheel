const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LuckyWheel", function () {
  let luckyWheel;
  let owner;
  let player1;
  let player2;
  let addrs;

  beforeEach(async function () {
    [owner, player1, player2, ...addrs] = await ethers.getSigners();
    
    const LuckyWheel = await ethers.getContractFactory("LuckyWheel");
    luckyWheel = await LuckyWheel.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await luckyWheel.owner()).to.equal(owner.address);
    });

    it("Should start with spinId 0", async function () {
      expect(await luckyWheel.spinId()).to.equal(0);
    });
  });

  describe("Spinning", function () {
    it("Should accept correct spin cost", async function () {
      const spinCost = ethers.parseEther("0.01");
      await expect(luckyWheel.connect(player1).spinWheel({ value: spinCost }))
        .to.emit(luckyWheel, "SpinResult");
    });

    it("Should reject incorrect spin cost", async function () {
      const wrongCost = ethers.parseEther("0.02");
      await expect(luckyWheel.connect(player1).spinWheel({ value: wrongCost }))
        .to.be.revertedWith("Incorrect spin cost");
    });

    it("Should increment spinId after each spin", async function () {
      const spinCost = ethers.parseEther("0.01");
      await luckyWheel.connect(player1).spinWheel({ value: spinCost });
      expect(await luckyWheel.spinId()).to.equal(1);
    });
  });

  describe("Prize claiming", function () {
    beforeEach(async function () {
      // Fund the contract
      await owner.sendTransaction({
        to: luckyWheel.target,
        value: ethers.parseEther("1.0")
      });
    });

    it("Should allow players to claim prizes", async function () {
      const spinCost = ethers.parseEther("0.01");
      await luckyWheel.connect(player1).spinWheel({ value: spinCost });
      
      // Get the spin result
      const spinId = 0;
      const spin = await luckyWheel.spins(spinId);
      
      if (spin.reward > 0) {
        const initialBalance = await ethers.provider.getBalance(player1.address);
        await luckyWheel.connect(player1).claimPrize(spinId);
        const finalBalance = await ethers.provider.getBalance(player1.address);
        
        expect(finalBalance).to.be.gt(initialBalance);
      }
    });
  });

  describe("Access control", function () {
    it("Should only allow owner to withdraw funds", async function () {
      await expect(luckyWheel.connect(player1).withdrawFunds())
        .to.be.revertedWithCustomError(luckyWheel, "OwnableUnauthorizedAccount");
    });
  });
});
