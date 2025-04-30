import React from 'react';
import { Box, Modal } from '@mui/material';
import styled from 'styled-components';
import IntentForm from './IntentForm';

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
`;

const CloseButton = styled(Box)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const Close = styled(Box)`
  width: 24px;
  height: 24px;
  background: #0a66c2;
  border-radius: 50%;
`;

interface IntentModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
}

const IntentModal: React.FC<IntentModalProps> = ({ open, onClose, onAuthenticate }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="intent-modal"
      aria-describedby="intent-form-modal"
    >
      <ModalContent>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        <IntentForm onAuthenticate={onAuthenticate} />
      </ModalContent>
    </Modal>
  );
};

export default IntentModal; 