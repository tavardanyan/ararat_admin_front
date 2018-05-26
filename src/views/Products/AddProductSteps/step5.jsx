import React from "react";

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OptionsActions from 'redux/actions/options';

import { lang, pricing, countries } from "config.js";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import InputLabel from "material-ui/Input/InputLabel";
import FormControl from "material-ui/Form/FormControl";
import Checkbox from "material-ui/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";


const style = {
    infoText: {
      fontWeight: "300",
      margin: "10px 0 30px",
      textAlign: "center"
    },
    inputAdornmentIcon: {
      color: "#555"
    },
    choiche: {
      textAlign: "center",
      cursor: "pointer",
      marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
  };


class Step5 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            clients: true,
            partners: false,
            subscribers: true,
            users: false,
            facebook: false,
            instagram: true,

        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        
    }

    isValidated() {
        
        return true;
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {

        const { classes } = this.props;

        const create_checkbox = (action, icon) => {
            return(
                <ItemGrid xs={12} sm={4}>
                    <div className={classes.choiche}>
                        <Checkbox
                            tabIndex={-1}
                            onClick={this.handleChange(action)}
                            checkedIcon={<i className={ icon + " " + classes.iconCheckboxIcon }/>}
                            icon={<i className={ icon + " " + classes.iconCheckboxIcon }/>}
                            classes={{checked: classes.iconCheckboxChecked,default: classes.iconCheckbox}}
                        />
                        <h6>{lang[action]}</h6>
                    </div>
                </ItemGrid>
            )
        }

        return (
            <GridContainer alignItems="center" direction="row">
                {create_checkbox('clients','fas fa-users')}
                {create_checkbox('partners','far fa-handshake')}
                {create_checkbox('subscribers','far fa-envelope')}
                {create_checkbox('users','far fa-id-card')}
                {create_checkbox('facebook','fab fa-facebook')}
                {create_checkbox('instagram','fab fa-instagram')}
            </GridContainer>
        );

    }

}

function mapStateToProps (state) {
    return {
        options: state.Options,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        OptionsActions: bindActionCreators(OptionsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Step5));
