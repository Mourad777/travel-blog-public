import React, { useEffect, useRef } from 'react'
import ScrollDownArrow from '../../components/ScrollDownArrow/ScrollDownArrow';
import { heroTextPathOne } from '../svgs';
import {
    getHeroSectionPicPiecesStyle,
    getHeroSectionPicStyle,
    getHeroSectionNameStyle,
    getHeroSectionTextStyle,
    getHeroSectionButtonOneStyle,
    getHeroSectionButtonTwoStyle,
    animate
} from "../utility";
import Search from './SearchResults';
import { ScrollTrigger, gsap, ScrollToPlugin } from 'gsap/all';
import { heroSectionAnimations } from './gsapAnimations';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
const HeroSectionContent = ({
    winSize,
    photos,
    videos,
    posts,
    height,
    countryThumbnails,
    refPosts,
    refVideos,
    isLargeMobileLandscape,
    isInitialLoader,
    handleSearchInputTouch,
    mainContainerRef,
}) => {
    const heroPicMainRef = useRef(null);
    const heroPicPieceOneRef = useRef(null);
    const heroPicPieceTwoRef = useRef(null);
    const heroPicPieceThreeRef = useRef(null);
    const heroPrimaryTextRef = useRef(null);
    const heroSecondaryTextRef = useRef(null);
    const buttonOneRef = useRef(null);
    const buttonTwoRef = useRef(null);
    const scrollIconsWrapperRef = useRef(null);

    useEffect(() => {

        if (mainContainerRef &&
            heroPicMainRef &&
            heroPicPieceOneRef &&
            heroPicPieceTwoRef &&
            heroPicPieceThreeRef &&
            heroPrimaryTextRef &&
            heroSecondaryTextRef &&
            buttonOneRef &&
            buttonTwoRef &&
            scrollIconsWrapperRef) {

            animate(heroSectionAnimations(
                {
                    mainContainerRef,
                    heroPicMainRef,
                    heroPicPieceOneRef,
                    heroPicPieceTwoRef,
                    heroPicPieceThreeRef,
                    heroPrimaryTextRef,
                    heroSecondaryTextRef,
                    buttonOneRef,
                    buttonTwoRef,
                    scrollIconsWrapperRef,
                }
            ))
            gsap.to(heroPrimaryTextRef.current, { strokeDashoffset: 0, duration: 1, });
            gsap.to(heroPrimaryTextRef.current, {  fill: 'rgba(255,255,255,1)', duration: 3 })
        }



    }, [mainContainerRef,
        heroPicMainRef,
        heroPicPieceOneRef,
        heroPicPieceTwoRef,
        heroPicPieceThreeRef,
        heroPrimaryTextRef,
        heroSecondaryTextRef,
        buttonOneRef,
        buttonTwoRef,
        scrollIconsWrapperRef])

    const handleScroll = (ref) => {
        gsap.to(window, { duration: 3, scrollTo: ref.current });
    }

    useEffect(() => {
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());

        };
    }, [])

    return (
        <div style={{
            height: '100vh',
            position: 'relative',
        }}>

            <Search handleSearchInputTouch={handleSearchInputTouch} photos={photos} videos={videos} posts={posts} winSize={winSize} countryThumbnails={countryThumbnails} />

            <img
                src='/assets/images/welcome-background.webp'
                id="hero-pic-main"
                ref={heroPicMainRef}
                style={{
                    ...getHeroSectionPicStyle(winSize, height),
                    position: 'fixed'
                }} />
            {["One", "Two", "One"].map((piece, i) => {
                let image;
                if (i + 1 === 1) image = '/assets/images/welcome-section-piece-1.webp';
                if (i + 1 === 2) image = '/assets/images/welcome-section-piece-2.webp';
                if (i + 1 === 3) image = '/assets/images/welcome-section-piece-3.webp';
                let ref;
                if (i === 0) ref = heroPicPieceOneRef;
                if (i === 1) ref = heroPicPieceTwoRef;
                if (i === 2) ref = heroPicPieceThreeRef;
                return (
                    <img
                        ref={ref}
                        src={image}
                        className={`HeroPicPiece${piece}`}
                        key={`[Heropic]${i}`}
                        style={getHeroSectionPicPiecesStyle(winSize, height, i + 1,)
                        }
                    />
                )
            })}

            <svg

                ref={heroPrimaryTextRef}
                style={{
                    ...getHeroSectionNameStyle(winSize, height),
                    opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1,
                    transition: 'opacity 0.3s ease-in',
                    zIndex: isInitialLoader ? 45 : -1,
                    pointerEvents: 'none'
                }}
                viewBox="0 0 120 50"
                id="heroTextMainPath"
            >
                <g>
                    <path d={heroTextPathOne} />
                </g>
            </svg>

            <div ref={heroSecondaryTextRef} style={{
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
            <button ref={buttonOneRef} onClick={() => handleScroll(refPosts)} style={{
                ...getHeroSectionButtonOneStyle(winSize, height),
                opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1, transition: 'opacity 0.3s ease-in'

                // background:'blue'

            }}>Read my Blog</button>
            <button ref={buttonTwoRef} onClick={() => handleScroll(refVideos)} style={{
                ...getHeroSectionButtonTwoStyle(winSize, height),
                opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1, transition: 'opacity 0.3s ease-in'


            }}>Watch my Videos</button>
            <div ref={scrollIconsWrapperRef}>
                <div className="scroll-down-arrow" style={{ position: 'absolute', bottom: 200, left: isLargeMobileLandscape ? '15%' : '50%', transform: `translateX(${isLargeMobileLandscape ? -15 : -50}%)`, height: 70 }}>
                    <ScrollDownArrow />
                </div>

                {isLargeMobileLandscape && <div className="scroll-down-arrow" style={{ position: 'absolute', bottom: 200, right: '15%', transform: 'translateX(15%)', height: 70 }}>
                    <ScrollDownArrow />
                </div>}
            </div>
        </div>
    )
}

export default HeroSectionContent;