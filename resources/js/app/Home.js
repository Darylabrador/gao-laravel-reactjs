import Axios from 'axios';
import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Ordinateur from './components/Ordinateur';
import Grid from '@material-ui/core/Grid';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ordinateurs: [],
            currentDate: new Date().toISOString().substr(0, 10),
            currentPage: 1,
            paginationLink: {},
        }
    }

    componentDidMount() {
        this.getAttribution();
    }

    async getAttribution() {
        try {
            const allInformation = await Axios.get('/api/computers', {
                params: {
                    date: this.state.currentDate,
                    page: this.state.currentPage
                }
            });
            const responseData = allInformation.data;
            this.setState({ ordinateurs: responseData.data });
            this.setState({ paginationLink: responseData.links });
        } catch (error) {
            console.error(error)
        } 
    }

    render() {
        return (
            <React.Fragment>
                
                <Navigation />
                
                <Grid container spacing={3} justify="space-around" id="cardContainer">
                    {this.state.ordinateurs.map((ordi, index) => (
                        <Grid item xs={12} sm={3} >
                            <Ordinateur key={index} ordinateur={ordi} />
                        </Grid>
                    ))}
                </Grid>
             
            </React.Fragment>
        )
    }
}