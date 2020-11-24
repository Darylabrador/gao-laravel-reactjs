import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

export default class SuppAttributionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idAssign: this.props.idAssign,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleChange(event) {
        await this.setState({ name: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await Axios.delete(`/api/computers/attributions/${this.state.idAssign}`)
        this.props.suppAttribution(this.state.idAssign);
        await this.setState({ open: false })
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
                <DeleteIcon size="small" className="redFont btnStyle" onClick={this.handleOpen} />

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Voulez vous vraiment annuler cette attribution ?</h3>
                        <div className="formInput">
                            <Button type="submit" variant="contained" color="secondary">Oui</Button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}