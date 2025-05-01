import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, CircularProgress, Tooltip, Button } from '@mui/material';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { profileAnalyzer, ProfileInsights } from '../services/profileAnalyzer';

const PhoneFrame = styled(Box)`
  width: 420px;
  height: 850px;
  background: #f0f0f0;
  border-radius: 40px;
  padding: 20px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 30px;
    background: #1a1a1a;
    border-radius: 20px;
    margin-top: 10px;
  }
`;

const MobileScreen = styled(Box)`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

const ChatContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: rgba(26, 26, 26, 0.8);
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
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const MessageBubble = styled(motion.div)<{ isUser: boolean }>`
  max-width: 80%;
  padding: 0.8rem 1.2rem;
  border-radius: 16px;
  background: ${props => props.isUser ? '#0a66c2' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isUser ? 'white' : 'rgba(255, 255, 255, 0.9)'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  font-size: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    ${props => props.isUser ? `
      border-width: 0 0 10px 10px;
      border-color: transparent transparent #0a66c2 transparent;
      right: -8px;
      top: 0;
    ` : `
      border-width: 10px 10px 0 0;
      border-color: rgba(255, 255, 255, 0.1) transparent transparent transparent;
      left: -8px;
      top: 0;
    `}
  }
`;

const InputContainer = styled(Box)`
  display: flex;
  gap: 0.5rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
  
  & .MuiOutlinedInput-root {
    color: white;
    border-radius: 12px;
    
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

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

const ContinueButton = styled(Button)`
  background: #0a66c2 !important;
  color: white !important;
  padding: 0.3rem 0.8rem;
  font-weight: 500;
  min-width: auto;
  font-size: 0.85rem;
  text-transform: none;
  letter-spacing: 0.3px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(10, 102, 194, 0.2);
  
  &:hover {
    background: #004182 !important;
    box-shadow: 0 4px 6px rgba(10, 102, 194, 0.3);
  }
`;

const SummaryButton = styled(Button)`
  background: #666666 !important;
  color: white !important;
  padding: 0.3rem 0.8rem;
  font-weight: 500;
  min-width: auto;
  font-size: 0.85rem;
  text-transform: none;
  letter-spacing: 0.3px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #4d4d4d !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const TTSButton = styled(IconButton)`
  color: #0a66c2;
  transition: all 0.3s ease;
  padding: 0.4rem;
  
  &:hover {
    background-color: rgba(10, 102, 194, 0.1);
  }
  
  & .MuiSvgIcon-root {
    font-size: 1.2rem;
  }
`;

const SendButton = styled(IconButton)`
  color: #0a66c2;
  transition: all 0.3s ease;
  padding: 0.4rem;
  
  &:hover {
    background-color: rgba(10, 102, 194, 0.1);
  }
  
  & .MuiSvgIcon-root {
    font-size: 1.2rem;
  }
`;

const InsightsContainer = styled(Box)`
  background: rgba(26, 26, 26, 0.8);
  border-radius: 16px;
  padding: 1rem;
  margin-top: 1rem;
`;

const InsightSection = styled(Box)`
  margin-bottom: 1rem;
`;

const InsightTitle = styled(Typography)`
  color: #0a66c2;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SummaryItem = styled(Box)`
  display: flex;
  margin-bottom: 0.5rem;
`;

const SummaryLabel = styled(Typography)`
  color: #0a66c2;
  font-weight: bold;
  min-width: 150px;
`;

const SummaryValue = styled(Typography)`
  color: rgba(255, 255, 255, 0.9);
  flex: 1;
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

const ConversationalIntentFormNew: React.FC<ConversationalIntentFormProps> = ({ onAuthenticate }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there—welcome to LinkedIn! Let's start with the basics: What's your name?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(true);
  const [insights, setInsights] = useState<ProfileInsights | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput(prev => prev + ' ' + transcript);
      };

      recognition.onend = () => {
        // Only restart if we're not currently playing a response
        if (recognitionRef.current && !currentUtteranceRef.current) {
          recognitionRef.current.start();
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        // Only stop if it's a fatal error
        if (event.error === 'no-speech' || event.error === 'audio-capture') {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
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
      // Stop any ongoing recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';

      utterance.onend = () => {
        currentUtteranceRef.current = null;
        // Restart recognition after the response is complete
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
      };

      currentUtteranceRef.current = utterance;
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
      
      // Only analyze the profile if the conversation is complete
      if (response.toLowerCase().includes('welcome to linkedin')) {
        const newInsights = profileAnalyzer.analyzeConversation([...messages, { text: userMessage, isUser: true }]);
        setInsights(newInsights);
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

  const handleContinue = () => {
    navigate('/job-search');
  };

  const handleGenerateSummary = () => {
    const newInsights = profileAnalyzer.analyzeConversation(messages);
    setInsights(newInsights);
    setShowInsights(true);
  };

  const mockChatGPTResponse = async (userMessage: string): Promise<string> => {
    // This is a mock implementation. Replace with actual ChatGPT API call
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('tom')) {
      return "Nice to meet you, Tom! Where do you currently work—or, if you're still in school, which school are you attending?";
    } else if (lowerMessage.includes('ucla')) {
      return "Got it—thanks! What brings you to LinkedIn today? (For example: job-seeking, networking, learning, etc.)";
    } else if (lowerMessage.includes('find a job') || lowerMessage.includes('looking for a job')) {
      return "Congratulations on your upcoming graduation! What's your major or primary field of study?";
    } else if (lowerMessage.includes('computer science') || lowerMessage.includes('cs')) {
      return "Great! Are there particular kinds of roles or industries you're most interested in pursuing after graduation?";
    } else if (lowerMessage.includes('domain') || lowerMessage.includes('doing good') || lowerMessage.includes('make a difference')) {
      return "Awesome goal! To help narrow things down, is there a particular cause or sector you'd love to contribute to—like climate tech, healthcare, education, or something else?";
    } else if (lowerMessage.includes('climate') || lowerMessage.includes('climate change') || lowerMessage.includes('environment')) {
      return "Great choice—climate tech is growing fast! Do you have any preferred locations where you'd like to work, or are you open to anywhere?";
    } else if (lowerMessage.includes('new york') || lowerMessage.includes('san francisco') || lowerMessage.includes('sf') || lowerMessage.includes('ny')) {
      return "Noted—New York or San Francisco. Which programming languages or technical skills would you like to highlight to potential employers?";
    } else if (lowerMessage.includes('java') || lowerMessage.includes('pytorch') || lowerMessage.includes('machine learning')) {
      return "Got it—you've got Java and PyTorch experience. One last detail: are you looking for a full-time position, an internship, or something else?";
    } else if (lowerMessage.includes('full time') || lowerMessage.includes('full-time')) {
      return "Great, would you like me to construct a job search query for you to run on LinkedIn?";
    } else if (lowerMessage.includes('yes') || lowerMessage.includes('please') || lowerMessage.includes('sure')) {
      return "Here's a job search prompt you can drop into LinkedIn: Recent UCLA computer-science graduate seeking a full-time software-engineering role in climate tech in New York or San Francisco";
    } else {
      return "I'd love to help you make the most of LinkedIn. Could you tell me more about your professional interests and goals?";
    }
  };

  return (
    <PhoneFrame>
      <MobileScreen>
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
                <Typography variant="body2">{message.text}</Typography>
              </MessageBubble>
            ))}
            {isLoading && (
              <MessageBubble
                isUser={false}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={16} />
                  <Typography variant="body2">Thinking...</Typography>
                </Box>
              </MessageBubble>
            )}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputContainer>
            <StyledTextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening... Speak now" : "Voice input not available"}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              size="small"
            />
            <Tooltip title={isTTSEnabled ? "Disable Text-to-Speech" : "Enable Text-to-Speech"}>
              <TTSButton onClick={toggleTTS}>
                {isTTSEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
              </TTSButton>
            </Tooltip>
            <Tooltip title="Send Message">
              <SendButton
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                color="primary"
                size="small"
              >
                <SendIcon />
              </SendButton>
            </Tooltip>
          </InputContainer>
          <ButtonContainer>
            <SummaryButton
              variant="contained"
              onClick={handleGenerateSummary}
            >
              Summary
            </SummaryButton>
            <ContinueButton
              variant="contained"
              onClick={handleContinue}
            >
              Continue
            </ContinueButton>
          </ButtonContainer>
          {showInsights && insights && (
            <InsightsContainer>
              <InsightSection>
                <InsightTitle><b>Profile Summary</b></InsightTitle>
                <SummaryItem>
                  <SummaryLabel>Name:</SummaryLabel>
                  <SummaryValue>Tom</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Current Status:</SummaryLabel>
                  <SummaryValue>Student at UCLA</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Job Goals:</SummaryLabel>
                  <SummaryValue>Seeking entry level jobs in climate tech</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Preferred Locations:</SummaryLabel>
                  <SummaryValue>San Francisco, New York</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Key Skills:</SummaryLabel>
                  <SummaryValue>Python, Java</SummaryValue>
                </SummaryItem>
              </InsightSection>
            </InsightsContainer>
          )}
        </ChatContainer>
      </MobileScreen>
    </PhoneFrame>
  );
};

export default ConversationalIntentFormNew; 