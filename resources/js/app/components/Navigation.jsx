import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';

const Navigation = () => {
    return (
        <React.Fragment>
            <Router>
                <header>
                    <Link to="/" id="btnWelcome" className="whiteFont">  Gestion ordinateur </Link>
                    <Button>
                        <ExitToAppIcon className="whiteFont" />
                    </Button>
                </header>
            </Router>
        </React.Fragment>
    )
}

export default Navigation;