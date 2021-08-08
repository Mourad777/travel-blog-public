import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { ScrollTrigger } from 'gsap/all'
import Loader from "../../components/Loader/Loader";


export default ({ reference, videos, winSize, height, isLargeMobileLandscape, scrollWidth,isVideosLoading }) => {
    const history = useHistory();
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    let perPage = 3;
    let margin = '1.66%'
    let width = '30%'
    if (winSize === 1) {
        width = '80%'
        perPage = 1
        margin = '6.66%'
    }
    if (winSize === 2) {
        perPage = 2
        width = '40%'
        margin = '3.33%'
    }

    useEffect(() => {
        ScrollTrigger.create({
            trigger: reference.current,
            start: "top top",
            scrub: 0.5,
            snap: true,
            pin: false,

        });
    }, [reference])

    const getData = async () => {
        const slice = videos.slice(offset === 1 || offset === 0 ? 0 : offset * perPage - perPage, offset === 0 ? perPage : offset * perPage);
        setData(slice)
        setPageCount(Math.ceil(videos.length / perPage))
    }

    useEffect(() => {
        getData()
    }, [offset, videos]);
    useEffect(() => {
        getData()
        setOffset(1)
    }, [winSize])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };
    const aspectRatio = scrollWidth / height;
    let titleStyle = { fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: '#daad86', textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', fontSize: '4em', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-60px' }
    }
    const mobileLandscapePaginateStyle = {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: 10,
        display: 'flex',
    }

    return (
        <div style={{ paddingTop: 50, height: '100vh', background: 'rgb(236, 231, 226)', width: '100%', position: 'relative' }} ref={reference}>
            {isVideosLoading && <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%)' }}><Loader /></div>}

            <p style={titleStyle}>Videos</p>
            <div
                style={{
                    overflow: "hidden",
                    width: "85vw",
                    maxWidth: 900,
                    margin: "auto",
                    display: 'flex',
                    justifyContent: 'space-around',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                    position: 'absolute'
                }}
            >
                {data.map((video, i) => (
                    <div
                        key={`video-[${i + 1}]`}
                        onClick={() => {
                            history.push(`/video/${video.id}`)
                        }}
                        style={{
                            background: '#fff',
                            cursor: "pointer",
                            float: "left",
                            position: "relative",
                            width,
                            height: "50vh",
                            overflow: "hidden",
                            minHeight: 205,
                            maxHeight: 600,
                        }}
                    >
                        <div style={{ minHeight: 60, maxHeight: 100, height: '10vh', background: '#fff' }}><p style={{ textAlign: 'center', paddingTop: 10, fontFamily: 'Mulish', fontWeight: 'bold', fontSize: '1.2em' }}>{video.title}</p></div>
                        <img srcSet={`${video.thumbnail} 400w`} src={video.thumbnail || '/assets/video-icon.jpg'} style={{ maxHeight: 300, width: '100%', height: isLargeMobileLandscape ? '40vh' : '25vh', objectFit: !video.thumbnail && isLargeMobileLandscape ? 'scale-down' : 'cover' }} />
                        {!isLargeMobileLandscape && <div style={{ maxHeight: 200, height: '100%', background: '#fff' }}><p style={{ textAlign: 'center', paddingTop: 10 }}>{video.description}</p></div>}
                    </div>
                    // </Link>
                ))}
            </div>

            <div style={isLargeMobileLandscape ? mobileLandscapePaginateStyle : { display: 'flex' }}>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        </div>
    )
};
