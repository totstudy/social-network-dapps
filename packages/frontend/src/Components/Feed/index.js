import React, { useState, useEffect } from "react";
import TweetBox from "../TwitterBox";
import Post from "../Post";
import "./feed.css";
import FlipMove from "react-flip-move";
import { TwitterContractAddress } from '../../utils/config.js';
import { ethers } from 'ethers';
import Twitter from '../../utils/TwitterContract.json'


function Feed({ personal }) {
  // postsに全ツイートを入れる
  const [posts, setPosts] = useState([]);
  // 本人のツイートと本人以外のツイートを判別して配列に入れる
  const getUpdatedTweets = (allTweets, address, sortFlg = 0) => {
    let updatedTweets = [];
    let allTweetsTmp = [];
    if(sortFlg == 1){
      allTweetsTmp = allTweets;
    }else{
      allTweetsTmp = allTweets.slice().sort((a,b) =>
        new Date(b.timestamp * 1000) - new Date(a.timestamp * 1000)
      );
    }

    for (let i = 0; i < allTweetsTmp.length; i++) {
      if (allTweetsTmp[i].username.toLowerCase() == address.toLowerCase()) {
        let tweet = {
          'id': allTweetsTmp[i].id,
          'tweetText': allTweetsTmp[i].tweetText,
          'isDeleted': allTweetsTmp[i].isDeleted,
          'username': allTweetsTmp[i].username,
          'createTime':new Date(allTweetsTmp[i].timestamp * 1000).toString(),
          // 'createTime':new Date(allTweetsTmp[i].timestamp * 1000),
          'good': allTweetsTmp[i].good,
          'personal': true
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          'id': allTweetsTmp[i].id,
          'tweetText': allTweetsTmp[i].tweetText,
          'isDeleted': allTweetsTmp[i].isDeleted,
          'username': allTweetsTmp[i].username,
          'createTime':new Date(allTweetsTmp[i].timestamp * 1000).toString(),
          // 'createTime':new Date(allTweetsTmp[i].timestamp * 1000),
          'good': allTweetsTmp[i].good,
          'personal': false
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  }
  // 全ツイートを取得
  const getAllTweets = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        )

        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTweets();
  }, []);
  // ツイートを削除
  const deleteTweet = key => async () => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let deleteTweetTx = await TwitterContract.deleteTweet(key, true);
        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
        
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch (error) {
      console.log(error);
    }
  }
  // ツイートのいいねの数を増やす
  const addGood = key => async () => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );
        let addGoodTx = await TwitterContract.addGood(key);
        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
        
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch (error) {
      console.log(error);
    }
  }

  // ツイート作成時間を昇順で並び替える
  const sortTime = async () => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let allTweets = await TwitterContract.getAllTweets();
        let result = allTweets.slice().sort((a,b) =>
          new Date(a.timestamp * 1000) - new Date(b.timestamp * 1000)
        );
        setPosts(getUpdatedTweets(result, ethereum.selectedAddress,1));
        
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }

    
  }
  // いいねの数が多い順にツイートを並び替える
  const sortGood = async () => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let allTweets = await TwitterContract.getAllTweets();
        let result = allTweets.slice().sort((a,b) =>
          b.good - a.good
        );
        setPosts(getUpdatedTweets(result, ethereum.selectedAddress,1));
        
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }

    
  }

  useEffect(() => {
    // ツイートを新規作成後、ページに反映
    const onAddTweet = async (from, tweet_id) => {
      console.log("AddTweet", from, tweet_id);
      // window.location.reload();
      try {
        const { ethereum } = window
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const TwitterContract = new ethers.Contract(
            TwitterContractAddress,
            Twitter.abi,
            signer
          )
  
          let allTweets = await TwitterContract.getAllTweets();
          setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
      
    
    };
    // ツイートを削除後、ページに反映
    const onDeleteTweet = async (from, tweet_id) => {
      console.log("DeleteTweet", from, tweet_id);
      
      try {
        const { ethereum } = window
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const TwitterContract = new ethers.Contract(
            TwitterContractAddress,
            Twitter.abi,
            signer
          )
  
          let allTweets = await TwitterContract.getAllTweets();
          setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
      
    
    };
    // ツイートにいいねを追加後、ページに反映
    const onAddGood = async (tweet_id, from, good) => {
      console.log("AddGood", tweet_id, from, good);
      // window.location.reload();
      try {
        const { ethereum } = window
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const TwitterContract = new ethers.Contract(
            TwitterContractAddress,
            Twitter.abi,
            signer
          )
  
          let allTweets = await TwitterContract.getAllTweets();
          setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
      
    
    };
    
   
    const { ethereum } = window;
    if (ethereum) {
    
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );
      TwitterContract.on("AddTweet", onAddTweet);
      TwitterContract.on("DeleteTweet", onDeleteTweet);
      TwitterContract.on("AddGood", onAddGood);
    } else {
      console.log("Ethereum object doesn't exist");
    }
  }, []);


  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Social network</h2>
        <button className="tweetBox__tweetButton" onClick={sortTime}>sort time asc</button>
        <button className="tweetBox__tweetButton" onClick={sortGood}>sort good desc</button>
      </div>

      <TweetBox />
      {/* {console.log(posts);} */}
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.username}
            createTime={post.createTime}
            good={post.good.toString()}
            text={post.tweetText}
            personal={post.personal}
            onClick={deleteTweet(post.id)}
            addGood={addGood(post.id)}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;