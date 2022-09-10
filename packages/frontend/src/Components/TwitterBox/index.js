import React, { useState , useEffect } from "react";
import "./TweetBox.css";
import { Button } from "@material-ui/core";
import { TwitterContractAddress } from '../../utils/config';
import { ethers } from 'ethers';
import Twitter from '../../utils/TwitterContract.json';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  // ツイートを保存する
  const addTweet = async () => {
    let tweet = {
      'tweetText': tweetMessage,
      'isDeleted': false
    };

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        )

        let twitterTx = await TwitterContract.addTweet(tweet.tweetText, tweet.isDeleted);

        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }
  }

  const sendTweet = (e) => {
    if(tweetMessage != ""){
      addTweet();
      e.preventDefault();
    }else{
      alert("Please enter word");
      e.preventDefault();
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <div className="MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault css-154ogbs">
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiAvatar-fallback css-13y7ul3" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
                
              </path>
            </svg>
          </div>
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;