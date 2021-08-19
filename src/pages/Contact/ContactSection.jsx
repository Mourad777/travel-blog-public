import React, { useState, Fragment, useEffect } from 'react'
import {
    StyledInputGroup,
    StyledInputLabel,
    StyledTextInput,
    StyledTextareaInput,
    StyledContactFormSubmitButton,
    StyledInputError
} from '../StyledComponents'
import { AppUrl, validateMessage } from '../utility';
import axios from 'axios';

const ContactForm = ({ isLargeMobileLandscape, scrollWidth, height, reference, configuration }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isFormTouched, setIsFormTouched] = useState(false);

    useEffect(() => {
        setErrors(validateMessage({ name, email, message }))
    }, [name, email, message])

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
        setIsFormTouched(true);
        const errors = validateMessage({ name, email, message });
        setErrors(errors);
        console.log('errors', errors)
        if (errors.name || errors.email || errors.message) {
            return;
        }

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
        setName('');
        setEmail('');
        setMessage('');
        setIsFormTouched(false)
        console.log('message response', messageResponse);

    }
    const aspectRatio = scrollWidth / height;
    let titleStyle = { fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: '#fff', textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-130px' }
    }

    const isMessagesAllowed = configuration.is_messages_allowed || configuration.is_messages_allowed === undefined;

    return (
        <div id="contact-section" ref={reference} style={{
            height: '100vh',
            backgroundColor: '#daad86',
            position: 'relative',
            zIndex: 1,
            minHeight: 360,
        }}>
            <p style={titleStyle}>Get In Touch</p>
            {!isMessagesAllowed && <p style={{ textAlign: 'center', color: 'red', fontFamily: 'Mulish' }}>Messages are disabled at the moment</p>}
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
                    <StyledTextInput onFocus="window.scrollTo(0, 0);" disabled={isLoading || !isMessagesAllowed} value={name} onChange={(e) => setNameHandler(e.target.value)} type="text" />
                    {!!isFormTouched && <StyledInputError>{errors.name}</StyledInputError>}
                </StyledInputGroup>

                <StyledInputGroup>
                    <StyledInputLabel>E-mail</StyledInputLabel>
                    <StyledTextInput onFocus="window.scrollTo(0, 0);" disabled={isLoading || !isMessagesAllowed} value={email} onChange={(e) => setEmailHandler(e.target.value)} type="text" />
                    {!!isFormTouched && <StyledInputError>{errors.email}</StyledInputError>}
                </StyledInputGroup>

                <StyledInputGroup>
                    <StyledInputLabel>Message</StyledInputLabel>
                    <StyledTextareaInput onFocus="window.scrollTo(0, 0);" disabled={isLoading || !isMessagesAllowed} value={message} onChange={(e) => setMessageHandler(e.target.value)} rows="4" />
                    {!!isFormTouched && <StyledInputError>{errors.message}</StyledInputError>}
                </StyledInputGroup>
                <StyledContactFormSubmitButton disabled={isLoading || !isMessagesAllowed} onClick={submitMessageHandler}>
                    Submit
                </StyledContactFormSubmitButton>
            </div>
        </div  >
    )

}

export default ContactForm;