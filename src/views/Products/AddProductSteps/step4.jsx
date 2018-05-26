import React from "react";
import NumberFormat from 'react-number-format';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OptionsActions from 'redux/actions/options';
import * as AlertActions from 'redux/actions/alert';
import * as ProductActions from 'redux/actions/product';

import { lang, pricing, countries } from "config.js";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import InputLabel from "material-ui/Input/InputLabel";
import FormControl from "material-ui/Form/FormControl";
import FormLabel from "material-ui/Form/FormLabel";
import InputAdornment from "material-ui/Input/InputAdornment";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";
import Button from "components/CustomButtons/Button.jsx";

// @material-ui/icons
import Add from "@material-ui/icons/Add";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import gridSystemStyle from "assets/jss/material-dashboard-pro-react/views/gridSystemStyle.jsx";
import buttonsStyle from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.jsx";
import { classNames } from 'classnames';

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    ...customSelectStyle,
    ...regularFormsStyle,
    ...gridSystemStyle,
    ...buttonsStyle
};


class Step4 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            pieceSizeA: "",
            pieceSizeB: "",
            pieceSizeH: "",
            pieceWeight: "",

            packSizeA: "",
            packSizeB: "",
            packSizeH: "",
            packWeight: "",

            boxSizeA: "",
            boxSizeB: "",
            boxSizeH: "",
            boxWeight: "",

            countInPack: "",
            countInBox: "",

        };

        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        
    }

    isValidated() {
        this.props.ProductActions.storeNewProduct({
            piece_size: this.state.pieceSizeA + "X" + this.state.pieceSizeB + "X" + this.state.pieceSizeH,
            piece_weight: isNaN(parseFloat(this.state.pieceWeight)) ? 0 : parseFloat(this.state.pieceWeight),
            pack_size: this.state.packSizeA + "X" + this.state.packSizeB + "X" + this.state.packSizeH,
            pack_weight: isNaN(parseFloat(this.state.packWeight)) ? 0 : parseFloat(this.state.packWeight),
            box_size: this.state.boxSizeA + "X" + this.state.boxSizeB + "X" + this.state.boxSizeH,
            box_weight: isNaN(parseFloat(this.state.boxWeight)) ? 0 : parseFloat(this.state.boxWeight),
            count_in_pack: isNaN(parseFloat(this.state.countInPack)) ? 0 : parseFloat(this.state.countInPack),
            count_in_box: isNaN(parseFloat(this.state.countInBox)) ? 0 : parseFloat(this.state.countInBox),
        });
        return true;
    }

    handleInput(key, value) {
        this.setState({ [key]: value });
    }

    render() {

        const { classes } = this.props;

        const render_input = (input, adornment, label) => {
            return(
                <CustomInput
                    id={input}
                    value={this.state[input]}
                    labelText={label}
                    formControlProps={{ fullWidth: true }}
                    style={{ padding: 0 }}
                    inputProps={{
                        type: "number", 
                        onChange:  (e) => this.handleInput(input, e.target.value),
                        endAdornment: (
                            <InputAdornment position="end" className={classes.inputAdornment} style={{ maxHeight: "4em" }}>
                                <sub>{adornment}</sub>
                            </InputAdornment>
                        )
                    }}
                />
            )
        }

        return (
            <GridContainer alignItems="center" direction="row">
                <ItemGrid xs={12} style={{ padding: "0 50px"}}>
                    <GridContainer justify="space-between" alignItems="center" direction="row"> 

                        <ItemGrid xs={12} sm={12} style={{textAlign: "center"}}>
                            <h6><strong>{lang.shop.piece1}</strong></h6>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={12} style={{margin: "auto"}}>
                            <GridContainer justify="space-around" alignItems="center" direction="row"> 
                                <ItemGrid xs={12} sm={12} md={4} style={{textAlign: "center"}}>
                                    <br/>
                                    <h6>{lang.shop.sizeWithOut}</h6>
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('pieceSizeA', lang.shop.mm, lang.shop.sizeA)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('pieceSizeB', lang.shop.mm, lang.shop.sizeB)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('pieceSizeH', lang.shop.mm, lang.shop.sizeH)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={2}>
                                    {/*  */}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={3}>
                                    {render_input('pieceWeight', lang.shop.g, lang.shop.weight)}
                                </ItemGrid>
                            </GridContainer>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={12} style={{textAlign: "center"}}>
                            <hr/>
                            <h6><strong>{lang.shop.pack}</strong></h6>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={12} style={{margin: "auto"}}>
                            <GridContainer justify="space-around" alignItems="center" direction="row"> 
                                <ItemGrid xs={12} sm={12} md={4} style={{textAlign: "center"}}>
                                    <br/>
                                    <h6>{lang.shop.sizeWith}</h6>
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('packSizeA', lang.shop.mm, lang.shop.sizeA)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('packSizeB', lang.shop.mm, lang.shop.sizeB)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('packSizeH', lang.shop.mm, lang.shop.sizeH)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={2}>
                                    {/*  */}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={2}>
                                    {/*  */}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={3}>
                                    {render_input('packWeight', lang.shop.g, lang.shop.weight)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={8} md={5}>
                                    {render_input('countInPack', lang.shop.piece, lang.shop.countInPack)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={2}>
                                    {/*  */}
                                </ItemGrid>
                            </GridContainer>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={12} style={{textAlign: "center"}}>
                            <hr/>
                            <h6><strong>{lang.shop.box}</strong></h6>
                        </ItemGrid>

                        <ItemGrid xs={12} sm={12} style={{margin: "auto"}}>
                            <GridContainer justify="space-around" alignItems="center" direction="row"> 
                                <ItemGrid xs={12} sm={12} md={4} style={{textAlign: "center"}}>
                                    <br/>
                                    <h6>{lang.shop.size}</h6>
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('boxSizeA', lang.shop.mm, lang.shop.sizeA)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('boxSizeB', lang.shop.mm, lang.shop.sizeB)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={2}>
                                    {render_input('boxSizeH', lang.shop.mm, lang.shop.sizeH)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={2}>
                                    {/*  */}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={2}>
                                    {/*  */}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={4} md={3}>
                                    {render_input('boxWeight', lang.shop.kg, lang.shop.weight)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={8} md={5}>
                                    {render_input('countInBox', lang.shop.piece, lang.shop.countInBox)}
                                </ItemGrid>
                                <ItemGrid xs={12} sm={12} md={2}>
                                    {/*  */}
                                </ItemGrid>
                            </GridContainer>
                        </ItemGrid>
                        
                    </GridContainer>
                </ItemGrid>
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
        AlertActions: bindActionCreators(AlertActions, dispatch),
        ProductActions: bindActionCreators(ProductActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Step4));
