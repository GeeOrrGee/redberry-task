import styled from 'styled-components';

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
    button {
        width: 50%;
        cursor: pointer;
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

    height: 60vh;

    background-image: ${({ backgroundUrl }) =>
        backgroundUrl && `url(${backgroundUrl})`};
    background-size: cover;

    max-height: 40rem;
    background-color: var(--greysh-background);
    border: 3px dashed var(--light-blue);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: clamp(3rem, 4vw, 8rem);

    position: relative;
    border-radius: 6px;
`;

export const ThinLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: grey;
    opacity: 0.6;
`;
