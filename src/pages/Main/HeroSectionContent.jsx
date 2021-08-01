import React, { Fragment } from 'react'
import ScrollDownArrow from '../../../components/blog/ScrollDownArrow/ScrollDownArrow';
import { heroTextPathOne } from '../svgs';
import {
    getHeroSectionPicPiecesStyle,
    getHeroSectionPicStyle,
    getHeroSectionNameStyle,
    getHeroSectionTextStyle,
    getSearchInputStyle,
    getHeroSectionButtonOneStyle,
    getHeroSectionButtonTwoStyle
} from "../utility";
import Search from './SearchResults';
import { gsap } from 'gsap/all'
import welcomeBackground from '../../../../../public/assets/images/welcome-background.webp';

import herSectionPieceOne from '../../../../../public/assets/images/welcome-section-piece-1.webp'
import herSectionPieceTwo from '../../../../../public/assets/images/welcome-section-piece-2.webp'
import herSectionPieceThree from '../../../../../public/assets/images/welcome-section-piece-3.webp';

const HeroSectionContent = ({
    winSize,
    heroPicMainRef,
    isAssetLoaded,
    photos,
    videos,
    posts,
    height,
    countryThumbnails,
    refPosts,
    refVideos,
    isLargeMobileLandscape,
    onImageLoad,
}) => {

    const handleScroll = (ref) => {
        gsap.to(window, { duration: 3, scrollTo: ref.current });
    }


    return (
        <Fragment>

            <Search photos={photos} videos={videos} posts={posts} winSize={winSize} countryThumbnails={countryThumbnails} />

            <img
                src={welcomeBackground}
                id="hero-pic-main"
                ref={heroPicMainRef}
                onLoad={()=>onImageLoad('welcome-background')}
                style={{
                    ...getHeroSectionPicStyle(winSize, height),
                    position: 'fixed'
                }} />
            {["One", "Two", "One"].map((piece, i) => {
                let image;
                if (i + 1 === 1) image = herSectionPieceOne;
                if (i + 1 === 2) image = herSectionPieceTwo;
                if (i + 1 === 3) image = herSectionPieceThree;
                return (
                    <img
                        onLoad={() => onImageLoad(`piece[${i + 1}]`)}
                        src={image}
                        className={`HeroPicPiece${piece}`}
                        key={`[Heropic]${i}`}
                        style={getHeroSectionPicPiecesStyle(winSize, height, i + 1,)
                        }
                    />
                    // <div
                    //     className={`HeroPicPiece${piece}`}
                    //     key={`[Heropic]${i}`}
                    //     style={getHeroSectionPicPiecesStyle(winSize, i + 1, height)}
                    // />
                )
            })}

            <svg
                style={{
                    ...getHeroSectionNameStyle(winSize, height),
                    opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1, transition: 'opacity 0.3s ease-in'
                }}
                className={isAssetLoaded ? "HeroTextAnimationOne" : ""}
                viewBox="0 0 120 50"
                id="heroTextMainPath"
            >
                <g>
                    <path d={heroTextPathOne} />
                </g>
            </svg>

            <div style={{
                ...getHeroSectionTextStyle(winSize, height),
                opacity: (winSize === 1 && height < 430) || (isLargeMobileLandscape && height < 200) ? 0 : 1, transition: 'opacity 0.3s ease-in'
            }} >
                <p id="heroTextSecondary" style={{
                    fontFamily: 'Mulish,sans-serif',
                    borderRadius: 5,
                    padding: 10,
                    background: 'rgb(123,123,123,0.2)',
                }} >
                    I'm Mourad - Adventure travel photographer,
                    videographer, blogger, and digital nomad. Join me as
                    I share wild stories, beautiful images, and useful
                    travel tips with you from around the world!
                </p>
            </div>
            <button onClick={() => handleScroll(refPosts)} id="hero-button-1" className="hero-button" style={{
                ...getHeroSectionButtonOneStyle(winSize, height),
                opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1, transition: 'opacity 0.3s ease-in'

                // background:'blue'

            }}>Read my Blog</button>
            <button onClick={() => handleScroll(refVideos)} id="hero-button-2" className="hero-button" style={{
                ...getHeroSectionButtonTwoStyle(winSize, height),
                opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1, transition: 'opacity 0.3s ease-in'


            }}>Watch my Videos</button>

            <div className="scroll-down-arrow" style={{ position: 'absolute', bottom: 200, left: isLargeMobileLandscape ? '15%' : '50%', transform: `translateX(${isLargeMobileLandscape ? -15 : -50}%)`, height: 70 }}>
                <ScrollDownArrow />
            </div>

            {isLargeMobileLandscape && <div className="scroll-down-arrow" style={{ position: 'absolute', bottom: 200, right: '15%', transform: 'translateX(15%)', height: 70 }}>
                <ScrollDownArrow />
            </div>}
            {/* <div className="scroll-down-arrow" style={{ position: 'absolute', bottom: 100, right: '5%', height: 70 }}>
                <ScrollDownArrow />
            </div> */}
        </Fragment>
    )
}

export default HeroSectionContent;