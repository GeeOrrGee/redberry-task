import styled from 'styled-components';

export const Option = styled.span`
    width: 100%;
    font-size: inherit;
    padding: 1rem 2rem;
    &:hover {
        background-color: #2b4bf20f;
    }
`;

export const OptionsContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;

    border-radius: 5px;

    box-shadow: 0 0.4rem 10rem 0.4rem rgb(0, 0, 0, 0.1);
    z-index: 1;
    top: 102%;
    left: 0%;
    width: 100%;

    /* height: 40vh; */
    max-height: 50rem;
    overflow: hidden;
    overflow-y: scroll;
`;

export const DropdownField = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    padding: 1rem 2rem;
    font-size: clamp(1.2rem, 1.2vw, 1.8rem);
    background-color: var(--grey-background);
    width: 100%;
    cursor: pointer;
    svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    ${({ errorState }) =>
        errorState &&
        `
       
       border:2px solid var(--error-red);
      
    `}
`;
