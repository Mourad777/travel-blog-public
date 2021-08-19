import React, { useEffect, useState } from 'react'
import { StyledPostRow, StyledLatestPostsInnerWrapper, StyledLatestPostsOuterWrapper } from '../StyledComponents'
import OuterColumn from "./OuterColumns";
import RowLayout from './RowLayout';
import Paginate from '../../components/Paginate/Paginate';
import { ScrollTrigger, gsap } from 'gsap/all'
import Loader from '../../components/Loader/Loader';
const Posts = ({ winSize, isLargeMobileLandscape, postsFromDB, reference, height, scrollWidth, isPostsLoading }) => {

    const [pageCount, setPageCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [selectedPage, setSelectedPage] = useState(0);

    // useEffect(() => {
    //     if (winSize > 1) {
    //         setOffset(1)
    //     }
    // }, [winSize])

    // useEffect(() => {
    //     getData()
    // }, [offset, winSize, postsFromDB]);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: reference.current,
            start: "top top",
            scrub: 0.5,
            snap: true,
            pin: false,

        });
    }, [reference])

    // useEffect(() => {
    //     gsap.fromTo(".post-text-1", { opacity: 0.3 }, { opacity: 1, duration: 0.4 });
    //     gsap.fromTo(".post-image-1", { opacity: 0.3 }, { opacity: 1, duration: 0.4 });
    //     gsap.fromTo(".post-text-2", { opacity: 0.3 }, { opacity: 1, duration: 0.4 });
    //     gsap.fromTo(".post-image-2", { opacity: 0.3 }, { opacity: 1, duration: 0.4 });


    // }, [selectedPage]);

    useEffect(() => {
        getData()
    }, [selectedPage, postsFromDB]);

    useEffect(() => {
        setSelectedPage(0)
        getData();
    }, [winSize])

    const getPostsPerPage = (winSize) => {
        let postsPerPage = 2;
        if (winSize === 1) postsPerPage = 1;
        return postsPerPage
    }

    const getData = async () => {
        const perPage = getPostsPerPage(winSize);
        setPageCount(Math.ceil((postsFromDB || []).length / perPage))
        const slice = postsFromDB.slice((selectedPage + 1) * perPage - perPage, (selectedPage + 1) * perPage);
        setPosts(slice)
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setSelectedPage(selectedPage)
    };

    const aspectRatio = scrollWidth / height;

    let titleStyle = { zIndex: 1, fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: '#fff', background: '#daad86', textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-40px' }
    }

    return (<div ref={reference} style={{
        height: '100vh', overflow: 'hidden', zIndex: 6, position: 'relative', minHeight: 360,
    }}>
        {isPostsLoading && <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%)' }}><Loader /></div>}
        <p style={titleStyle}>Posts</p>

        <div style={{
            display: 'flex', background: '#DAAD86',
            height:
                // 'calc(100vh - 760px)'
                '100%',
            maxHeight: winSize === 1 && postsFromDB.length === 0 ? '100%' : 50,
        }}>
            {postsFromDB.length > 1 &&
                <Paginate totalPages={pageCount} page={selectedPage} handlePageClick={handlePageClick} />}
        </div>
        <StyledLatestPostsOuterWrapper >
            {winSize > 1 && <OuterColumn isLargeMobileLandscape={isLargeMobileLandscape} isLeft />}
            <StyledLatestPostsInnerWrapper height={height} isLargeMobileLandscape={isLargeMobileLandscape}>

                {posts.map((post, index) => (
                    <StyledPostRow isLargeMobileLandscape={isLargeMobileLandscape} key={`post[${post._id}]index[${index}]`} className="row" index={index} winSize={winSize} >

                        <RowLayout isLargeMobileLandscape={isLargeMobileLandscape} offset={selectedPage} winSize={winSize} post={post} index={index} />

                    </StyledPostRow>
                ))}

                <div style={{ background: '#daad86', height: '100%' }} />
            </StyledLatestPostsInnerWrapper>
            {winSize > 1 && <OuterColumn isLargeMobileLandscape={isLargeMobileLandscape} />}
        </StyledLatestPostsOuterWrapper>

        <div style={{
            background: '#DAAD86',
        }}>
        </div>
    </div>)
}

export default Posts;