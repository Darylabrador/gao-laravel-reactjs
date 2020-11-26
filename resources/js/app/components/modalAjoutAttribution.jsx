import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AjoutClientModal from './modalAddClient';
import { getToken } from '../services/tokenConfig';

export default class AjoutAttributionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desktop_id: this.props.desktop_id,
            client_id: null,
            hours: this.props.hours,
            date: this.props.date,
            attributeInfo: {},
            defaultProps: {
                options: [],
                getOptionLabel: (option) => `${option.name} ${option.surname}`,
            },
            open: false,
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }


    /**
     * create object array for autocomplete
     * @param {*} event 
     * @param {*} value 
     */
    async handleChange(event, value) {
        let client       = event.target.value;
        let clientLength = client.length;

        if(clientLength > 2) {
            const clientData   = await Axios.post('/api/client/search', { clientInfo: client}, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const responseData = clientData.data.data;
            await this.setState({ defaultProps: {...this.state.defaultProps, options: responseData}});
        }   
    }


    /**
     * Set an assign information
     * @param {*} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        const attributionData = await Axios.post('/api/computers/attributions', {
            desktop_id: this.state.desktop_id,
            client_id: this.state.attributeInfo.id,
            hours: this.state.hours,
            date: this.state.date
        },{
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        const responseData = attributionData.data.data;
        await this.props.getAddAttributions(responseData);
        await this.setState({ open: false });
    }


    /**
     * handle open modal
     */
    async handleOpen() {
        await this.setState({ open: true })
    };


    /**
     * handle close modal
     * @param {*} close 
     */
    async handleClose(close) {
        await this.setState({ open: false })
    };


    /**
     * Handle selected object value
     * @param {*} event 
     * @param {*} value 
     */
    async handleSelect(event, value) {
        await this.setState({ attributeInfo: value });
    }


    /**
     * render the assign modal
     */
    render() {
        return (
            <div>
                <AddCircleOutlineIcon size="small" className="greenFont btnStyle" onClick={this.handleOpen} />

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Attribuer</h3>
                        <div className="formInput">
                            <div className="formAutocomplete">
                                <Autocomplete
                                    className="autoCompleteStyle"
                                    {...this.state.defaultProps}
                                    id="auto-complete"
                                    autoComplete
                                    includeInputInList
                                    onKeyUp={this.handleChange}
                                    onChange={this.handleSelect}
                                    renderInput={(params) => <TextField {...params} label="Le client" margin="normal" />}
                                />

                                <div className="btnStyleAttribution">
                                    <AjoutClientModal desktop_id={this.state.desktop_id} hours={this.state.hours} date={this.state.date} closeModal={this.handleClose} />
                                </div>
                            </div>
                            <div>
                                <Button variant="contained" color="default" onClick={this.handleClose} className="btnSpace">Annuler</Button>
                                <Button type="submit" variant="contained" color="primary" className="btnSpace">Attribuer</Button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}