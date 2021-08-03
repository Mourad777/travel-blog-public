import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navbar/Navbar";
import 'semantic-ui-css/semantic.min.css'
import "./Home.module.css";
import Loader from "./Loader";
import { gsap, ScrollTrigger, ScrollToPlugin } from 'gsap/all'
import { animate } from '../utility'
import { getMapPosition } from "../utility";
import {
    StyledMap,
} from '../StyledComponents'
import MapPath from "./MapPath";
import { useRef } from "react";
import { Fragment } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { getCountryThumbnails, getPhotos, getPosts, getVideos } from "../../api/util";
import { mapsContainerAnimations } from "./gsapAnimations";

// const HeroSection = loadable(() => import('./HeroSectionContent'))



// import HeroSection from './HeroSectionContent'
// import PostsSection from '../Posts/Posts'

// import DestinationsSection from '../Countries/WorldMap'
// import PhotosSection from '../Photos/PhotosSection'
// import VideosSection from '../Videos/VideosSection'

// import ContactSection from '../Contact/ContactSection'

const HeroSection = React.lazy(() => import('./HeroSectionContent'));
const PostsSection = React.lazy(() => import('../Posts/Posts'));
const DestinationsSection = React.lazy(() => import('../Countries/WorldMap'));
const PhotosSection = React.lazy(() => import('../Photos/PhotosSection'));
const VideosSection = React.lazy(() => import('../Videos/VideosSection'));
const ContactSection = React.lazy(() => import('../Contact/ContactSection'));


