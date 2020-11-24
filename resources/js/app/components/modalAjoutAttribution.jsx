import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

export default class AjoutAttributionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleChange(event) {
        await this.setState({ name: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let dataSend = {
            name: this.state.name
        };
        await Axios.post('/api/computers', dataSend)
        this.props.ajoutOrdi(true);
        await this.setState({ name: "" });
    }

    async handleOpen() {
        await this.setState({ open: true })
    };

    async handleClose() {
        await this.setState({ open: false })
    };

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
                            <input type="text" placeholder="Nom du poste" value={this.state.name} onChange={this.handleChange} />
                            <Button type="submit" variant="contained" color="primary">Ajouter</Button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}