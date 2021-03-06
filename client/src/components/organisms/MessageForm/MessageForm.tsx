import { useState, useEffect, useContext } from 'react';
import { ChatContext } from 'views/ChatRoom/ChatRoom';
import { MessageType, SocketUser } from 'utils/types/types';
import { Color } from 'utils/types/enums';
import ButtonSend from 'components/atoms/SendButton/SendButton';
import InputMessage from 'components/atoms/CustomInput/CustomInput';
import EmojiPicker from 'components/molecules/EmojiPicker/EmojiPicker';
import { IEmojiData } from 'emoji-picker-react';
import { FormWrapper, Form } from './MessageFormStyles';

type Props = {
  username: SocketUser['user'];
  className?: string;
};

const defaultMessage: MessageType = {
  date: new Date(),
  sender: '',
  text: '',
};

const MessageForm = ({ username, className }: Props) => {
  const { sendMessage } = useContext(ChatContext);
  const [isSubmitted, setSubmitted] = useState(false);
  const [typingMessage, setTypingMessage] = useState<MessageType>(defaultMessage);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!typingMessage.text) return;
    sendMessage(typingMessage.text);
    setSubmitted(prevState => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, sender: typeof username): void => {
    const msgText = e.target.value;
    setTypingMessage({ date: new Date(), sender, text: msgText });
  };

  const concatMessageWithEmoji = ({emoji}: IEmojiData) => setTypingMessage(currMessage => ({
    ...currMessage,
    text: `${currMessage.text}${emoji}`
  }))

  useEffect(() => {
    if(isSubmitted) {
      const clearForm = () => {
        setTypingMessage(defaultMessage);
        setSubmitted(false);
      };
  
      clearForm();
    }
  }, [isSubmitted]);

  return (
    <FormWrapper className={className}>
      <Form onSubmit={e => handleSubmit(e)}>
        <InputMessage type='text' placeholder='Type new message' value={typingMessage.text} onChange={e => handleChange(e, username)} />
        <EmojiPicker getEmoji={concatMessageWithEmoji}/>
        <ButtonSend color={Color.LightBlue} type='submit' />
      </Form>
    </FormWrapper>
  );
};

MessageForm.defaultProps = {
  className: '',
};

export default MessageForm;
