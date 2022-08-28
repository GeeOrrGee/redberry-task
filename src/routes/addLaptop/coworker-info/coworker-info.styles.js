import styled from 'styled-components';

export const Label = styled.label`
    font-size: clamp(1.4rem, 1.2vw, 2rem);
`;

export const InputField = styled.input`
    width: 85%;
    padding: 1.5rem 1.5rem;
    border-radius: 5px;
    border: 1px solid var(--light-blue-outline);
`;
export const InputLabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: clamp(0.5rem, 0.8vw, 2rem);
    /* align-items: center; */
    justify-content: center;
    width: 100%;
`;
export const MultipleInputContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;

export const FormContainer = styled.form`
    width: 100%;
    height: 100%;
    /* padding: 5rem 10rem; */
    background-color: #fff;
    padding-block: clamp(2rem, 3.5vw, 7rem);
    padding-inline: clamp(2rem, 5vw, 14rem);
    border-radius: 15px;
    background-color: white;
    /* max-height: 90rem; */
`;
