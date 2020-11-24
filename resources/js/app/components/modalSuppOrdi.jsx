import Axios from 'axios';
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default class SuppOrdiModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idOrdi: this.props.idOrdi,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        await Axios.delete(`/api/computers/${this.state.idOrdi}`)
        this.props.suppOrdi(true);
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
                <Button>
                    <DeleteIcon className="redFont" onClick={this.handleOpen} />
                </Button>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Voulez vous vraiment supprimer ce poste ?</h3>
                        <div className="formInput">
                            <Button type="submit" variant="contained" color="secondary">Oui</Button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}