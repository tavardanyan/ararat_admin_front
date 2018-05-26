import React from "react";

// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";

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

class Step3 extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            brend: "",
            brendCountry: "",
            model: "",
            material: [],
            color: [],
            specific: "",
            desc: "",
            tags: ["NEW"],

            multipleSelect: [],

        };

        this.addNewAttribute = this.addNewAttribute.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.successConfirm = this.successConfirm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleTags = this.handleTags.bind(this);
    }

    componentDidMount() {
        this.props.OptionsActions.getOptions();
    }

    isValidated() {
        this.props.ProductActions.storeNewProduct({
            brend: this.state.brend,
            country: this.state.brendCountry,
            model: this.state.model,
            material: this.state.material.join(','),
            color: this.state.color.join(','),
            specific: this.state.specific,
            desc: this.state.desc,
            tags: this.state.tags.join(','),
        });
        return true;
    }

    handleInput(key, value) {
        this.setState({ [key]: value });
    }

    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    hideAlert() {
        this.props.AlertActions.openConfirm(
            {
                show: false,
            }
        );
    }

    successConfirm(type, e) {
        let opt = [];
        switch(type) {
            case 'brend': opt = this.props.options.brend; break;
            case 'material': opt = this.props.options.material; break;
            case 'color': opt = this.props.options.color; break;
            default: break;
        }
        let attr = [...opt, e];
        this.props.OptionsActions.updateOptions(type, {type: type, value: attr});
        this.hideAlert();
        switch(type) {
            case 'brend': this.setState({brend:e}); break;
            case 'material': this.setState({material: [...this.state.material,e]}); break;
            case 'color': this.setState({color: [...this.state.color,e]}); break;
            default: this.setState({[type]:e}); break;
        }
    }

    addNewAttribute(title, type) {
        this.props.AlertActions.openConfirm(
            {
                type: "input",
                show: true,
                style: { display: "block", marginTop: "-100px" },
                title: title,
                defaultValue: '',
                validationMsg: lang.shop.validationMsg,
                validationRegex: type === 'color' ? /^#([0-9a-f]{3}|[0-9a-f]{6})$/i : {},
                showCancel: true,
                showConfirm: true,
                confirmBtnText: lang.add,
                cancelBtnText: lang.cancel,
                confirmBtnCssClass:  this.props.classes.button + " " + this.props.classes.success,
                cancelBtnCssClass:  this.props.classes.button + " " + this.props.classes.danger,
                onConfirm: (e) => this.successConfirm(type, e),
                onCancel: () => this.hideAlert()
            }
        );
    }

    render() {

        const { classes } = this.props;

        const brend_list = this.props.options.brend.map((item, index) =>
            <MenuItem
                key={index}
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value={item}>
                {item}
            </MenuItem>
        )

        const brend_country_list = countries.map((item, index) =>
            <MenuItem
                key={index}
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value={item.isoAlpha3}>
                    <img src={"data:image/png;base64," + item.flag} width="25" alt={item.name}/> 
                    <span style={{ paddingLeft: 20}}>{item.name}</span>
            </MenuItem>
        )

        const material_list = this.props.options.material.map((item, index) =>
            <MenuItem
                key={index}
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                value={item}>
                {item}
            </MenuItem>
        )
        const color_item = (item) => {
            return(
            <div style={{width: '100%', height: '100%', backgroundColor: item, textAlign: "center"}}>{item}</div>)
    } 
        const color_list = this.props.options.color.map((item, index) =>
            <MenuItem
                key={index}
                classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                }}
                style={{backgroundColor: item, textAlign: "center"}}
                value={item}>
                {item}
            </MenuItem>
        )

        return (
            <GridContainer justify="space-between" alignItems="center" direction="row">

                <ItemGrid xs={12} sm={12}>
                    <h4 className={classes.infoText}>
                        {lang.shop.info3}
                    </h4>
                </ItemGrid>

                <ItemGrid xs={8} style={{margin: "auto"}}>

                    <GridContainer justify="space-between" alignItems="center" direction="row">

                        <ItemGrid xs={10} style={{textAlign: "center"}}>
                            <FormControl fullWidth className={classes.selectFormControl} >
                                <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                                    {lang.shop.brend}
                                </InputLabel>
                                <Select
                                    MenuProps={{ className: classes.selectMenu }}
                                    classes={{ select: classes.select }}
                                    value={this.state.brend}
                                    onChange={this.handleSimple}
                                    inputProps={{ name: "brend", id: "simple-select" }}
                                >
                                    <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                                        {lang.shop.chooseBrend}
                                    </MenuItem>
                                    {brend_list}
                                </Select>
                            </FormControl>
                        </ItemGrid>

                        <ItemGrid xs={2} style={{textAlign: "center"}}>
                            <IconButton color="success" customClass={classes.marginRight} onClick={() => this.addNewAttribute(lang.shop.newBrend, 'brend')}>
                                <Add className={classes.icons} />
                            </IconButton>
                        </ItemGrid>

                        <ItemGrid xs={10} style={{textAlign: "center"}}>
                            <FormControl fullWidth className={classes.selectFormControl} >
                                <InputLabel htmlFor="simple-select-brendCountry" className={classes.selectLabel}>
                                    {lang.shop.brendCountry}
                                </InputLabel>
                                <Select
                                    MenuProps={{ className: classes.selectMenu }}
                                    classes={{ select: classes.select }}
                                    value={this.state.brendCountry}
                                    onChange={this.handleSimple}
                                    inputProps={{ name: "brendCountry", id: "simple-select-brendCountry" }}
                                >
                                    <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                                        {lang.shop.chooseBrendCountry}
                                    </MenuItem>
                                    <MenuItem
                                        classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                                        value={countries[10].isoAlpha3}>
                                            <img src={"data:image/png;base64," + countries[10].flag} width="25" alt={countries[10].name}/> 
                                            <span style={{ paddingLeft: 20}}>{countries[10].name}</span>
                                    </MenuItem>
                                    <MenuItem
                                        classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                                        value={countries[176].isoAlpha3}>
                                            <img src={"data:image/png;base64," + countries[176].flag} width="25" alt={countries[176].name} /> 
                                            <span style={{ paddingLeft: 20}}>{countries[176].name}</span>
                                    </MenuItem>
                                    <MenuItem
                                        classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }}
                                        value={countries[44].isoAlpha3}>
                                            <img src={"data:image/png;base64," + countries[44].flag} width="25" alt={countries[44].name} /> 
                                            <span style={{ paddingLeft: 20}}>{countries[44].name}</span>
                                    </MenuItem>
                                    <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                                        {"_____________________________"}
                                    </MenuItem>
                                    {brend_country_list}
                                </Select>
                            </FormControl>
                        </ItemGrid>

                        <ItemGrid xs={2} style={{textAlign: "center"}}>
                            {/*  */}
                        </ItemGrid>

                        <ItemGrid xs={10} style={{textAlign: "center"}}>
                            <CustomInput
                                id="model"
                                value={this.state.model}
                                labelText={lang.shop.model}
                                labelProps={{ className: classes.selectLabel}}
                                formControlProps={{ fullWidth: true }}
                                inputProps={{ onChange:  (e) => this.handleInput("model", e.target.value) }}
                            />
                        </ItemGrid>

                        <ItemGrid xs={2} style={{textAlign: "center"}}>
                            {/*  */}
                        </ItemGrid>

                        <ItemGrid xs={10} style={{textAlign: "center"}}>
                            <FormControl fullWidth className={classes.selectFormControl} >
                                <InputLabel htmlFor="simple-select-material" className={classes.selectLabel}>
                                    {lang.shop.material}
                                </InputLabel>
                                <Select
                                    multiple
                                    MenuProps={{ className: classes.selectMenu }}
                                    classes={{ select: classes.select }}
                                    value={this.state.material}
                                    onChange={this.handleSimple}
                                    inputProps={{ name: "material", id: "simple-select-material" }}
                                >
                                    <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                                        {lang.shop.chooseMaterial}
                                    </MenuItem>
                                    {material_list}
                                </Select>
                            </FormControl>
                        </ItemGrid>

                        <ItemGrid xs={2} style={{textAlign: "center"}}>
                            <IconButton color="success" customClass={classes.marginRight} onClick={() => this.addNewAttribute(lang.shop.newMaterial, 'material')}>
                                <Add className={classes.icons} />
                            </IconButton>
                        </ItemGrid>

                        <ItemGrid xs={10} style={{textAlign: "center"}}>
                            <FormControl fullWidth className={classes.selectFormControl} >
                                <InputLabel htmlFor="simple-select-color" className={classes.selectLabel}>
                                    {lang.shop.color}
                                </InputLabel>
                                <Select
                                    multiple
                                    MenuProps={{ className: classes.selectMenu }}
                                    classes={{ select: classes.select }}
                                    value={this.state.color}
                                    onChange={this.handleSimple}
                                    inputProps={{ name: "color", id: "simple-select-color" }}
                                >
                                    <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                                        {lang.shop.chooseColor}
                                    </MenuItem>
                                    {color_list}
                                </Select>
                            </FormControl>
                        </ItemGrid>

                        <ItemGrid xs={2} style={{textAlign: "center"}}>
                            <IconButton color="success" customClass={classes.marginRight} onClick={() => this.addNewAttribute(lang.shop.newColor, 'color')}>
                                <Add className={classes.icons} />
                            </IconButton>
                        </ItemGrid>

                        <ItemGrid xs={10} style={{textAlign: "center"}}>
                            <CustomInput
                                id="specific"
                                value={this.state.specific}
                                labelText={lang.shop.specific}
                                labelProps={{ className: classes.selectLabel}}
                                formControlProps={{ fullWidth: true }}
                                inputProps={{ onChange:  (e) => this.handleInput("specific", e.target.value) }}
                            />
                        </ItemGrid>

                        <ItemGrid xs={2} style={{textAlign: "center"}}>
                            {/*  */}
                        </ItemGrid>

                        <ItemGrid xs={10} style={{textAlign: "center"}}>
                            <CustomInput
                                id="desc"
                                value={this.state.desc}
                                labelText={lang.shop.desc}
                                labelProps={{ className: classes.selectLabel}}
                                formControlProps={{ fullWidth: true }}
                                inputProps={{ onChange:  (e) => this.handleInput("desc", e.target.value), multiline: true, rows: 4 }}
                            />
                        </ItemGrid>

                        <ItemGrid xs={2} style={{textAlign: "center"}}>
                            {/*  */}
                        </ItemGrid>

                        <ItemGrid xs={10}>
                            <h6>{lang.shop.tags}</h6>
                            <TagsInput
                                inputProps={{
                                    placeholder: lang.shop.addTags,
                                    style: {fontSize: "16px", width: "100%"},
                                }}
                                style={{fontSize: "16px"}}
                                value={this.state.tags}
                                onChange={this.handleTags}
                                tagProps={{ className: "react-tagsinput-tag info", style: {fontSize: "14px"}}}
                            />
                            <hr style={{marginTop: 0}}/>
                        </ItemGrid>

                        <ItemGrid xs={2} style={{textAlign: "center"}}>
                            {/*  */}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Step3));
