import React from "react";
import styled, { keyframes } from "styled-components";

// Animation for the title
const titleAnimation = keyframes`
  0% { transform: translateY(-20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

// Animation for the cancel icon
const iconAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
`;

// Define styled components
const CancelContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9; /* Light gray background color */
  color: #333; /* Dark gray text color */
  animation: fadeIn 1s ease-in-out; /* Fade-in animation for the entire component */
`;

const PaymentIcon = styled.div`
  margin-bottom: 30px;
  & svg.cancel {
    fill: #e74c3c; /* Red color for the cancel icon */
    width: 80px;
    height: 80px;
    animation: ${iconAnimation} 0.8s ease-in-out; /* Icon animation */
  }
`;

const StyledTitle = styled.h1`
  background-color: #3498db; /* Blue color for the title background */
  border-radius: 8px;
  color: white;
  padding: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Box shadow for a subtle lift effect */
  animation: ${titleAnimation} 0.8s ease-in-out; /* Title animation */
`;

const StyledParagraph = styled.p`
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
  max-width: 800px;
`;

const FancyDecor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ecf0f1; /* Light gray background color for the decorative element */
  opacity: 0.3;
  z-index: -1; /* Place it behind the content */
`;

const Cancel = () => {
  return (
    <CancelContainer>
      <FancyDecor />
      <PaymentIcon>
        <svg
          className="cancel"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 4.41L15.41 9 20 13.59 18.59 15 14 10.41 9.41 15 8 13.59 12.59 9 8 4.41 9.41 3 14 7.59 18.59 3 20 4.41z" />
        </svg>
      </PaymentIcon>
      <StyledTitle>Payment Cancelled</StyledTitle>
      <StyledParagraph>
        Unfortunately, your payment has been cancelled. If you have any
        questions or need further assistance, please contact our support team.
      </StyledParagraph>
    </CancelContainer>
  );
};

export default Cancel;
