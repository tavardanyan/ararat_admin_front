import React from "react";
import axios from 'axios';
import SweetAlert from "react-bootstrap-sweetalert";

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CategoryActions from '../../redux/actions/category';
import * as AlertActions from '../../redux/actions/alert';

// material-ui components
import withStyles from "material-ui/styles/withStyles";
//import FormLabel from "material-ui/Form/FormLabel";
import FormControl from "material-ui/Form/FormControl";
import FormControlLabel from "material-ui/Form/FormControlLabel";
//import Radio from "material-ui/Radio";
import Checkbox from "material-ui/Checkbox";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import InputLabel from "material-ui/Input/InputLabel";

// @material-ui/icons
//import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Contacts from "@material-ui/icons/Contacts";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
//import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import IconCard from "components/Cards/IconCard.jsx";
//import HeaderCard from "components/Cards/HeaderCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
//import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

import { lang } from "config.js";

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            alert: null,
            show: false,
            checked: [24, 22],
            selectedValue: null,
            simpleSelect: "",
            multipleSelect: [],
            selectedEnabled: "b",

            titleinput: "",
            sluginput: "",

            newCategory: {
                title: "",
                slug: "",
                desc: "",
                parent: "",
            },
            file: null,
            imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.successConfirm = this.successConfirm.bind(this);
        this.convertToSlug = this.convertToSlug.bind(this);
        //this.categotyTree = this.categotyTree.bind(this);
        this.getCategoryTree = this.getCategoryTree.bind(this);
        const { classes } = this.props;
    }

    handleChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    handleChangeEnabled(event) {
        this.setState({ selectedEnabled: event.target.value });
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
            checked: newChecked
        });
    }
    
    handleInput(key, e) {
        // var state = Object.assign({}, this.state.newCategory);
        // state[key] = e.target.value;
        let titleinput = "";
        if(this.state.newCategory.title != ""){
            titleinput = "success";
        }
        else {
            titleinput = "error";
        } 

        this.setState({titleinput,newCategory: {...this.state.newCategory, [key]:e.target.value} });
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

    handleSubmit(e) { 
        e.preventDefault();
        if(this.state.newCategory.title == ""){
            this.setState({titleinput: "error"})
        }
        else {
            let slug = this.state.newCategory.slug == "" ? this.convertToSlug(this.state.newCategory.title) : this.convertToSlug(this.state.newCategory.slug);
            this.setState({newCategory: { ...this.state.newCategory,slug: slug}});
            let text = "";
            this.props.AlertActions.openConfirm(
                {
                    type: "warning",
                    show: true,
                    style: { display: "block", marginTop: "-100px" },
                    title: lang.areYouSure,
                    text: text,
                    showCancel: true,
                    showConfirm: true,
                    confirmBtnText: lang.add,
                    cancelBtnText: lang.cancel,
                    confirmBtnCssClass:  this.props.classes.button + " " + this.props.classes.success,
                    cancelBtnCssClass:  this.props.classes.button + " " + this.props.classes.danger,
                    onConfirm: () => this.successConfirm(),
                    onCancel: () => this.hideAlert()
                }
            );
        }
        
    }

    successConfirm() {
        let catImage = new FormData();
        catImage.append('file', document.getElementById('file').files[0]);   
        
        this.props.CategoryActions.addCategory( {...this.state.newCategory, image: catImage} );  

        const getAllCat = () => { 
            this.props.CategoryActions.getAllCategory() 
            document.getElementById("addCategory").reset();
            this.setState({ imagePreviewUrl: defaultImage });
            this.setState({ file: null });
            this.setState({ titleinput: "" });
            this.setState({ newCategory: {
                title: "",
                slug: "",
                desc: "",
                parent: "",
            } });
        }

        setTimeout(function(){ 
            getAllCat();
        }, 1500)

    }

    hideAlert() {
        this.props.AlertActions.openConfirm(
            {
                show: false,
            }
        );
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

    convertToSlug(slug)
    {
        return slug
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-')
            ;
    }

    getCategoryTree(categoryId) {
        let category_data = this.props.Category.category.data;
        let response_data = [];
        for(let {id, title, parent, slug, image, desc} of category_data) {
            if(parent == categoryId) {
                response_data.push({id: id, title: title, image: image, slug: slug, desc: desc, parent: parent, child: this.getCategoryTree(id)})
            }
        }
        return response_data
    }

    printCategoryTree(categoryId, level="") {
        const { classes } = this.props;
        let category_data = this.props.Category.category.data;
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

    render() {

        const { classes } = this.props;

        const ImageUpload = () => { return(<div className="fileinput text-center">
        <div className={"thumbnail" + (this.props.avatar ? " img-circle" : "")}>
          <img src={this.state.imagePreviewUrl} alt="..." />
        </div>
        <div>
          {this.state.file === null ? (
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
          )}
        </div>
      </div>)};
        
        return(
            <div>
                
            <IconCard
                icon={PlaylistAdd}
                iconColor="rose"
                title={lang.addCategory}
                content={
                    <form onSubmit={this.handleSubmit.bind(this)} method="post" encType="multipart/form-data" id="addCategory">
                        <GridContainer>

                            <ItemGrid xs={12} sm={12} md={2}>
                                
                            </ItemGrid>

                            <ItemGrid xs={12} sm={12} md={3}>
                                <input type="file" name="file" id="file" style={{display: 'none'}} />
                                <ImageUpload />
                            </ItemGrid>

                            <ItemGrid xs={12} sm={12} md={5}>

                                <CustomInput
                                    id="title"
                                    error={this.state.titleinput == "error"}
                                    success={this.state.titleinput == "success"}
                                    labelText={lang.title}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: (e)=>this.handleInput('title',e),
                                        onBlur: (e)=>this.handleInput('title',e),
                                    }}
                                />
                                <CustomInput
                                    id="slug"
                                    error={this.state.sluginput === "error"}
                                    labelText={lang.slug}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: true,
                                        type: "text",
                                        onChange: (e)=>this.handleInput('slug',e),
                                        value: this.convertToSlug(this.state.newCategory.title)
                                    }}
                                />

                                <CustomInput
                                    id="desc"
                                    labelText={lang.desc}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "text",
                                        onChange: (e)=>this.handleInput('desc',e),
                                    }}
                                />
                                
                                <FormControl fullWidth className={classes.selectFormControl}>

                                    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                                        {lang.parent}
                                    </InputLabel>

                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={this.state.newCategory.parent}
                                        onChange={(e)=>this.handleInput('parent',e)}
                                        inputProps={{
                                            name: "parent",
                                            id: "parent"
                                        }}
                                    >

                                        <MenuItem disabled classes={{ root: classes.selectMenuItem }}>
                                            {lang.parent}
                                        </MenuItem>

                                        <MenuItem classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value={""}>
                                            {lang.noparent}
                                        </MenuItem>

                                        {this.printCategoryTree()}
                              
                                    </Select>
                                </FormControl>
                            </ItemGrid>

                            <ItemGrid xs={12} sm={12} md={2}>
                                
                            </ItemGrid>

                        </GridContainer>


                        <GridContainer justify="flex-end">
                            {/* <ItemGrid xs={12} sm={12} md={6}>
                                <div className={classes.checkboxAndRadio}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                tabIndex={-1}
                                                onClick={() => this.handleToggle(1)}
                                                checkedIcon={
                                                    <Check className={classes.checkedIcon} />
                                                }
                                                icon={<Check className={classes.uncheckedIcon} />}
                                                classes={{
                                                    checked: classes.checked
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label
                                        }}
                                        label="Remember me"
                                    />
                                </div>
                            </ItemGrid> */}
                        </GridContainer>


                        <GridContainer justify="flex-end">
                            <ItemGrid xs={12} sm={12} md={9}>
                                <Button color="rose" type="submit">{lang.add}</Button>
                            </ItemGrid>
                        </GridContainer>

                    </form>
                }
            />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        Category: state.Category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        CategoryActions: bindActionCreators(CategoryActions, dispatch),
        AlertActions: bindActionCreators(AlertActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(regularFormsStyle)(AddCategory));