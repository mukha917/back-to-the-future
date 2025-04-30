import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, CircularProgress, Tooltip } from '@mui/material';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { motion } from 'framer-motion';

const ChatContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 500px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 16px;
  padding: 1rem;
  gap: 1rem;
`;

const MessagesContainer = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBubble = styled(motion.div)<{ isUser: boolean }>`
  max-width: 80%;
  padding: 1rem;
  border-radius: 16px;
  background: ${props => props.isUser ? '#0a66c2' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isUser ? 'white' : 'rgba(255, 255, 255, 0.9)'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  word-wrap: break-word;
`;

const InputContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
  
  & .MuiOutlinedInput-root {
    color: white;
    
    & fieldset {
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    &:hover fieldset {
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    &.Mui-focused fieldset {
      border-color: #0a66c2;
    }
  }
`;

interface VoiceButtonProps {
  isListening: boolean;
}

const VoiceButton = styled(IconButton)<VoiceButtonProps>`
  color: ${props => props.isListening ? '#ff4444' : '#0a66c2'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(10, 102, 194, 0.1);
  }
`;

const TTSButton = styled(IconButton)`
  color: #0a66c2;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(10, 102, 194, 0.1);
  }
`;

interface Message {
  text: string;
  isUser: boolean;
}

interface ConversationalIntentFormProps {
  onAuthenticate: () => void;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

const ConversationalIntentForm: React.FC<ConversationalIntentFormProps> = ({ onAuthenticate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your AI assistant. I'd love to learn more about your professional goals and interests. What brings you to LinkedIn today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + ' ' + transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string) => {
    if (speechSynthesisRef.current && isTTSEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';
      speechSynthesisRef.current.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await mockChatGPTResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      speakText(response);
      
      if (response.toLowerCase().includes('welcome to linkedin')) {
        setTimeout(() => {
          onAuthenticate();
        }, 2000);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = "I apologize, but I'm having trouble processing your request. Could you please try again?";
      setMessages(prev => [...prev, { text: errorMessage, isUser: false }]);
      speakText(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTTS = () => {
    setIsTTSEnabled(!isTTSEnabled);
    if (!isTTSEnabled && speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
    }
  };

  const mockChatGPTResponse = async (userMessage: string): Promise<string> => {
    // This is a mock implementation. Replace with actual ChatGPT API call
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return "I understand you're interested in career opportunities. LinkedIn is a great platform for professional networking and job searching. Would you like to explore job opportunities or connect with professionals in your field?";
    } else if (lowerMessage.includes('network') || lowerMessage.includes('connect')) {
      return "Networking is a key aspect of professional growth. I can help you connect with like-minded professionals and expand your network. What industry or field are you interested in?";
    } else if (lowerMessage.includes('learn') || lowerMessage.includes('skill')) {
      return "LinkedIn Learning offers a wide range of courses to help you develop new skills. What specific skills or topics are you interested in learning?";
    } else if (lowerMessage.includes('yes') || lowerMessage.includes('ready')) {
      return "Great! Welcome to LinkedIn. Let's get started with building your professional profile and connecting you with opportunities.";
    } else {
      return "I'd love to help you make the most of LinkedIn. Could you tell me more about your professional interests and goals?";
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            isUser={message.isUser}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="body1">{message.text}</Typography>
          </MessageBubble>
        ))}
        {isLoading && (
          <MessageBubble
            isUser={false}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CircularProgress size={20} sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
          </MessageBubble>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <InputContainer>
        <StyledTextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message or click the mic to speak..."
          variant="outlined"
          fullWidth
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <Tooltip title={isListening ? "Stop listening" : "Start voice input"}>
          <VoiceButton 
            onClick={toggleListening}
            isListening={isListening}
            disabled={isLoading}
          >
            {isListening ? <MicOffIcon /> : <MicIcon />}
          </VoiceButton>
        </Tooltip>
        <Tooltip title={isTTSEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}>
          <TTSButton onClick={toggleTTS}>
            {isTTSEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </TTSButton>
        </Tooltip>
        <IconButton 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          sx={{ 
            color: '#0a66c2',
            '&:hover': {
              backgroundColor: 'rgba(10, 102, 194, 0.1)'
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ConversationalIntentForm; 