import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import { getToken } from '../services/tokenConfig';

export default class AjoutClientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            desktop_id: this.props.desktop_id,
            hours: this.props.hours,
            date: this.props.date,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    async handleChangeName(event) {
        await this.setState({ name: event.target.value });
    }

    async handleChangeSurname(event) {
        await this.setState({ surname: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await console.log(this.state.name)
        await this.setState({ name: "" });
        await this.setState({ surname: "" });
        await this.setState({ open: false });
 
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
                <Button type="button" variant="contained" size="small" className="btnStyle" onClick={this.handleOpen} >
                    <AddCircleOutlineIcon size="small" className="greenFont" />
                </Button>

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modalStyle"
                >
                    <form onSubmit={this.handleSubmit} className="formStyle">
                        <h3>Ajouter un client</h3>
                        <div className="formInput">
                            <input type="text" placeholder="Nom du client" value={this.state.name} onChange={this.handleChangeName} />
                            <input type="text" placeholder="Prénom du client" value={this.state.surname} onChange={this.handleChangeSurname} />
                            <Button type="submit" variant="contained" color="primary">Ajouter</Button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}