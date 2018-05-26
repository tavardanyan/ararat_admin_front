import React from "react";

// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CategoryActions from 'redux/actions/category';
import * as ProductActions from 'redux/actions/product';

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputAdornment from "material-ui/Input/InputAdornment";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import InputLabel from "material-ui/Input/InputLabel";
import FormControl from "material-ui/Form/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import { lang, API_URL } from "config.js";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    top: "3px",
    position: "relative",
  },
  ...customSelectStyle
};

class Step1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            category: this.props.update.category,
            sku: this.props.update.sku,
            name: this.props.update.name,
            barcode: "",

            nameState: this.props.update.name === "" ? "" : "success",
            categoryState: false,

            file: null,
            imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.printCategoryTree = this.printCategoryTree.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleTags = this.handleTags.bind(this);
    }

    componentDidMount() {
        this.props.CategoryActions.getAllCategory();
    }

  // function that verifies if a string has a given length or not
    verifyLength(value, length) {
        if (value.length >= length) {
            return true;
        }
        return false;
    }

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
        case "length":
            if (this.verifyLength(event.target.value, stateNameEqualTo)) {
                this.setState({ [stateName + "State"]: "success" });
            } else {
                this.setState({ [stateName + "State"]: "error" });
            }
            break;
        default:
            break;
        }
        this.setState({ [stateName]: event.target.value });
    }

    isValidated() {
        // ///////////
        // return true
        // ///////////
        if (
            this.state.nameState === "success" &&
            this.state.category !== "" 
        ) {
            if(this.state.sku === "" ? true : !this.props.product.check_SKU.status) {
                let sku = this.state.sku === "" ? this.props.product.check_SKU.SKU : this.state.sku;
                let product_image = new FormData();
                product_image.append('file', document.getElementById('file').files[0]);   
                this.props.ProductActions.storeNewProduct({
                    category: parseInt(this.state.category, 10),
                    sku: sku,
                    name: this.state.name,
                    barcode: this.state.barcode,
                    //tags: this.state.tags.join(','),
                    file: product_image,
                });
                this.setState({sku: sku});
                return true;
            }
            return false;
        } else {
            if (this.state.nameState !== "success") {
                this.setState({ nameState: "error" });
            }
            if (this.state.category === "") {
                this.setState({ categoryState: true });
            }

            //this.state.sku === "" ? null : !this.props.product.check_SKU.status
        }
        return false;
    }

    handleClick() {
        var input = document.getElementById("file");
        input.onchange = this.handleImageChange;
        input.click();
    }

    handleRemove() {
        this.setState({
            file: null,
            imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
        });
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    handleInput(key, e) {
        if(key === "sku") {
            this.props.ProductActions.checkSKU(e.target.value);
        }
        this.setState({ [key]:e.target.value });
    }

    printCategoryTree(categoryId, level="") {
        const { classes } = this.props;
        let category_data = this.props.category.data;
        let response_data = [];
        for(let {id, title, parent, slug, image, desc} of category_data) {
            if(parent == categoryId) {
                response_data.push(
                    <MenuItem key={id} classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value={id}>
                        <span style={{ color: "#AAAAAA"}}>{level + " "}</span>{" " + title}
                    </MenuItem>)
                response_data.push(this.printCategoryTree(id, (level + " └─── ")))
            }
        }
        return response_data
    }

    handleTags(regularTags) {
        this.setState({ tags: regularTags });
    }

  render() {
    const { classes } = this.props;


    const ImageUpload = () => { 
        return(
            <div className="fileinput text-center">
                <div className={"thumbnail" + (this.props.avatar ? " img-circle" : "")}>
                    <img src={this.state.imagePreviewUrl} alt="..." />
                </div>
                <div>
                    {
                        this.state.file === null ? 
                            (
                            <Button round color="rose" onClick={() => this.handleClick()}>
                                {this.props.avatar ? "Add Photo" : lang.selectImage}
                            </Button>
                            ) : (
                            <span>
                                <Button round color="rose" onClick={() => this.handleClick()}>
                                    {lang.change}
                                </Button>
                                {this.props.avatar ? <br /> : null}
                                <Button color="danger" round onClick={() => this.handleRemove()}>
                                    <i className="fa fa-times" /> {lang.remove}
                                </Button>
                            </span>
                            )
                    }
                </div>
            </div>
        )};

    return (
        <GridContainer justify="center">
            <ItemGrid xs={12} sm={12}>
                <h4 className={classes.infoText}>
                    {lang.shop.info1}
                </h4>
            </ItemGrid>
            <ItemGrid xs={12} sm={4}>
                <input type="file" name="file" id="file" style={{display: 'none'}} />
                <ImageUpload />
            </ItemGrid>
            <ItemGrid xs={12} sm={6}>
                <CustomInput
                    success={this.state.nameState === "success"}
                    error={this.state.nameState === "error"}
                    labelText={
                    <span>
                        {lang.shop.name} <small>({lang.shop.required})</small>
                    </span>
                    }

                    labelProps={{ className: classes.selectLabel}}
                    id="name"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: this.state.name,
                        onChange: event => this.change(event, "name", "length", 3),
                    }}
                />


                <FormControl fullWidth className={classes.selectFormControl}>

                    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                        {lang.shop.category}  <small>({lang.shop.required})</small>
                    </InputLabel>

                    <Select
                        error={this.state.categoryState}
                        value={this.state.category}
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select
                        }}
                        onChange={(e)=>this.handleInput('category', e)}
                        inputProps={{
                            name: "category",
                            id: "category"
                        }}
                    >

                        <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                            {lang.parent}
                        </MenuItem>

                        {this.printCategoryTree()}

                    </Select>

                </FormControl>


                <CustomInput
                    labelText={
                        <span>
                            {lang.shop.sku}
                        </span>
                    }
                    labelProps={{ className: classes.selectLabel}}
                    id="sku"
                    error={this.state.sku === "" ? null : this.props.product.check_SKU.status}
                    success={this.state.sku === "" ? null : !this.props.product.check_SKU.status}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: (e)=>this.handleInput('sku', e),
                    }}
                />

                <CustomInput
                    labelText={
                        <span>
                            {lang.shop.barcode}
                        </span>
                    }
                    labelProps={{ className: classes.selectLabel}}
                    id="barcode"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: (e)=>this.handleInput('barcode', e),
                    }}
                />
                

                {/* <br />
                <br />
                <p>{ lang.shop.tags }</p>
                <TagsInput
                    inputProps={{
                        placeholder: lang.shop.addTags,
                        style: {fontSize: "16px", width: "100%"}
                    }}
                    value={this.state.tags}
                    onChange={this.handleTags}
                    tagProps={{ className: "react-tagsinput-tag info" }}
                />
                <hr /> */}

            </ItemGrid>
        </GridContainer>
    );
  }
}

function mapStateToProps (state) {
    return {
        product: state.Product,
        category: state.Category.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        CategoryActions: bindActionCreators(CategoryActions, dispatch),
        ProductActions: bindActionCreators(ProductActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style,regularFormsStyle)(Step1));

