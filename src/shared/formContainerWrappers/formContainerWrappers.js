import styled from 'styled-components';
export const Label = styled.label`
    font-size: clamp(1.1rem, 1.1vw, 2rem);
    ${({ errorState }) =>
        errorState
            ? `
       color: var(--error-red);
      
    `
            : ''}
`;
export const RouteButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 3rem;
    a {
        display: inline-block;
        width: 100%;
        color: var(--light-blue);
        text-decoration: none;
        font-size: clamp(1.4rem, 1vw, 2rem);
        margin-left: 2rem;
        &:visited {
            color: var(--light-blue);
        }
    }
    div {
        max-width: 22rem;
        width: 100%;
        margin-left: auto;
        /* display: flex;
        justify-content: center;
        align-items: center; */
        button {
            width: 100%;
            font-size: clamp(1.2rem, 1vw, 2rem);
        }
    }
`;

export const MultipleInputContainer = styled.div`
    display: flex;
    gap: clamp(4rem, 4vw, 10rem);
    width: 100%;
    justify-content: space-around;
    align-items: end;
    @media (max-width: 50em) {
        flex-direction: column;
    }
`;

export const FormContainer = styled.form`
    width: 100vw;
    max-width: 100rem;
    background-color: #fff;
    padding-block: clamp(2rem, 3.5vw, 7rem);
    padding-inline: clamp(2rem, 5vw, 14rem);
    border-radius: 15px;
    gap: clamp(3rem, 3vw, 6rem);
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* max-height: 90rem; */
    @media (max-width: 50em) {
        min-height: 85vh;
    }
`;
