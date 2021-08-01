import React from "react";
import { useHistory } from 'react-router-dom';

const PostTitleImage = ({ post, index, isLargeMobileLandscape }) => {
    const history = useHistory();
    return (
        <div style={{ padding: 0, zIndex: 2 }} className="col-12 col-sm-6">

            <div className={`post-image-${index + 1}`}
                style={{ background: "#cc9764" }}>
                {/* <div
                    onClick={() => {
                        if (!post.content) return
                        history.push(`/post/${post.id}`)
                    }}
                    style={{
                        height:isLargeMobileLandscape ? 100 : 250,
                        background: `url('${post.image}') center center / cover no-repeat`,
                        cursor: 'pointer',
                    }}
                /> */}
                <img
                    src={post.image}
                    onClick={() => {
                        if (!post.content) return
                        history.push(`/post/${post.id}`)
                    }}
                    style={{
                        height: isLargeMobileLandscape ? 100 : 250,
                        cursor: 'pointer',
                        width:'100%',
                        objectFit:'cover'
                    }}
                />
            </div>

        </div>
    );
};

export default PostTitleImage;
