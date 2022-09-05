import styled from 'styled-components';

export const SelectedImgFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 2rem;
    button {
        width: 35%;
        font-size: clamp(1rem, 1vw, 1.6rem);
    }
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        span {
            width: 100%;
            max-width: 30rem;
            word-wrap: break-word;
            padding: 0 !important;
            overflow: hidden;
            font-size: clamp(1rem, 1vw, 1.6rem);
            @media (max-width: 50em) {
                max-width: 15rem;
            }
        }
        align-items: center;
        justify-content: space-between;
    }
`;

export const DropzoneTextContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(3rem, 3vw, 6rem);
    svg {
        width: 4rem;
        height: 4rem;
        margin-top: 1rem;
    }
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    button {
        width: 50%;
        cursor: pointer;
        pointer-events: auto;
    }
    p {
        color: var(--light-blue);
        font-size: clamp(1.4rem, 1.4vw, 2.2rem);
        width: 60vw;
        max-width: 25rem;
        text-align: center;
        line-height: 1.5;
        pointer-events: none;
    }
`;

export const ImageInput = styled.input`
    width: 100%;
    height: 100%;
    opacity: 0;
`;

export const ImageDropInputContainer = styled.label`
    width: 100%;
    height: 40vh;
    width: 100%;
    img {
        position: absolute;
        width: 102%;
        height: 108%;
        border-radius: 8px;
        top: -1%;
    }

    max-height: 40rem;
    background-color: var(--greysh-background);
    border: 3px dashed var(--light-blue);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: clamp(3rem, 4vw, 8rem);
    ${({ errorState }) =>
        errorState &&
        `
         &::before {
        opacity: 0.1;
        content: '';
        background-color: var(--error-red);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0%;
        width: 100%;
    }
     border: 3px dashed var(--error-red);
     

   `}
    position: relative;
    border-radius: 8px;
`;

export const ThinLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: grey;
    opacity: 0.6;
    margin-block: 2rem;
`;
