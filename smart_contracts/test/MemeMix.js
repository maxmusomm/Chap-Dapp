const { assert } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("MemeMix", () => {
  const deployMemeMixToken = async () => {
    const [deployer, account1, account2, account3, account4] = await ethers.getSigners();

    const MemeMix = await ethers.getContractFactory("MemeMix", deployer);
    const contract = await MemeMix.deploy();

    const tokenCost = (amount) => ethers.parseUnits(amount.toString(), "ether");

    return { deployer, account1, account2, account3, account4, contract, tokenCost };
  };

  describe("Deployment", () => {
    it("should set the correct owner and token name", async () => {
      const { contract, deployer } = await loadFixture(deployMemeMixToken);

      assert.equal(await contract.owner(), deployer.address);
      assert.equal(await contract.name(), "MemeMix");
    });
  });

  describe("Creating Rooms", () => {
    it("should increment room count when a new room is created", async () => {
      const { contract, deployer, tokenCost } = await loadFixture(deployMemeMixToken);

      await contract.connect(deployer).createRoom("Room1", tokenCost(0.01));
      await contract.connect(deployer).createRoom("Room2", tokenCost(0.02));
      await contract.connect(deployer).createRoom("Room3", tokenCost(0.03));

      assert.equal(await contract.totalRooms(), 3);
    });

    it("should set correct room details upon creation", async () => {
      const { contract, deployer, tokenCost } = await loadFixture(deployMemeMixToken);

      await contract.connect(deployer).createRoom("Beef", tokenCost(0.2));

      const room = await contract.getRoom(1);
      assert.equal(room.name, "Beef");
      assert.equal(room.id, 1);
      assert.equal(room.cost.toString(), tokenCost(0.2).toString());
    });
  });

  describe("Joining Rooms", () => {
    it("should allow a user to join a room", async () => {
      const { contract, deployer, account1, tokenCost } = await loadFixture(deployMemeMixToken);

      await contract.connect(deployer).createRoom("Beef", tokenCost(0.2));
      await contract.connect(account1).mint(1, { value: tokenCost(0.2) });

      const joined = await contract.hasJoinedRoom(1, account1.address);
      assert.isTrue(joined);
    });

    it("should revert if user does not pay enough", async () => {
      const { contract, deployer, account1, tokenCost } = await loadFixture(deployMemeMixToken);

      await contract.connect(deployer).createRoom("Beef", tokenCost(0.2));

      await assert.isRejected(
        contract.connect(account1).mint(1, { value: tokenCost(0.1) }),
        /revert/
      );
    });

    it("should revert if user tries to join a non-existent room", async () => {
      const { contract, account1, tokenCost } = await loadFixture(deployMemeMixToken);

      await assert.isRejected(
        contract.connect(account1).mint(999, { value: tokenCost(0.2) }),
        /Invalid room ID/
      );
    });
  });


});
