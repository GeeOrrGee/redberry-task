import styled from 'styled-components';

export const VectorContainer = styled.div`
    position: absolute;
    top: 5%;
    left: 5%;
    width: 5rem;
    height: 5rem;
    background-color: #d9d9d9;
    border-radius: 50rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
        padding-top: 0.3rem;
        height: 40%;
        width: 40%;
        transform: rotate(90deg);
    }
    &:hover {
        transform: scale(115%);
    }
    transition: all 0.2s;
    @media (max-width: 50em) {
        background-color: unset;
        top: 4%;
        left: 3%;
        width: 4rem;
        height: 4rem;
    }
`;

export const NavlinksContainer = styled.header`
    display: flex;
    width: 60%;
    justify-content: space-around;
    align-items: center;
    max-width: 80rem;
    pointer-events: none;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    a {
        text-decoration: none;
        color: #232323;
        font-size: clamp(1.2rem, 1.2vw, 2rem);
        font-weight: 700;
        cursor: pointer;
        display: inline-block;
        border-bottom: 3px solid transparent;
        border-radius: 2px;
        height: 150%;
        position: relative;

        &.active-inner-navlink::before {
            width: 72%;
            top: 150%;
            left: 14%;
            content: '';
            background-color: #232323;
            position: absolute;
            height: 3px;
            display: block;
            animation: 0.2s forwards ease-in fill;

            @keyframes fill {
                0% {
                    width: 0%;
                    left: 50%;
                }

                100% {
                    width: 72%;
                    left: 14%;
                }
            }
        }
    }
    & ~ p {
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
        opacity: 0.4;
        letter-spacing: 0.2rem;
        font-weight: 700;
    }
    @media (max-width: 50em) {
        padding-top: 3rem;
        a {
            display: none;
            &.active-inner-navlink {
                display: inline-block;
                &::before {
                    display: none;
                }
            }
        }
    }
`;

export const AddLaptopContainer = styled.section`
    width: 95vw;
    max-width: 110rem;
    display: flex;
    flex-direction: column;
    padding-block: clamp(2rem, 5vw, 10rem);
    height: 100%;
    justify-content: space-between;
    align-items: center;
    gap: clamp(0.8rem, 1.5vw, 4rem);
    @media (max-width: 50em) {
        padding: 0;
    }
`;
