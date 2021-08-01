import React, { useEffect, useState } from 'react'
import { DownArrow, Location } from "../svgs";
import { FaWindowClose } from "react-icons/fa";
import { useParams } from 'react-router';
import axios from 'axios'
import { AppUrl } from '../utility';
import { Typography } from '@material-ui/core';
import { countries } from '../../admin/util/countries-iso';
import { ScrollTrigger } from 'gsap/all';
import { Button, Checkbox } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import CameraInfo from '../../../components/blog/Photo/CameraInfo';
const Photo = ({ winSize }) => {
    const params = useParams();
    const history = useHistory();
    const [photo, setPhoto] = useState({});
    const [isHideCameraInfo, setisHideCameraInfo] = useState(false);
    useEffect(() => {
        const getPhoto = async () => {
            const photoResponse = await axios.get(`${AppUrl}api/photo/${params.photoId}`);
            console.log('photo response', photoResponse)
            setPhoto(photoResponse.data);
        }
        getPhoto();

        const triggers = ScrollTrigger.getAll();
        triggers.forEach(tr => {
            tr.kill()
        });
    }, [])

    const handleCameraInfo = (e) => {
        setisHideCameraInfo(!isHideCameraInfo)
    }

    return (<div style={{ background: '#ece7e2', height: '100%', width: '100%' }}>
        <div
            style={{
                opacity: photo ? 1 : 0,
                transition: "opacity 1s ease-in",
                width: "100vw",
                height: "100%",
                zIndex: 10,
                position: "fixed",
                top: 0,
                right: 0,
                backgroundColor: "rgb(218, 173, 134)"
            }}
            className="photo-preview-container"
        >
            <div style={{ padding: 20 }}>
                <Button content='Home' onClick={() => { history.push('/') }} />
            </div>
            <div
                style={{
                    left: 0,
                    margin: winSize === 1 ? "auto" : "",
                    right: winSize === 1 ? 0 : "",
                    position: "absolute",
                    height: "100%",
                    width: "100vw"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%"
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            padding: '30px 30px 0 30px',
                        }}
                        className="image-container"
                    >
                        <div className="image" style={{ display: 'flex', flexDirection: 'column', background: 'black', position: 'relative' }}>
                            {!isHideCameraInfo && (
                                <CameraInfo photo={photo} />
                            )}

                            <img
                                style={{
                                    border: "10px solid white",
                                    height: '60vh',
                                    width:
                                        winSize === 1
                                            ? "100%"
                                            : winSize === 2
                                                ? 500
                                                : 800,
                                    objectFit: "contain"
                                }}
                                src={photo.src}
                                alt=""
                            />{" "}
                            <div className="extra-img-info-container" style={{ color: 'white', background: '#daad86' }}>
                                {(photo.photographer && photo.date_taken) && (
                                    <div style={{ color: "#fff4e1" }}>
                                        <Typography style={{ fontStyle: 'italic' }} variant="subtitle1">Taken by {photo.photographer} {photo.date_taken ? ' on ' + new Date(photo.date_taken).toDateString() : ''}</Typography>
                                    </div>
                                )}
                                {(!photo.photographer && photo.date_taken) && (
                                    <div style={{ color: "#fff4e1" }}>
                                        <Typography style={{ fontStyle: 'italic' }} variant="subtitle1">Taken on {new Date(photo.date_taken).toDateString()}</Typography>
                                    </div>
                                )}
                                {(!photo.photographer && !photo.date_taken) && (
                                    <div style={{ color: "#fff4e1" }}>
                                        <Typography style={{ fontStyle: 'italic' }} variant="subtitle1">Taken by {photo.photographer} </Typography>
                                    </div>
                                )}
                                {photo.country && (
                                    <div
                                        onClick={() => history.push(`/destination/${photo.country}`)}
                                        style={{ display: 'flex', color: "#fff4e1", background: '#DAAD86', padding: 10, cursor: 'pointer' }}>
                                        <Location />
                                        <Typography variant="body1">{countries.find(c => c.value === photo.country).text}</Typography>

                                    </div>
                                )}
                                {photo.title && (
                                    <div>
                                        <Typography variant="h5">{photo.title}</Typography>
                                    </div>
                                )}
                                <div>
                                    <Typography variant="h6">{photo.description}</Typography>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            height: "100%",
                            backgroundColor: "rgb(218, 173, 134)",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                color: "white",
                                paddingLeft: 30,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                            }}
                            className="photo-icon-container"
                        >
                            <div style={{ marginTop: 20, display: 'flex' }}>
                                <Checkbox checked={isHideCameraInfo} onChange={handleCameraInfo} toggle />
                                <span style={{ color: '#fff', marginLeft: 10, fontSize: '1.2em' }}>Hide camera info</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: 200,
                                    cursor: "pointer",
                                    padding: 5,
                                }}
                            >
                                <DownArrow />
                                <p style={{ marginLeft: 33, fontSize: '1.2em' }}>
                                    <a style={{color:'#fff'}} href={photo.src} download >Download</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >)
}

export default Photo