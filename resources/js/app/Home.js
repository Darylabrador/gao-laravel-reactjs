import Axios from 'axios';
import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Ordinateur from './components/Ordinateur';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordinateurs: [],
            currentDate: new Date().toISOString().substr(0, 10),
            currentPage: 1,
            paginationLink: {},
            totalPage: null
        }

        /**
         * Put the 'this' in the function context
         */
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.getAttribution();
    }

    async getAttribution() {
        try {
            this.setState({ ordinateurs: [] });
            const allInformation = await Axios.get('/api/computers', {
                params: {
                    date: this.state.currentDate,
                    page: this.state.currentPage
                }
            });
            const responseData = allInformation.data;
            let now = Math.ceil(responseData.meta.total / 3);
            this.setState({ ordinateurs: responseData.data });
            this.setState({ paginationLink: responseData.links });
            this.setState({ totalPage: now });
        } catch (error) {
            console.error(error)
        } 
    }

    async handleChangePage(event, value){
        await this.setState({ currentPage: value });
        await this.getAttribution();
    }

    async handleDateChange(event, value){
        await this.setState({ currentDate: value });
        await this.getAttribution();
    }

    render() {
        return (
            <React.Fragment>
                
                <Navigation />

                <div className="marginDate">
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-dd"
                            margin="normal"
                            id="date-picker-inline"
                            value={this.state.currentDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <div className="pagination">
                    <Pagination count={this.state.totalPage} size="small" onChange={this.handleChangePage} />
                </div>

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