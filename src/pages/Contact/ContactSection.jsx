import React, { useState, Fragment } from 'react'
import { StyledInputGroup, StyledInputLabel, StyledTextInput, StyledTextareaInput, StyledContactFormSubmitButton } from '../StyledComponents'
import { AppUrl } from '../utility';
import axios from 'axios';

const ContactForm = ({ isLargeMobileLandscape,scrollWidth,height }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const setNameHandler = (value) => {
        setName(value)
    }

    const setEmailHandler = (value) => {
        setEmail(value)
    }

    const setMessageHandler = (value) => {
        setMessage(value)
    }

    const submitMessageHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('message', message);
        setIsLoading(true);
        let messageResponse;
        try {
            messageResponse = await axios.post(`${AppUrl}api/messages/save`, formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
        } catch (e) {
            setIsLoading(false);
            console.log('message error response', messageResponse);
        }
        setIsLoading(false);
        setName('')
        setEmail('')
        setMessage('')
        console.log('message response', messageResponse);

    }
    const aspectRatio = scrollWidth / height;
    let titleStyle = { fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: '#fff', textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-130px' }
    }

    return (
        <Fragment>
            <p style={titleStyle}>Get In Touch</p>
            {isLoading &&
                <div

                    className="lds-ellipsis"
                    style={{ top: "20%", left: '50%', transform: 'translateX(-50%)', position: 'absolute', margin: "auto", display: "block" }}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
            <div style={{
                maxWidth: 500, padding: '0 10px', margin: 'auto', left: '50%',
                minWidth: 330,
                top: '50%',
                transform: 'translate(-50%,-50%)',
                position: 'absolute'
            }}>
                <StyledInputGroup>
                    <StyledInputLabel>Full name</StyledInputLabel>
                    <StyledTextInput disabled={isLoading} value={name} onChange={(e) => setNameHandler(e.target.value)} type="text" />
                </StyledInputGroup>

                <StyledInputGroup>
                    <StyledInputLabel>E-mail</StyledInputLabel>
                    <StyledTextInput disabled={isLoading} value={email} onChange={(e) => setEmailHandler(e.target.value)} type="text" />
                </StyledInputGroup>

                <StyledInputGroup>
                    <StyledInputLabel>Message</StyledInputLabel>
                    <StyledTextareaInput disabled={isLoading} value={message} onChange={(e) => setMessageHandler(e.target.value)} rows="4" />
                </StyledInputGroup>
                <StyledContactFormSubmitButton disabled={isLoading} onClick={submitMessageHandler}>
                    Submit
                </StyledContactFormSubmitButton>
            </div>
        </Fragment>
    )

}

export default ContactForm;