import { DropdownField, Option, OptionsContainer } from './dropdown.styles';
import { ReactComponent as Vector } from '../../assets/addLaptop/Vector.svg';
import { Component, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../../shared/loader/loader.styles';

// export class Dropdown extends Component {
//     constructor(props) {
//         super(props);
//         const { name } = this.props;
//         this.state = {
//             activeDropdown: '',
//             fetchedData: [],
//             currData: [],
//         };
//         this.dropdownRef = createRef();
//     }

//     componentDidMount() {
//         window.addEventListener('click', (e) => {
//             if (!e.path.includes(this.dropdownRef.current))
//                 this.setState({ ...this.state, activeDropdown: '' });
//         });
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.activeDropdown && !this.state.fetchedData.length) {
//             const { dataUrl, activeTeamId } = this.props;
//             if (activeTeamId) {
//                 axios(dataUrl).then(({ data: { data } }) => {
//                     if (data[0]?.team_id) {
//                         const filteredPositions = data.filter(
//                             (obj) => obj.team_id === activeTeamId
//                         );
//                         // console.log(filteredPositions);
//                         this.setState((state) => ({
//                             ...this.state,
//                             fetchedData: data,
//                             currData: filteredPositions,
//                         }));
//                     }
//                 });
//                 return;
//             }
//             axios(dataUrl).then(({ data: { data } }) => {
//                 this.setState({
//                     ...this.state,
//                     fetchedData: data,
//                     currData: data,
//                 });
//             });
//         }
//         console.log(
//             prevProps.activeTeamId,
//             this.props.activeTeamId,
//             this.state.fetchedData
//         );
//         if (prevProps.activeTeamId !== this.props.activeTeamId) {
//             const { activeTeamId, dataUrl } = this.props;
//             if (prevState.fetchedData[0]?.team_id) {
//                 const filteredPositions = this.state.fetchedData.filter(
//                     (obj) => obj.team_id === activeTeamId
//                 );
//                 console.log(filteredPositions);
//                 this.setState((state) => ({
//                     ...this.state,
//                     currData: filteredPositions,
//                 }));
//                 return;
//             }
//             if (this.state.fetchedData) {
//                 axios(dataUrl).then(({ data: { data } }) => {
//                     const filteredPositions = data.filter(
//                         (obj) => obj.team_id === activeTeamId
//                     );
//                     // console.log(filteredPositions);

//                     const [autoTeamSelect] = data.filter(
//                         (obj) => obj.id === activeTeamId
//                     );

//                     this.setState((state) => ({
//                         ...this.state,
//                         fetchedData: data,
//                         currData: filteredPositions,
//                         activeTitle: autoTeamSelect.name,
//                     }));
//                 });
//             }
//             return;
//             // console.log(this.state.fetchedData);
//             // const [autoTeamSelect] = this.state.fetchedData.filter(
//             //     (obj) => obj.id === activeTeamId
//             // );
//             // this.setState({ ...this.state, activeTitle: autoTeamSelect.name });
//         }
//     }
//     dropdownToggleHandler = () =>
//         this.state.activeDropdown === this.props.name
//             ? this.setState({ ...this.state, activeDropdown: '' })
//             : this.setState({ ...this.state, activeDropdown: this.props.name });

//     onSelectHandler = (dataObj) => {
//         const { callbackHandler } = this.props;
//         // console.log(dataObj);
//         this.setState({ ...this.state, activeTitle: dataObj.name });
//         callbackHandler(dataObj);
//     };
//     render() {
//         const { name, ...otherProps } = this.props;

//         return (
//             <DropdownField
//                 ref={this.dropdownRef}
//                 {...otherProps}
//                 onClick={this.dropdownToggleHandler}
//             >
//                 <p>{this.state.activeTitle ? this.state.activeTitle : name}</p>
//                 <Vector />
//                 {this.state.activeDropdown === name && (
//                     <OptionsContainer>
//                         {!this.state.currData.length ? (
//                             <Loader />
//                         ) : (
//                             this.state.currData.map((dataObj) => (
//                                 <Option
//                                     onClick={this.onSelectHandler.bind(
//                                         null,
//                                         dataObj
//                                     )}
//                                 >
//                                     {dataObj.name}
//                                 </Option>
//                             ))
//                         )}
//                     </OptionsContainer>
//                 )}
//             </DropdownField>
//         );
//     }
// }
// export default Dropdown;
export const Dropdown = ({
    name,
    data = [],
    callbackHandler,
    onSelectHandler,
    ...otherProps
}) => {
    const [activeDropdown, setActiveDropdown] = useState('');
    const dropdownRef = useRef();
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (!e.path.includes(dropdownRef.current)) setActiveDropdown('');
        });
        return window.addEventListener('click', (e) => {
            if (!e.path.includes(dropdownRef.current)) setActiveDropdown('');
        });
    }, []);

    const dropdownToggleHandler = () => {
        callbackHandler();
        return activeDropdown === name
            ? setActiveDropdown('')
            : setActiveDropdown(name);
    };

    const onClickHandler = (e, dataObj) => {
        onSelectHandler(dataObj);
    };
    return (
        <DropdownField
            ref={dropdownRef}
            {...otherProps}
            onClick={dropdownToggleHandler}
        >
            <p>{name}</p>
            <Vector />
            {activeDropdown === name && (
                <OptionsContainer>
                    {!data.length ? (
                        <Loader />
                    ) : (
                        data.map((dataObj) => (
                            <Option
                                key={dataObj.name}
                                onClick={(e) => onClickHandler(e, dataObj)}
                            >
                                {dataObj.name}
                            </Option>
                        ))
                    )}
                </OptionsContainer>
            )}
        </DropdownField>
    );
};