//innerhe
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Home = (({ scrollWidth, winSize, height }) => {
    const refSection1 = useRef(null)
    const refSection2 = useRef(null)
    const refSection3 = useRef(null)
    const refSection4 = useRef(null)
    const refSection5 = useRef(null)
    const refSection6 = useRef(null)
    const refSectionX = useRef(null)
    const mainContainerRef = useRef(null)
    const mapsPicsContainerRef = useRef(null)
    const initialLoaderRef = useRef(null)
    const mapPathlineRef = useRef(null)

    const [isInitialLoader, setIsInitialLoader] = useState(true);
    const [postsFromDB, setPostsFromDB] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [scrollPosition, setScrollPostion] = useState(0);
    const [scrollSection, setScrollSection] = useState(0);
    const [isLoading, setIsLoading] = useState(0);
    const [countryThumbnails, setCountryThumbnails] = useState([])
    const [searchInputIsTouched, setSearchInputIsTouched] = useState(false)
    const [isInitialDataFetched, setIsInitialDataFetched] = useState(false)

    const handleScrollPosition = (value) => {
        setScrollPostion(value)
    }

    const handleSearchInputTouch = (value) => {
        setSearchInputIsTouched(true)
    }

    const history = useHistory()

    useEffect(() => {
        setScrollSection(0)
        if (window.scrollY > window.innerHeight / 4) {
            setScrollSection(winSize > 2 ? 2 : 1)
        }
        if (window.scrollY > window.innerHeight * 1 + window.innerHeight / 2) {
            setScrollSection(2)
        }
        if (window.scrollY > window.innerHeight * 2 + window.innerHeight / 2) {
            setScrollSection(3)
        }
        if (window.scrollY > window.innerHeight * 3 + window.innerHeight / 2) {
            setScrollSection(4)
        }
        if (window.scrollY > window.innerHeight * 4 + window.innerHeight / 2) {
            setScrollSection(5)
        }
        if (window.scrollY > window.innerHeight * 5 + window.innerHeight / 2) {
            setScrollSection(6)
        }
    }, [scrollPosition, scrollWidth, winSize])

    useEffect(() => {
        if ((scrollPosition > 0 || !!searchInputIsTouched) && !isInitialDataFetched) {
            getInitialData();
        }
    }, [scrollPosition, searchInputIsTouched]);

    const handleFadeOutEnd = () => {
        console.log('end')
        gsap.to(initialLoaderRef.current, { zIndex: -3, duration: 1 })
    }

    useEffect(() => {

        gsap.to(initialLoaderRef.current, { opacity: 0 })
        // gsap.to(initialLoaderRef.current, { zIndex:-1 }, { duration: 7 })


        return () => {
            // ScrollTrigger.getAll().forEach(t => t.kill());
            ScrollTrigger.getAll().forEach(ST => ST.kill());
            gsap.globalTimeline.clear();
        };
    }, [])

    const getInitialData = async () => {
        setIsInitialDataFetched(true)
        await getPosts(setPostsFromDB, setIsLoading);
        await getPhotos(setPhotos, setIsLoading);
        await getVideos(setVideos, setIsLoading);
        await getCountryThumbnails(setCountryThumbnails, setIsLoading);
    }



    useEffect(() => {
        // const triggers = ScrollTrigger.getAll();
        // triggers.forEach(tr => {
        //     tr.kill()
        // });
        const sections = [
            // refSection2, refSection3, refSection4, refSection5, 
            refSectionX].filter(i => i);
        sections.forEach((pan, i) => {
            if (!pan) return;

            ScrollTrigger.create({
                trigger: pan.current,
                start: "top top",
                scrub: 0.5,
                snap: true,
                pin: false,

            });

        });

        const scrollAnimation = () => {
            if (!requestId) {
                requestId = requestAnimationFrame(update);
            }
        }

        // the animation to use
        const tlPath = gsap.timeline({ paused: true });
        tlPath.to(mapPathlineRef.current, { strokeDashoffset: 2850 });
        let requestId;
        const startY = 0;
        const finishDistancePath = window.innerHeight * 2;
        document.addEventListener("scroll", _.throttle(scrollAnimation, 200, {}));
        update();
        function update() {
            tlPath.progress((window.scrollY - startY) / finishDistancePath);
            handleScrollPosition(window.scrollY)
            requestId = null;
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        animate(mapsContainerAnimations({ mainContainerRef, mapsPicsContainerRef }))

        return () => {
            window.removeEventListener("scroll", scrollAnimation)

        };
    }, [
        refSection2, refSection3, refSection4, refSection5,
        refSectionX])

    const transformStyles1 = scrollPosition >= 100 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(-15deg) scale(1)',
    } : {};


    const transformStyles2 = scrollPosition >= 200 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(20deg) scale(1)',
    } : {};


    const transformStyles3 = scrollPosition >= 300 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(-10deg) scale(1)',
    } : {};

    let isLargeMobileLandscape = false;
    if (winSize === 2 && height < 420) {
        isLargeMobileLandscape = true
    }

    return (
        // <Transition
        //     unmountOnExit
        //     in={props.show}
        //     timeout={1000}
        //     onEnter={node => gsap.set(node, startState)}
        //     addEndListener={(node, done) => {
        //         gsap.to(node, 0.5, {
        //             autoAlpha: props.show ? 1 : 0,
        //             y: props.show ? 0 : 50,
        //             onComplete: done
        //         });
        //     }}
        // >
        <Fragment>
            <div id="main" ref={mainContainerRef} style={{ overflow: 'hidden' }}>
                {isInitialLoader && <Loader reference={initialLoaderRef} />}
                {(winSize > 1 && !isLargeMobileLandscape) && (
                    <Navigation
                        getInitialData={getInitialData}
                        scrollSection={scrollSection}
                        componentReferences={
                            {
                                welcome: refSection1,
                                posts: refSection2,
                                destinations: refSection3,
                                photos: refSection4,
                                videos: refSection5,
                                contact: refSection6
                            }
                        }
                    />
                )}

                {/* must use a lower resolution map for mobile devices */}
                <div ref={mapsPicsContainerRef} style={{ zIndex: 5, position: 'fixed', height: '100vh', width: '100%' }}>

                    {(photos[0] || {}).src && <div id="hero-pic-1" style={{
                        position: 'absolute',
                        top: isLargeMobileLandscape ? '20%' : '42%',
                        left: isLargeMobileLandscape ? '40%' : '32%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        // top: winSize === 1 ? 270 : 300,
                        // left: winSize === 1 ? 15 : 100,
                        height: 100,
                        width: 100,
                        cursor: 'pointer',
                        border: '5px solid #e7c5a2',
                        zIndex: 4,
                        transition: '0.3s all ease-in',
                        opacity: 0,
                        scale: 0,
                        transform: 'rotate(0) scale(0)',
                        ...transformStyles1,

                    }}
                        onClick={() => history.push(`/photo/${(photos[0] || {}).id}`)}
                    >
                        <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[0] || {}).src} />
                    </div>}
                    {(photos[1] || {}).src && <div id="hero-pic-2" style={{
                        position: 'absolute',
                        top: isLargeMobileLandscape ? '50%' : '62%',
                        left: isLargeMobileLandscape ? '20%' : winSize <= 2 ? '7%' : '35%',
                        height: 100,
                        width: 100,
                        cursor: 'pointer',
                        border: '5px solid #e7c5a2',
                        zIndex: 4,
                        transition: '0.3s all ease-in',
                        opacity: 0,
                        scale: 0,
                        transform: 'rotate(0) scale(0)',
                        ...transformStyles2,
                    }}
                        onClick={() => history.push(`/photo/${(photos[1] || {}).id}`)}

                    >
                        <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[1] || {}).src} />
                    </div>}
                    {(photos[2] || {}).src && <div id="hero-pic-3" style={{
                        position: 'absolute',
                        top: '58%',
                        left: '50%',
                        height: 100,
                        width: 100,
                        cursor: 'pointer',
                        border: '5px solid #e7c5a2',
                        zIndex: 4,
                        transition: '0.3s all ease-in',
                        opacity: 0,
                        scale: 0,
                        transform: 'rotate(0) scale(0)',
                        ...transformStyles3,
                    }}
                        onClick={() => history.push(`/photo/${(photos[2] || {}).id}`)}
                    >
                        <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[2] || {}).src} />
                    </div>}
                </div>

                <div id="container" style={{ position: "relative" }}>
                    <div id="map-container" style={{ position: 'fixed', height: '100%', width: '100%', top: getMapPosition(winSize, height).top, zIndex: -1 }}>
                        <div style={{ position: 'relative', height: '100vh' }}>

                            < StyledMap windowWidth={winSize} width={getMapPosition(winSize, height).width} lowRes src='/assets/images/notepad.webp' />


                            <MapPath mapPathlineRef={mapPathlineRef} winSize={winSize} />

                        </div>
                    </div>

              
                        <HeroSection
                            height={height}
                            posts={postsFromDB}
                            photos={photos}
                            videos={videos}
                            countryThumbnails={countryThumbnails}
                            tags={[]}
                            categories={[]}
                            winSize={winSize}
                            refPosts={refSection2}
                            refVideos={refSection5}
                            isLargeMobileLandscape={isLargeMobileLandscape}
                            isInitialLoader={isInitialLoader}
                            handleSearchInputTouch={handleSearchInputTouch}
                            mainContainerRef={mainContainerRef}
                        />
                
                    {/* the spacer section is so that gsap will snap to latest post section if the top part of that section is in view port */}
                    <div id="spacer" style={{ overflow: 'hidden', width: '100%', height: '100vh', zIndex: -10 }} ref={refSectionX} />
                    <PostsSection scrollWidth={scrollWidth} height={height} isLargeMobileLandscape={isLargeMobileLandscape} reference={refSection2} postsFromDB={postsFromDB} winSize={winSize} />

                    <DestinationsSection reference={refSection3} isLargeMobileLandscape={isLargeMobileLandscape} postsFromDB={postsFromDB} videos={videos} scrollWidth={scrollWidth} photos={photos} height={height} winSize={winSize} />
                    {/* <Country reference={refSectionDestination} postsFromDB={postsFromDB} /> */}

                    <PhotosSection photos={photos} isLargeMobileLandscape={isLargeMobileLandscape} reference={refSection4} winSize={winSize} height={height} scrollWidth={scrollWidth} />
                    {/* <PhotosSectionDetail reference={refSectionPhotos}/> */}

                    <VideosSection videos={videos} isLargeMobileLandscape={isLargeMobileLandscape} height={height} reference={refSection5} scrollWidth={scrollWidth} winSize={winSize} />
                    {/* <VideosSectionDetail reference={refSectionVideos}/> */}

                    <ContactSection reference={refSection6} isLargeMobileLandscape={isLargeMobileLandscape} height={height} scrollWidth={scrollWidth} />
                </div>

                {/* floating rotating icons */}
                {/* {[
                { style: getCompassStyle(winSize), path: compass },
                { style: getPlaneStyle(winSize), path: airplane },
                { style: getFeetStyle(winSize), path: footPrints }
            ].map((icon, i) => (
                    <svg
                        className="rotating-icon"
                        style={icon.style}
                        viewBox="0 0 50 50"
                        key={`[icon]${i}`}
                    >
                        <g>
                            <path d={icon.path} id={`'${icon.path}'`} />
                        </g>
                    </svg>
            ))} */}

            </div>
            {/* </Transition> */}
        </Fragment>

    );
});

export default React.memo(Home);
