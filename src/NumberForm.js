import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
var apiBaseUrl = "http://localhost:10090/translate/";

class NumberForm extends Component {
    handleClickOpen = () => {
        this.setState({open:true})
    }

    handleClose = () => {
        this.setState({open:false})
    }
    onInputChange = (event, newValue) => {
        this.setState({numberToFormat: event.target.value});
    }

    constructor(props) {
        super(props);
        this.state = {
            numberToFormat: "",
            open: false,
            message:""
        }
    }

    handleClick = event => {
        event.preventDefault();
        axios.get(apiBaseUrl+ this.state.numberToFormat)
            .then((response) => {
                console.log(response);
                if(response.status == 200){
                    if(response.data.code == 0){
                        this.handleClickOpen();
                        this.setState({message:response.data.message})

                    }
                }
                else{
                    console.log(response.data.message);
                    alert(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <form onSubmit={this.handleClick} autoComplete="off">
                        <TextField
                            id="numberField"
                            label="Number"
                            type="number"
                            required
                            onChange={this.onInputChange}
                            margin="normal"
                            onInput={(e) => {
                                e.target.value = e.target.value.slice(0, 19)
                            }}
                        />
                        <br/>

                        <RaisedButton label="Submit" primary={true} style={style} type={"submit"}/>

                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"System Message"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {this.state.message}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary" autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </form>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};

export default NumberForm;