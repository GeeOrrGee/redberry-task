import styled from 'styled-components';

export const SelectedImgFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 2rem;
    button {
        width: 30%;
    }
    div {
        display: flex;
        gap: 1rem;
        p {
            width: 100%;
            max-width: 22rem;
            overflow-x: scroll;
            font-size: clamp(1rem, 1vw, 1.6rem);
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
    gap: clamp(5rem, 4vw, 8rem);
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
    /* display: none; */
    opacity: 0;
    /* position: absolute; */
`;

export const ImageDropInputContainer = styled.label`
    width: 100%;
    /* max-width: 65rem; */

    height: 40vh;

    /* background-image: ${({ backgroundUrl }) =>
        backgroundUrl && `url(${backgroundUrl})`};
    background-size: cover;
    background-repeat: no-repeat; */
    width: 100%;
    img {
        position: absolute;
        width: 102%;
        height: 108%;
        border-radius: 8px;
        top: -1%;
    }

    /* overflow: hidden; */

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
