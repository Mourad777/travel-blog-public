import React, { Fragment } from 'react';
import Spacer from "./Spacer";
import PostTitleImage from "./PostTitleImage";
import PostText from "./PostText";

const RowLayout = ({ winSize, isLargeMobileLandscape, post, index }) => (
    <Fragment>
        {!(winSize === 1) && <Spacer />}

        {winSize === 1 && (
            <Fragment>
                <PostTitleImage
                    index={index} post={post} />
                <PostText
                    isLargeMobileLandscape={isLargeMobileLandscape}
                    post={post}
                    isMobile={winSize === 1}
                    index={index}
                />

            </Fragment>
        )}

        {!(winSize === 1) && !!(index % 2) && (
            <Fragment>
                <PostTitleImage
                    isLargeMobileLandscape={isLargeMobileLandscape}
                    index={index} post={post} />
                <PostText
                    isLargeMobileLandscape={isLargeMobileLandscape}
                    post={post}
                    isMobile={winSize === 1}
                    index={index}
                />
            </Fragment>
        )}

        {!(index % 2) && !(winSize === 1) && (
            <Fragment>
                <PostText
                    isLargeMobileLandscape={isLargeMobileLandscape}
                    index={index}
                    post={post}
                    isMobile={winSize === 1}
                />
                <PostTitleImage
                    isLargeMobileLandscape={isLargeMobileLandscape}
                    index={index}
                    post={post} />
            </Fragment>
        )}
    </Fragment>
);

export default RowLayout;