import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';
import { io } from 'socket.io-client';

import { styles } from './styles';
import { MESSAGES_EXAMPLE } from '../../../files/utils/messages';

let messageQueue: MessageProps[] = []

const socket = io(String(api.defaults.baseURL));

socket.on('new_message', newMessage => {
    messageQueue.push(newMessage);
    console.log(newMessage);
})



export function MessageList() {
    const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([])

    useEffect(() => {
        async function fetchMessages() {
            const messagesResponse = await api.get<MessageProps[]>('messages/last3');

            setCurrentMessages(messagesResponse.data);
        }

        fetchMessages();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            if (messageQueue.length > 0) {
                setCurrentMessages(prevState => [
                    messageQueue[0],
                    prevState[0],
                    prevState[1],
                    prevState[2],
                ].filter(Boolean))

                messageQueue.shift()
            }

            return () => clearInterval(timer);
        }, 3000)
    })

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps='never'
        >
            {currentMessages.map(message => <Message key={message.id} data={message} />)}
        </ScrollView>
    );
}