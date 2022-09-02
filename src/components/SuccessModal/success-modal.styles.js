import styled from 'styled-components';

export const SuccessMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        width: 100%;
        object-fit: contain;
    }

    h2 {
        text-align: center;
        font-size: clamp(1.4rem, 1.4vw, 2.2rem);
    }
`;

export const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 30rem;
    gap: clamp(1.5rem, 1.5vw, 3rem);
    align-items: center;
    justify-content: center;
    a {
        transition: all 0.1s ease-in;
        color: var(--light-blue);
        &:hover {
            opacity: 0.8;
        }
        &:visited {
            color: var(--light-blue);
        }
        width: 100%;
        text-decoration: none;
        display: inline-block;
        text-align: center;
        font-size: clamp(1.2rem, 1.2vw, 2rem);

        button {
            width: 100%;
            transition: all 0.1s ease-in;
            max-width: 30rem;
        }
    }
`;

export const Backdrop = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.5);
`;

export const SuccessModalContainer = styled.figure`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: clamp(2rem, 2vw, 4rem);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    max-height: 55rem;
    max-width: 90rem;
    border-radius: 15px;
    background-color: white;
    padding-block: 2rem;
`;
