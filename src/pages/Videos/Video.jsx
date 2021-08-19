import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/all';
import ReactPlayer from 'react-player'
import { AppUrl, getPusher, primaryColor, validateMessage } from '../utility';
import { Replies } from '../Posts/Post';
import { List, TextArea, Form, Button } from 'semantic-ui-react'
import { StyledFormTextInput, StyledBlueButton, StyledRedButton, StyledInputError } from '../StyledComponents';
import Avatar from 'react-avatar';
import { getComments, getVideo } from '../../api/util';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

const Video = ({ winSize }) => {
    const params = useParams();
    const history = useHistory();
    const selectedVideo = params.videoId;

    const [video, setVideo] = useState({});
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');
    const [replyComment, setReplyComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormTouched, setIsFormTouched] = useState(false);

    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleComment = (e) => {
        setComment(e.target.value)
    }

    useEffect(() => {
        setErrors(validateMessage({ name, email, message: comment }));
    }, [name, email, comment])

    const getInitialData = async () => {
        await getVideo(selectedVideo, setVideo, setIsLoading);
        await getComments(selectedVideo, 'video', setComments, setIsLoading);
    }

    useEffect(() => {
        getInitialData()
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(tr => {
            tr.kill()
        });

        const channel = getPusher().subscribe("my-channel");
        channel.bind("BlogUpdated", async (data) => {
            console.log('data', data)
            await getVideo(selectedVideo, setVideo, setIsLoading);
        });
        channel.bind("CommentsUpdated", async (data) => {
            console.log('data', data)
            await getComments(selectedVideo, 'video', setComments, setIsLoading);
        });
    }, [])


    const submitComment = async () => {
        setIsFormTouched(true);
        const errors = validateMessage({ name, email, message: comment });
        setErrors(errors);
        console.log('errors', errors)
        // if (errors.name || errors.email || errors.message) {
        //     return;
        // }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('video_id', selectedVideo);
        formData.append('content', comment);
        formData.append('comment_type', 'video');

        if (replyComment) {
            formData.append('comment_id', replyComment.id)
        }
        const videoUploadResponse = await axios.post(`${AppUrl}api/comments/save`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(res => console.log('res', res.data)).catch(e => console.log('error', e));

        console.log('Video Upload Response', videoUploadResponse)

        const commentsRes = await axios.get(`${AppUrl}api/comments/video/${selectedVideo}`);
        setComments(commentsRes.data)
        setComment('');
        setName('');
        setEmail('');
        setReplyComment('');
        setIsFormTouched(false);
    }

    if (isLoading || !video) {
        return (<div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%)' }}>
            <Loader color={primaryColor} />
        </div>
        )
    }

    return (
        <div style={{ background: '#ece7e2', height: '100%', width: '100%', paddingBottom: 20 }}>
            {/* {isLoading && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)' }}><Loader /></div>} */}
            {(!!video.title) && (
                <div style={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden' }}>
                    <div style={{
                        zIndex: 1, top: 50, left: '50%', transform: 'translateX(-50%)', position: 'absolute',
                        background: 'rgb(0,0,0,0.6)',
                        borderRadius: 2,
                        padding: 20,
                        minWidth: 300,
                    }}>
                        <h1 style={{ textAlign: 'center', margin: '20px 0', fontSize: winSize === 1 ? '2em' : '2.5em', fontFamily: "Mulish", color: 'white' }}>
                            {video.title}
                        </h1>
                    </div>

                    {!!video.thumbnail && <img src={video.thumbnail} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', position: 'absolute' }} />}
                </div>
            )}
            <div style={{ padding: 20 }}>
                <Button content='Home' onClick={() => { history.push('/') }} />
            </div>
            {/* <p style={{ color: primaryColor, fontSize: '4em', fontFamily: 'Mulish', textAlign: 'center', paddingTop: 56 }}>{video.title}</p> */}
            <div style={{
                maxWidth: 800,
                // display: 'flex',
                // justifyContent: 'space-around',
                margin: 'auto'
            }}
                className="player-container">
                <ReactPlayer
                    controls
                    width="100%"
                    height="100%"
                    url={video.src}
                />
                {!!video.description && (
                    <div style={{ padding: 20, background: '#fff', margin: '10px 0' }}>
                        <p style={{ fontSize: '1.2em', fontFamily: 'Mulish', }}>
                            {video.description}
                        </p>
                    </div>
                )}
            </div>


            <div style={{ background: '#fff', padding: 10, maxWidth: 800, margin: 'auto' }} className="video-comments-container">

                {video.is_comments_enabled ? <Fragment>
                    {comments.length > 0 && <p style={{ fontSize: '2.5em', marginTop: 30, textAlign: 'center' }}>{replyComment ? 'Comment' : 'Comments'}</p>}
                    <Form style={{ paddingBottom: 20, fontSize: '1em' }}>
                        {replyComment ?
                            <div style={{ display: 'flex', margin: '20px 0' }}>
                                <div style={{ width: 60 }}>
                                    <Avatar
                                        size={100}
                                        md5Email={replyComment.encryptedEmail}

                                    />
                                </div>
                                <textarea readOnly rows="3" cols="50" style={{
                                    fontWeight: 600,
                                    border: 'none',
                                    background: '#efefef',
                                    fontFamily: 'Mulish',
                                    fontSize: '1.1em',
                                    lineHeight: 1.8,
                                    marginLeft: 20

                                }}>
                                    {replyComment.content}
                                </textarea>
                            </div>
                            : <List>
                                {(comments || []).filter(item => item.parent_id === null).map(item => {
                                    return (<List.Item style={{ marginTop: 20 }} key={item.id}>
                                        <div style={{ display: 'flex', marginBottom: 20 }}>
                                            <div style={{ width: 60 }}>
                                                <Avatar
                                                    size={60}
                                                    md5Email={item.encryptedEmail}
                                                    round={true}
                                                />
                                            </div>
                                            <div style={{ padding: '0 20px' }}>
                                                <span style={{ display: 'block', fontSize: '1.6em', fontWeight: 'bold', marginBottom: 10, lineHeight: 1.1 }}>{item.user}</span>
                                                <textarea readOnly rows="4" cols="50" style={{
                                                    fontWeight: 600,
                                                    border: 'none',
                                                    background: '#efefef',
                                                    fontFamily: 'Mulish',
                                                    fontSize: '1.1em',
                                                    lineHeight: 1.8,
                                                }}>
                                                    {item.content}
                                                </textarea>
                                            </div>
                                        </div>

                                        <StyledBlueButton onClick={() => setReplyComment(item)} icon="image"
                                        >
                                            Reply
                                        </StyledBlueButton>
                                        {(item.replies || []).length > 0 && (
                                            <div style={{ marginLeft: 20, marginTop: 10 }}>
                                                <Replies comment={item} setReplyComment={setReplyComment} />
                                            </div>
                                        )}
                                    </List.Item>)
                                })}
                            </List>}


                        <div>
                            <label style={{ fontSize: '2em', display: 'block', margin: '40px 0 30px 0' }}>{replyComment.content ? `Reply to ${replyComment.user}` : 'Leave a Comment'}</label>
                            <TextArea value={comment} onChange={handleComment} placeholder='Comment' style={{ minHeight: 100, width: '100%' }} />
                            {!!isFormTouched && <StyledInputError>{errors.message}</StyledInputError>}
                            <div style={{ marginTop: 20 }}>
                                <label style={{ fontSize: '1.2em' }}>Full Name</label>
                                <StyledFormTextInput value={name} onChange={handleName} placeholder='Full Name' />
                                {!!isFormTouched && <StyledInputError>{errors.name}</StyledInputError>}
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <label style={{ fontSize: '1.2em' }}>E-mail</label>
                                <StyledFormTextInput value={email} onChange={handleEmail} placeholder='E-mail' />
                                {!!isFormTouched && <StyledInputError>{errors.email}</StyledInputError>}
                            </div>
                        </div>
                        <div style={{ margin: '40px 0' }}>
                            <StyledBlueButton onClick={submitComment} icon="image"
                            >
                                Submit
                            </StyledBlueButton>
                            {replyComment.content && (
                                <StyledRedButton onClick={() => setReplyComment('')} icon="image"
                                >
                                    Cancel Reply
                                </StyledRedButton>
                            )}
                        </div>
                    </Form>
                </Fragment> : <div><h1>Comments Disabled</h1></div>}
            </div>
        </div>
    )
}

export default Video