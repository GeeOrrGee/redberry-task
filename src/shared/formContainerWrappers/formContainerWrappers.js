import styled from 'styled-components';

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
    gap: clamp(3rem, 3vw, 8rem);
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* max-height: 90rem; */
    @media (max-width: 50em) {
        min-height: 85vh;
    }
`;
