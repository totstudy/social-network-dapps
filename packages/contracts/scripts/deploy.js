  const main = async () => {
    // コンパイル
    const twitterContractFactory = await hre.ethers.getContractFactory("TwitterContract");
    // デプロイ
    const twitterContract = await twitterContractFactory.deploy();
    // デプロイされるまで待つ
    await twitterContract.deployed();
    // コントラクトのアドレスを表示
    console.log("Contract deployed to:", twitterContract.address);
  };
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  runMain();
  