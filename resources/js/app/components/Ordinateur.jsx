import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import SuppOrdiModal from './modalSuppOrdi';
import SuppAttributionModal from './modalSuppAttribution';
import AjoutAttributionModal from './modalAjoutAttribution';

export default class OrdinateurCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attributions: {},
            timeslots: [],
        }
        this.getDeleteOrdi     = this.getDeleteOrdi.bind(this);
        this.getSupAttribution = this.getSupAttribution.bind(this);
    }

    componentDidMount() {
        this.initialize()
        this.displayHoraire()
    }

    initialize() {
        var attributionInfo = this.props.ordinateur.attributions;
        if (attributionInfo.length != 0) {
            attributionInfo.forEach(element => {
                this.state.attributions[element.hours] ={
                    id: element.client.id,
                    surname: element.client.surname,
                    name: element.client.name,
                    idAssign: element.idAssign
                }
            })
        }
    }

    displayHoraire() {
        this.setState({timeslots: []});
        let arrayData = {};
        let arrayDataFormatted = [];

        for (let i = 8; i < 19; i++) {
            if (this.state.attributions[i]) {
                arrayData = {
                    hours: i,
                    client: this.state.attributions[i],
                }
                arrayDataFormatted.push(arrayData)
            } else {
                arrayData = {
                    hours: i,
                    client: ''
                }
                arrayDataFormatted.push(arrayData)
            }
        }
        this.setState({timeslots: arrayDataFormatted})
    }

    async getSupAttribution(idAssign){
        await this.setState({ attributions: {}});
       
        const refreshDeleteData = this.state.timeslots.filter(element => element.client.idAssign != idAssign);
        refreshDeleteData.forEach(element => {
            if (element.client.id) {
                this.state.attributions[element.hours] = {
                    id: element.client.id,
                    surname: element.client.surname,
                    name: element.client.name,
                    idAssign: element.client.idAssign
                }
            }
        });
        this.displayHoraire();
    }


    getDeleteOrdi(childData) {
        if (childData) {
            this.props.deleteOrdi(childData);
        }
    }


    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardContent>
                        <div className="ordinateurHeader">
                            <div>
                                <Typography color="initial">
                                    {this.props.ordinateur.name}
                                </Typography>
                            </div>
                            <div>
                                <SuppOrdiModal suppOrdi={this.getDeleteOrdi} idOrdi={this.props.ordinateur.id} />
                            </div>
                        </div>

                        <TableContainer>
                            <Table size="small">
                                <TableBody>
                                    {this.state.timeslots.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell size="small" component="th" scope="row">{data.hours}h</TableCell>
                                            <TableCell align="center">{data.client.surname} {data.client.name}</TableCell>
                                            <TableCell align="right">
                                                <Button>
                                               { data.client != ""
                                                        ? <SuppAttributionModal suppAttribution={this.getSupAttribution} idAssign={data.client.idAssign} />
                                                        : <AjoutAttributionModal/>
                                               }
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </CardContent>
                </Card>
            </React.Fragment>
        )
    }
}