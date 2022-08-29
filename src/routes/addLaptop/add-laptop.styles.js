import styled from 'styled-components';

export const NavlinksContainer = styled.header`
    display: flex;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    max-width: 80rem;
    a {
        text-decoration: none;
        color: #232323;
        font-size: clamp(1.2rem, 1.2vw, 2rem);

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
`;

export const AddLaptopContainer = styled.section`
    width: 95vw;
    max-width: 110rem;
    display: flex;
    flex-direction: column;
    padding-block: clamp(2rem, 5vw, 10rem);
    height: 100%;
    /* height: 100vh; */
    justify-content: space-between;
    align-items: center;
    gap: clamp(1rem, 2vw, 4rem);

    &::before {
        position: fixed;
        top: 5%;
        left: 5%;
        content: '';
    }
`;
