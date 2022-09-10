import React, { forwardRef } from "react";
import "./Post.css";
// import Avatar from 'avataaars';

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteIcon from '@material-ui/icons/Delete';

const Post = forwardRef(
    ({ displayName, createTime, good, text, personal, onClick, addGood }, ref) => {
        return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <div className="MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault css-154ogbs">
          
          <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiAvatar-fallback css-13y7ul3" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon">
          
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
          </div>
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
              </h3>
            </div>
            <div className="post__headerText">
              <p>{createTime}</p>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <div className="post__footer">
            {/* <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" /> */}
            <div className="good_post_footer">
              <div class="good_icon">
                <FavoriteBorderIcon fontSize="small" onClick={addGood}/>
              </div>
                <div class="good_icon_number">{good}</div>
            </div>
            <PublishIcon fontSize="small" />
            {personal ? (
              <DeleteIcon fontSize="small" onClick={onClick}/>
            ) : ("")}
          </div>
        </div>
      </div>
    );
    }
);

export default Post;