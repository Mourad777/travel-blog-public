import React, { useState, useEffect, useRef, Fragment } from 'react'
import { StyledFormTextInput, StyledBlueButton, StyledRedButton } from '../StyledComponents';
import { List, TextArea, Form, Button } from 'semantic-ui-react'
import { AppUrl } from '../utility';
import axios from 'axios';
import '../global-styles/tinymceReadonly.css'
import Avatar from 'react-avatar';
import { useHistory, useParams } from 'react-router';
import { ScrollTrigger } from 'gsap/all';

export const Replies = ({ comment, setReplyComment }) => {
    return (
        <div>
            {(comment.replies || []).map(reply => {
                if (!reply.is_approved) return null;
                return (
                    <div style={{ marginLeft: 30 }} key={reply.id}>
                        <div style={{ display: 'flex', margin: '20px 0' }}>
                            <div style={{
                                width: 60,
                                borderLeft: '5px solid #cecece', paddingLeft: 5
                            }}>
                                <Avatar
                                    size={60}
                                    md5Email={reply.encryptedEmail}
                                    round={true}
                                />
                            </div>
                            <div style={{ padding: '0 20px' }}>
                                <span style={{ display: 'block', fontSize: '1.6em', fontWeight: 'bold', marginBottom: 10, lineHeight: 1.1 }}>{reply.user}</span>
                                <textarea readOnly rows="4" cols="50" style={{
                                    fontWeight: 600,
                                    border: 'none',
                                    background: '#efefef',
                                    fontFamily: 'Mulish',
                                    fontSize: '1.1em',
                                    lineHeight: 1.8,
                                }}>
                                    {reply.content}
                                </textarea>
                            </div>
                        </div>

                        <StyledBlueButton onClick={() => setReplyComment(reply)} icon="image"
                        >
                            Reply
                        </StyledBlueButton>
                        <Replies setReplyComment={setReplyComment} comment={reply} />
                    </div>
                )
            })}
        </div>
    )
}

const Post = ({ winSize }) => {

    const params = useParams();
    const selectedPost = params.postId;

    const postContainer = useRef(null)
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    const [name, setName] = useState('');
    const [content, setComment] = useState('');
    const [email, setEmail] = useState('');
    const [replyComment, setReplyComment] = useState('');
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleComment = (e) => {
        setComment(e.target.value)
    }
    const submitComment = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('post_id', selectedPost);
        formData.append('content', content);
        formData.append('comment_type', 'post');
        if (replyComment) {
            formData.append('comment_id', replyComment.id)
        }
        await axios.post(`${AppUrl}api/comments/save`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(res => console.log('res', res.data)).catch(e => console.log('error', e));

        const commentsRes = await axios.get(`${AppUrl}api/comments/post/${selectedPost}`);
        setComments(commentsRes.data)
        setComment('');
        setName('');
        setEmail('');
        setReplyComment('');
    }
    useEffect(() => {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(tr => {
            tr.kill()
        })

        const getPost = async () => {
            const postRes = await axios.get(`${AppUrl}api/posts/${selectedPost}`);
            console.log('postRes', postRes);
            setPost(postRes.data)
        }
        getPost()

        const getComments = async () => {
            const commentsRes = await axios.get(`${AppUrl}api/comments/post/${selectedPost}`);
            console.log('commentsRes.data', commentsRes.data)
            setComments(commentsRes.data);
        }
        getComments()
    }, []);

    const history = useHistory();

    return (
        <Fragment>
            <div style={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden' }}>
                <div style={{
                    zIndex: 1, top: 50, left: '50%', transform: 'translateX(-50%)', position: 'absolute',
                    background: 'rgb(0,0,0,0.6)',
                    borderRadius: 2,
                    padding: 20,
                    minWidth: 300,
                }}><h1 style={{ textAlign: 'center', margin: '20px 0', fontSize: winSize === 1 ? '2em' : '2.5em', fontFamily: "Merriweather", color: 'white' }}>{post.title}</h1></div>
                {!!post.image && <img src={post.image} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', position: 'absolute' }} />}
            </div>

            <div ref={postContainer} style={{ width: '100%', height: '100%', background: '#fff', padding: '40px 20px', maxWidth: 600, margin: 'auto' }}>
                <Button content='Home' onClick={() => { history.push('/') }} />
                <p style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.5em', fontFamily: "Merriweather", color: '#afafaf' }}>{`Posted on ${new Date(post.created_at).toLocaleDateString()} ${!!post.author ? 'by ' + post.author : ''}`}</p>
                <div dangerouslySetInnerHTML={{
                    __html: `<style>
            @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
            img {
                max-width:100%;
                object-fit:cover;
            }
            </style>` + post.content
                }} />

                {comments.length > 0 && <p style={{ fontSize: '2.5em', marginTop: 30 }}>{replyComment ? 'Comment' : 'Comments'}</p>}
                <Form style={{ paddingBottom: 20 }}>
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
                            {(comments || []).map(item => {
                                if (!item.is_approved) return null;
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
                        <TextArea value={content} onChange={handleComment} placeholder='Comment' style={{ minHeight: 100, width: '100%' }} />
                        <div style={{ marginTop: 20 }}>
                            <label style={{ fontSize: '1.2em' }}>Full Name</label>
                            <StyledFormTextInput value={name} onChange={handleName} placeholder='Full Name' />
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <label style={{ fontSize: '1.2em' }}>E-mail</label>
                            <StyledFormTextInput value={email} onChange={handleEmail} placeholder='E-mail' />
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
            </div>
        </Fragment>)
}

export default Post;