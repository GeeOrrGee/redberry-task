import styled from 'styled-components';

export const Option = styled.span`
    width: 100%;
    font-size: inherit;
    padding: 1rem 2rem;
    background-color: ${({ active }) => (active ? '#2b4bf20f' : '#FFF')};
    transition: all 0.1s;
    &:hover {
        background-color: rgb(0, 0, 0, 0.05);
        opacity: 0.8;
    }
`;

export const OptionsContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    justify-content: start;

    border-radius: 5px;

    box-shadow: 0 0.4rem 10rem 0.4rem rgb(0, 0, 0, 0.1);
    z-index: 1;
    top: 102%;
    left: 0%;
    width: 100%;

    height: auto;
    max-height: 25rem;
    overflow: hidden;
    overflow-y: scroll;
`;

export const DropdownField = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    padding: 1.7rem 2rem;
    /* max-height: 6rem; */
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
