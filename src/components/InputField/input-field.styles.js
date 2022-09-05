import styled from 'styled-components';

export const InputField = styled.input`
    width: 100%;
    width: ${({ wide }) => (wide === 'mid' ? 'width:80%' : 'width:100%')};
    padding: 1.5rem 1.4rem;
    font-size: clamp(1rem, 1.2vw, 1.4rem);
    border-radius: 5px;
    border: 2px solid var(--light-blue-outline);
    transition: all 0.1s ease-in;
    outline: none;

    &:focus {
        background-color: #2b4bf20f;
        border: 2px solid #6499ff;
    }
    ${({ errorState }) =>
        errorState &&
        `
        
       border: 2px solid var(--error-red);
      
    `}
`;
export const InputLabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: clamp(0.2rem, 0.5vw, 1.6rem);
    /* align-items: center; */
    justify-content: center;
    width: 100%;
    position: relative;
    /* margin-bottom: 1rem; */
    &::after {
        position: absolute;
        font-size: clamp(0.8rem, 1vw, 1.6rem);
        top: 107%;
        left: 0%;
        opacity: 0.6;
        color: var(--grey-font-color);
        content: '${({ content = '' }) => content}';
    }

    svg {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        top: 61%;
        right: 4%;
        @media (max-width: 75em) {
            top: 52%;
        }
    }
    ${({ content = '' }) =>
        content &&
        `
      &::after{
        content: '${content}';
      }
    `}

    ${({ errorState }) =>
        errorState &&
        `
       &::after {
       color: var(--error-red);
      }
    `}
`;
