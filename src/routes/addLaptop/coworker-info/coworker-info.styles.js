import styled from 'styled-components';

const saturatedBlue = '#6499FF';

export const RouteButtonsContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    margin-top: 3rem;
    div {
        max-width: 22rem;
        margin-left: auto;
        button {
            font-size: clamp(1.2rem, 1vw, 2rem);
        }
    }
`;

export const Label = styled.label`
    font-size: clamp(1.1rem, 0.9vw, 2rem);
`;

export const InputField = styled.input`
    width: 100%;
    padding: 1.2rem 1.4rem;
    border-radius: 5px;
    border: 2px solid var(--light-blue-outline);
    transition: all 0.1s ease-in;
    outline: none;
    &:focus {
        background-color: #2b4bf20f;
        border: 2px solid #6499ff;
    }
`;
export const InputLabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: clamp(0.2rem, 0.5vw, 1.6rem);
    /* align-items: center; */
    justify-content: center;
    width: 100%;
    position: relative;
    margin-bottom: 1rem;
    &::after {
        position: absolute;
        font-size: clamp(0.8rem, 1vw, 1.6rem);
        top: 107%;
        left: 0%;
        opacity: 0.6;
        color: var(--grey-font-color);
        content: '${({ content = '' }) => content}';
    }
    ${({ content = '' }) =>
        content &&
        `
      &::after{
        content: '${content}';
      }
    `}
`;
export const MultipleInputContainer = styled.div`
    display: flex;
    gap: clamp(4rem, 4vw, 10rem);
    width: 100%;
    justify-content: space-around;
    @media (max-width: 50em) {
        flex-direction: column;
    }
`;

export const FormContainer = styled.form`
    width: 100%;
    background-color: #fff;
    padding-block: clamp(2rem, 3.5vw, 7rem);
    padding-inline: clamp(2rem, 5vw, 14rem);
    border-radius: 15px;
    /* gap: clamp(3rem, 3vw, 8rem); */
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* max-height: 90rem; */
    @media (max-width: 50em) {
        min-height: 85vh;
    }
`;
