import React from "react";
import NumberFormat from 'react-number-format';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductActions from 'redux/actions/product';

import { lang, pricing } from "config.js";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputLabel from "material-ui/Input/InputLabel";
import FormControl from "material-ui/Form/FormControl";
import InputAdornment from "material-ui/Input/InputAdornment";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import Radio from "material-ui/Radio";
import FormLabel from "material-ui/Form/FormLabel";

// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
      },
};

const inputStyle = {
    marginBottom: "40px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    fontWeight: "400",
    borderWidth: "0 0 3px 0",
    width: "100%",
    margin: "auto",
}





class Step2 extends React.Component {


    constructor(props) {

        super(props);

        this.state = {

            price1: '',
            price2: "",
            price3: "",
            available: "true",
            count: 0,
            count_reserve: 0,

        };

        this.hendleInput = this.hendleInput.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);

    }

    shouldComponentUpdate() {
        return true;
    }

    isValidated() {
        this.props.ProductActions.storeNewProduct({
            price1: isNaN(parseFloat(this.state.price1)) ? 0 : parseFloat(this.state.price1),
            price2: isNaN(parseFloat(this.state.price2)) ? 0 : parseFloat(this.state.price2),
            price3: isNaN(parseFloat(this.state.price3)) ? 0 : parseFloat(this.state.price3),
            available: this.state.available,
            count: isNaN(parseFloat(this.state.count)) ? 0 : parseFloat(this.state.count),
            count_reserve: isNaN(parseFloat(this.state.count_reserve)) ? 0 : parseFloat(this.state.count_reserve),
        });

        return true;
        
    }

    hendleInput(key, value) {
        value = isNaN(value) ? 0 : value;
        this.setState({ [key]: value });
    }

    handleChangeEnabled(event) {
        this.setState({ available: event.target.value });
    }

    
    render() {
        const { classes } = this.props;

        const numberWithCommas = (x) => {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }

        const recomend = (value, pricing_val, id) => {

            let color = "infoNoBackground";
            let input_value = ( value * ( 1 - ( ( (-1) * pricing_val ) / 100 ) ) ).toFixed(2)
            input_value = parseFloat(input_value)
            value = parseFloat(value);

            if(id === 'price2' && this.state.price2 > 0) {
                color = input_value === parseFloat(this.state.price2) 
                    ? "successNoBackground" 
                    : ( parseFloat(this.state.price1) < parseFloat(this.state.price2) 
                        ? "dangerNoBackground" 
                        : "warningNoBackground"
                      );
            }

            if(id === 'price3' && this.state.price3 > 0) {
                color = input_value === parseFloat(this.state.price3) 
                    ? "successNoBackground" 
                    : ( ( parseFloat(this.state.price2) < parseFloat(this.state.price3) ) || ( parseFloat(this.state.price1) < parseFloat(this.state.price3) )
                        ? "dangerNoBackground" 
                        : "warningNoBackground"
                      );
            }

            if(value > 0) {
                value = pricing.currency + " " + numberWithCommas( input_value );
                return(
                    <Button 
                        color={color}
                        customClass={classes.marginRight} 
                        style={{fontSize: 18, width: "100%"}}
                        onClick={() => this.setState({[id]:input_value})}
                    >
                        {value}
                    </Button>
                )
            }
            else {
                return(
                    <Button 
                        color={color}
                        customClass={classes.marginRight} 
                        style={{fontSize: 18, width: "100%"}}
                    >
                        {"$ 0"}
                    </Button>
                )
            }

        }

        return (
            <div>
                <h4 className={style.infoText} style={{fontWeight: "300", margin: "10px 0 30px", textAlign: "center"}}>{lang.shop.info2}</h4>
                <GridContainer justify="center">
                    <ItemGrid xs={12} sm={12} md={12} lg={10}>
                        <GridContainer>

                            <ItemGrid xs={12} sm={4} style={{textAlign: "center"}}>
                                
                                <NumberFormat 
                                    isNumericString={true}
                                    value={this.state.price1}
                                    style={{...inputStyle, fontSize: 28, textAlign: "center" }}
                                    thousandSeparator={true} 
                                    prefix={pricing.currency}
                                    onValueChange={ (values, e) => this.hendleInput("price1", values.value) }
                                />
                                <InputLabel htmlFor="price1" className={classes.selectLabel} style={{color: "#AAAAAA", textAlign: "center"}}>
                                    <span>{lang.shop.price1}</span>
                                </InputLabel>

                            </ItemGrid>

                            <ItemGrid xs={12} sm={4} style={{textAlign: "center"}}>
                                
                                <NumberFormat 
                                    isNumericString={true}
                                    id="price2"
                                    value={this.state.price2}
                                    isNumericString={true}
                                    style={{...inputStyle, fontSize: 28, textAlign: "center" }}
                                    thousandSeparator={true} 
                                    prefix={pricing.currency}
                                    onValueChange={ (values, e) => this.hendleInput("price2", values.value) }
                                />
                                <InputLabel htmlFor="price2" className={classes.selectLabel} style={{color: "#AAAAAA", textAlign: "center"}}>
                                    <span>{lang.shop.price2}</span>
                                </InputLabel>
                                {recomend(this.state.price1, pricing.price2Dif, "price2")}
                            </ItemGrid>

                            <ItemGrid xs={12} sm={4} style={{textAlign: "center"}}>
                                
                                <NumberFormat 
                                    isNumericString={true}
                                    id="price3"
                                    value={this.state.price3}
                                    style={{...inputStyle, fontSize: 28, textAlign: "center" }}
                                    thousandSeparator={true} 
                                    prefix={pricing.currency}
                                    onValueChange={ (values, e) => this.hendleInput("price3", values.value) }
                                />
                                <InputLabel htmlFor="price3" className={classes.selectLabel} style={{color: "#AAAAAA", textAlign: "center"}}>
                                    <span>{lang.shop.price3}</span>
                                </InputLabel>
                                {recomend(this.state.price1, pricing.price3Dif, "price3")}
                            </ItemGrid>

                            <ItemGrid style={{textAlign: "center", width: "100%"}}>
                                <hr/    >
                                <h6 className={style.infoText} style={{fontWeight: "300", margin: "10px 0 30px", textAlign: "center"}}>{lang.shop.availableProduct}</h6>
                                <div className={ classes.inlineChecks }>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.available === "true"}
                                                onChange={this.handleChangeEnabled}
                                                value="true"
                                                name="radio button enabled"
                                                aria-label="A"
                                                icon={ <FiberManualRecord className={classes.radioUnchecked} /> }
                                                checkedIcon={ <FiberManualRecord className={classes.radioChecked} /> }
                                                classes={{ checked: classes.radio }}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                        label={lang.shop.true}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.available === "false"}
                                                onChange={this.handleChangeEnabled}
                                                value="false"
                                                name="radio button enabled"
                                                aria-label="A"
                                                icon={ <FiberManualRecord className={classes.radioUnchecked} /> }
                                                checkedIcon={ <FiberManualRecord className={classes.radioChecked} /> }
                                                classes={{ checked: classes.radio }}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                        label={lang.shop.false}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.available === "order"}
                                                onChange={this.handleChangeEnabled}
                                                value="order"
                                                name="radio button enabled"
                                                aria-label="A"
                                                icon={ <FiberManualRecord className={classes.radioUnchecked} /> }
                                                checkedIcon={ <FiberManualRecord className={classes.radioChecked} /> }
                                                classes={{ checked: classes.radio }}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                        label={lang.shop.order}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.available === "soon"}
                                                onChange={this.handleChangeEnabled}
                                                value="soon"
                                                name="radio button enabled"
                                                aria-label="A"
                                                icon={ <FiberManualRecord className={classes.radioUnchecked} /> }
                                                checkedIcon={ <FiberManualRecord className={classes.radioChecked} /> }
                                                classes={{ checked: classes.radio }}
                                            />
                                        }
                                        classes={{ label: classes.label }}
                                        label={lang.shop.soon}
                                    />
                                </div>

                                <GridContainer style={{textAlign: "center"}}>

                                    <ItemGrid xs={6} sm={6} md={6}>
                                        <FormLabel  htmlFor="count" className={classes.labelHorizontal}>
                                            {lang.shop.count}
                                        </FormLabel>
                                    </ItemGrid>

                                    <ItemGrid xs={6} sm={6} md={6}>
                                        <CustomInput
                                            id="count"
                                            value={this.state.count}
                                            formControlProps={{ fullWidth: true }}
                                            inputProps={{
                                                type: "number",
                                                style: { textAlign: "center", maxWidth: 100, fontSize: 20},
                                                onChange:  (e) => this.hendleInput("count", e.target.value) 
                                            }}
                                        />
                                    </ItemGrid>

                                    <ItemGrid xs={6} sm={6} md={6}>
                                        <FormLabel  htmlFor="count_reserve" className={classes.labelHorizontal}>
                                            {lang.shop.countReserve}
                                        </FormLabel>
                                    </ItemGrid>

                                    <ItemGrid xs={6} sm={6} md={6}>
                                        <CustomInput
                                            id="count_reserve"
                                            value={this.state.count_reserve}
                                            formControlProps={{ fullWidth: true }}
                                            inputProps={{
                                                type: "number",
                                                style: { textAlign: "center", maxWidth: 100, fontSize: 20},
                                                onChange:  (e) => this.hendleInput("count_reserve", e.target.value) 
                                            }}
                                        />
                                    </ItemGrid>

                                </GridContainer>

                            </ItemGrid>                            

                        </GridContainer>
                    </ItemGrid>
                </GridContainer>
            </div>
        );

    }
}

function mapStateToProps (state) {
    return {
        product: state.Product,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ProductActions: bindActionCreators(ProductActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(regularFormsStyle, style)(Step2));



