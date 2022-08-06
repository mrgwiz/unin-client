import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    VStack,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeMesssage } from '../store/reducers/messages';

const Messages = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.messages.messages);

    return (
        <VStack>
            {messages.map((message, index) => (
                <Alert key={index} status={message.type}>
                    <AlertIcon />
                    <AlertTitle>{message.type[0].toUpperCase() + message.type.slice(1)}</AlertTitle>
                    <AlertDescription>{message.message}</AlertDescription>
                    <CloseButton
                        alignSelf="flex-end"
                        marginLeft="auto"
                        onClick={() => dispatch(removeMesssage(index))}
                    />
                </Alert>
            ))}
        </VStack>
    );
}

export default Messages;
