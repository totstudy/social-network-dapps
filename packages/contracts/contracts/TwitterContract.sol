// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract TwitterContract {

    // ツイート保存、ツイート削除、いいね追加の各イベント
    event AddTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetId, bool isDeleted);
    event AddGood(uint tweetId, address useraddress, uint goodCount);
    // ツイートの構造体
    struct Tweet {
        uint id;           // ツイートのid
        address username;  // ツイートしたアドレス
        string tweetText;  // ツイートした文字
        uint good;         // いいねの数
        bool isDeleted;    // ツイートの消去の判定フラグ
        uint256 timestamp; // ツイートの作成時間
    }
    // いいねをしたアドレスを格納
    struct User {
        uint tweet_id;
    }
    // ツイートの構造体の配列を格納するための変数
    Tweet[] private tweets;
    // ツイートとアドレスを紐付ける
    mapping(uint256 => address) tweetToOwner;
    // アドレスといいねしたツイートを紐付ける
    mapping(address => User[]) goodPush;

    // ツイートを保存
    function addTweet(string memory _tweetText, bool _isDeleted) external {
        uint tweetId = tweets.length;
        uint goodInitial = 0;
        tweets.push(Tweet(tweetId, msg.sender, _tweetText, goodInitial, _isDeleted, block.timestamp));
        tweetToOwner[tweetId] = msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }

    // 保存されたすべてのツイートを取得
    function getAllTweets() external view returns (Tweet[] memory){
        // ツイートの数で配列の長さを決定
        Tweet[] memory temporaryTweets = new Tweet[](tweets.length);
        uint count = 0;
        for(uint i = 0; i < tweets.length; i++){
            // 消去していないツイートを配列に入れる
            if(tweets[i].isDeleted == false){
                temporaryTweets[count] = tweets[i];
                count++;
            }
        }
        // 消去していないツイートの数で配列の長さを決定
        Tweet[] memory result = new Tweet[](count);

        for(uint i = 0; i < count; i++){
            result[i] = temporaryTweets[i];
        }
        return result;
    }

    // 自分のツイートを削除
    function deleteTweet(uint _tweetId, bool _isDeleted) external {
       if(tweetToOwner[_tweetId] == msg.sender){
           tweets[_tweetId].isDeleted = _isDeleted;
           emit DeleteTweet(_tweetId, _isDeleted);
       }
    }

    // ツイートにいいねを送る
    function addGood(uint _tweetId) external {
        bool exists = false;
        for (uint256 i = 0; i < goodPush[msg.sender].length; i++) {
            // アドレスといいねしたツイートを紐付けられていればtrueに変える
            if (goodPush[msg.sender][i].tweet_id == _tweetId) {
                exists = true;
            }
        }
        
        if (!exists) {
            // アドレスとツイートを紐付ける
            goodPush[msg.sender].push(User({tweet_id: _tweetId}));
            // falseであればツイートのいいねの数を増やすことができる
            tweets[_tweetId].good++;
        }
        
        emit AddGood(_tweetId, msg.sender, tweets[_tweetId].good);
        
    }

}