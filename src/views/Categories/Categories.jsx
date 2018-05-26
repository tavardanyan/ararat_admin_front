import React from "react";

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CategoryActions from '../../redux/actions/category';
import * as AlertActions from '../../redux/actions/alert';
//import { const_category } from '../../redux/constants/category';

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Dialog from "material-ui/Dialog";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogContent from "material-ui/Dialog/DialogContent";
import DialogActions from "material-ui/Dialog/DialogActions";
import Slide from "material-ui/transitions/Slide";
import FormControl from "material-ui/Form/FormControl";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import InputLabel from "material-ui/Input/InputLabel";

// @material-ui/icons
//import Dashboard from "@material-ui/icons/Dashboard";
//import Schedule from "@material-ui/icons/Schedule";
//import Info from "@material-ui/icons/Info";
//import LocationOn from "@material-ui/icons/LocationOn";
//import Gavel from "@material-ui/icons/Gavel";
//import HelpOutline from "@material-ui/icons/HelpOutline";
import ViewList from "@material-ui/icons/ViewList";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import DeleteSweep from "@material-ui/icons/DeleteSweep";
import LowPriority from "@material-ui/icons/LowPriority";
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Info from "@material-ui/icons/Info";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
//import Check from "@material-ui/icons/Check";
//import Remove from "@material-ui/icons/Remove";
//import Add from "@material-ui/icons/Add";
//import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";


// core components
//import GridContainer from "components/Grid/GridContainer.jsx";
//import ItemGrid from "components/Grid/ItemGrid.jsx";
import RegularCard from "components/Cards/RegularCard.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
//import Accordion from "components/Accordion/Accordion.jsx";
import Table from "components/Table/Table.jsx";
import IconCard from "components/Cards/IconCard.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";

import { lang, API_URL } from "config.js";

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import notificationsStyle from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";
import AddCategory from "./AddCategory";

import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

// const styles = {
//     pageSubcategoriesTitle: {
//         color: "#3C4858",
//         textDecoration: "none",
//         textAlign: "center"
//     }
// };

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: [],
            category: {},
            modal: false,
            id: 0,
            title: '',
            parent: '',
            desc: '',
            parent_dinamic: '',
            error: null,
            success: null,
            file: null,
            treeData: null,
            revertTree: [],
        };
        this.hideAlert = this.hideAlert.bind(this);
        this.successConfirm = this.successConfirm.bind(this);
        this.openConfirm = this.openConfirm.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmitModal = this.handleSubmitModal.bind(this);
        this.printCategoryTree = this.printCategoryTree.bind(this);
        this.getCategoryTree = this.getCategoryTree.bind(this);
        this.revertTree = this.revertTree.bind(this);
        this.callRevertTree = this.callRevertTree.bind(this);
    }

    componentDidMount() {
        this.props.CategoryActions.getAllCategory();
    }
    componentWillReceiveProps() {
        
    }

    componentDidUpdate() {
        
    }

    shouldComponentUpdate() {
        return true;
    }

    openConfirm(action, item) {
        let confirmBtnText = "ok";
        if(action === "delete"){
            confirmBtnText = lang.remove;
            this.props.AlertActions.openConfirm(
                {
                    type: "warning",
                    show: true,
                    style: { display: "block", marginTop: "-100px" },
                    title: lang.areYouSure,
                    text: "",
                    showCancel: true,
                    showConfirm: true,
                    confirmBtnText: confirmBtnText,
                    cancelBtnText: lang.cancel,
                    confirmBtnCssClass:  this.props.classes.button + " " + this.props.classes.success,
                    cancelBtnCssClass:  this.props.classes.button + " " + this.props.classes.danger,
                    onConfirm: () => this.successConfirm(action, item),
                    onCancel: () => this.hideAlert()
                }
            );
        }
        if(action === "treeChenge") {
            

            //let title = "ID: " + item.element.id + " - " + item.element.title;
            let text = [];
           
                
            item.forEach((i, index) => {
                text.push(
                    <div>
                        <h5><strong>{lang.category}</strong>{" - "}{i.element.title}{" (ID: "}{i.element.id}{")"}</h5>
                        <p>
                            <strong>{lang.old + lang.parent}</strong>{" - "}{i.old.title}{" (ID: "}{i.old.id}{")"}<br /> 
                            <strong>{lang.new + lang.parent}</strong>{" - "}{i.new.title}{" (ID: "}{i.new.id}{")"}
                        </p> 
                        <hr />
                    </div>
                )
            });
            


            // let texto = lang.old + lang.parent + " => ID: " + item.old.id + " - " + item.old.title + ", " + 
            //             lang.new + lang.parent + " => ID: " + item.new.id + " - " + item.new.title;
    
            this.props.AlertActions.openConfirm(
                {
                    type: "warning",
                    show: true,
                    style: { display: "block", marginTop: "-100px" },
                    text: <div>{text}</div>,
                    showCancel: true,
                    showConfirm: true,
                    confirmBtnText: lang.save,
                    cancelBtnText: lang.cancel,
                    confirmBtnCssClass:  this.props.classes.button + " " + this.props.classes.success,
                    cancelBtnCssClass:  this.props.classes.button + " " + this.props.classes.danger,
                    onConfirm: () => this.successConfirm(action, item),
                    onCancel: () => this.hideAlert()
                }
            );
        }
        if(action === "edit") {
            this.setState({ 
                modal: true,
                parent_dinamic: item.parent,
                parent: item.parent,
                title: item.title,
                id: item.id,
                desc: item.desc,
            })
        }
    }

    successConfirm(action, item) {
        if(action === "treeChenge") {
            this.props.CategoryActions.bulkUpdateCategory(item);
        }
        else {
            this.props.CategoryActions.deleteCategory(item.id)
        }
        
        const getAllCat = () => { 
            this.props.CategoryActions.getAllCategory() 
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

    handleCloseModal() {
        this.setState({ 
            modal: false,
            parent_dinamic: "",
            parent: "",
            title: "",
            desc: "",
            id: 0,
            error: null,
            success: null,
        });
    }

    handleSubmitModal() {
        if(this.state.title != "") {
            this.handleCloseModal()
            this.props.CategoryActions.updateCategory({
                id: this.state.id, 
                title: this.state.title, 
                parent: this.state.parent_dinamic,
                desc: this.state.desc,
                slug: this.state.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
                })
            const getAllCat = () => { 
                this.props.CategoryActions.getAllCategory() 
            }

            setTimeout(function(){ 
                getAllCat();
            }, 1500)
        }
        else {
            this.setState({ error: true })
        }
    }

    getCategoryTree(categoryId) {
        let category_data = this.props.category.data;
        let response_data = [];
        for(let {id, title, parent, slug, image, desc} of category_data) {
            if(parent == categoryId) {
                response_data.push({
                    id: id, 
                    title: title, 
                    subtitle: "ID: " + id, 
                    image: image, 
                    slug: slug, 
                    desc: desc, 
                    parent: parent, 
                    children: this.getCategoryTree(id)})
            }
        }
        return response_data
    }

    revertTree(tree, parentID = null, response_array) {
        if(tree !== null && tree !== undefined) {
            tree.forEach((element, index) => {
                element.parent = parentID;
                response_array.push(element)
                if(element.children.length > 0) {
                    this.revertTree(element.children, element.id, response_array)
                }
            })
            return response_array;
        }
        else {
            return console.log(null)
        }
    }

    callRevertTree(tree, parentID) {
        let new_cat = this.revertTree(tree, parentID, []);
        let old_cat = this.props.category.data;

        let obj = {};
        let old_parent_obj = {};
        let new_parent_obj = {};

        let chenges = [];

        let text = "";
        if(new_cat !== undefined) {
            new_cat.forEach((element, index) => {
                obj = old_cat.find(function(obj) { return obj.id === element.id && obj.parent !== element.parent})
                if(obj !== undefined) {

                    old_parent_obj = old_cat.find(function(old_parent_obj) { return old_parent_obj.id === obj.parent})
                    old_parent_obj = old_parent_obj === undefined ? { id: null, title: null } : old_parent_obj;
                    
                    new_parent_obj = old_cat.find(function(new_parent_obj) { return new_parent_obj.id === element.parent})
                    new_parent_obj = new_parent_obj === undefined ? { id: null, title: null } : new_parent_obj;
                    //text = element.title + "-i </hr> naxkin_parent@: ID: " + old_parent_obj.id + " title:" + old_parent_obj.title + " nor_parent@: ID: " + new_parent_obj.id + " title:" + new_parent_obj.title;

                    //this.openConfirm("treeChenge", { element: element, old:old_parent_obj, new: new_parent_obj})

                    chenges = [ ...chenges, { element: element, old:old_parent_obj, new: new_parent_obj }];
                
                }
            })
            this.openConfirm("treeChenge", chenges)
        }
        
    }

    printCategoryTree(categoryId, level="", selected) {
        const { classes } = this.props;
        let category_data = this.props.category.data;
        let response_data = [];
        for(let {id, title, parent, slug, image, desc} of category_data) {
            if(id != selected){
                if(parent == categoryId) {
                    response_data.push(
                        <MenuItem key={id} classes={{ root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} value={id}>
                            <span style={{ color: "#AAAAAA"}}>{level + " "}</span>{" " + title}
                        </MenuItem>)
                    response_data.push(this.printCategoryTree(id, (level + " └─── "), selected))
                }
            }
        }
        return response_data
    }

    render() {
        const { classes } = this.props;

        let tb_data = []
        if(typeof this.props.category.data !== 'undefined' && this.props.category.data.length > 0) {
            
            tb_data = this.props.category.data.map(item => [
                item.id,
                <div className={classes.imgContainer}>
                    <img src={API_URL + 'image/' + item.image} alt={item.title} className={classes.img} />
                </div>, 
                item.title, 
                item.slug,  
                item.parent,  
                    [
                        { color: "infoNoBackground", icon: Info, action: "info"},
                        { color: "successNoBackground", icon: Edit, action: "edit" },
                        { color: "dangerNoBackground", icon: Close, action: "delete" }
                    ].map((prop, key) => {
                            return (
                            <Button color={prop.color} customClass={classes.actionButton} key={key} onClick={() => this.openConfirm(prop.action, item)}>
                                <prop.icon className={classes.icon} />
                            </Button>
                            );
                        }
                    ) 
                ])
        }
        
        return(
                <div>
                    <NavPills
                        color="warning"
                        alignCenter
                        tabs={[
                            {
                                tabButton: lang.table,
                                tabIcon: ViewList,
                                tabContent: (
                                            <IconCard
                                                icon={Assignment}
                                                iconColor="rose"
                                                content={
                                                <Table
                                                    tableHead={[
                                                        lang.id,
                                                        lang.image,
                                                        lang.title,
                                                        lang.slug,
                                                        lang.parent,
                                                        lang.actions,
                                                    ]}
                                                    tableData={
                                                        tb_data
                                                    }
                                                    // customCellClasses={[
                                                    //     classes.center,
                                                    //     classes.right,
                                                    //     classes.right
                                                    // ]}
                                                    // customClassesForCells={[0, 4, 5]}
                                                    // customHeadCellClasses={[
                                                    //     classes.center,
                                                    //     classes.right,
                                                    //     classes.right
                                                    // ]}
                                                    // customHeadClassesForCells={[0, 4, 5]}
                                                />
                                                }
                                            />
                                            )
                                    
                            },
                            {
                                tabButton: lang.tree,
                                tabIcon: LowPriority,
                                tabContent: (
                                    <div style={{ height: 1000, textAlign: "right" }}>
                                        <Button 
                                            onClick={() => this.callRevertTree(this.state.treeData)}
                                            color="success"
                                        >
                                            {lang.save}
                                        </Button>
                                        <Button
                                            onClick={() => this.setState({ treeData: null })}
                                            color="danger"
                                        >
                                            {lang.cancel}
                                        </Button>
                                        <SortableTree
                                            treeData={this.state.treeData === null ? this.getCategoryTree() : this.state.treeData}
                                            onChange={treeData => this.setState({ treeData })}
                                        />
                                        
                                    </div>
                                )
                            },
                            {
                                tabButton: lang.add,
                                tabIcon: PlaylistAdd,
                                tabContent: (<AddCategory />)
                            },
                            {
                                tabButton: lang.remove,
                                tabIcon: DeleteSweep,
                                tabContent: (
                                    <RegularCard
                                        cardTitle="Help center"
                                        cardSubtitle="More information here"
                                        content={
                                            <span>
                                            From the seamless transition of glass and metal to the
                                            streamlined profile, every detail was carefully
                                            considered to enhance your experience. So while its
                                            display is larger, the phone feels just right.
                                            <br />
                                            <br />
                                            Another Text. The first thing you notice when you hold
                                            the phone is how great it feels in your hand. The
                                            cover glass curves down around the sides to meet the
                                            anodized aluminum enclosure in a remarkable,
                                            simplified design.
                                            </span>
                                        }
                                    />
                                )
                            }
                        ]}
                    />
                    <Dialog
                        classes={{
                            root: classes.center,
                            paper: classes.modal
                        }}
                        open={this.state.modal}
                        transition={Transition}
                        keepMounted
                        onClose={() => this.handleCloseModal()}
                        aria-labelledby="classic-modal-slide-title"
                        aria-describedby="classic-modal-slide-description"
                    >
                        <DialogTitle
                            id="classic-modal-slide-title"
                            disableTypography
                            className={classes.modalHeader}
                        >
                            <h4 className={classes.modalTitle}>{"ID:"}{this.state.id}{" - "}{this.state.title}</h4>
                        </DialogTitle>

                        <DialogContent
                            id="classic-modal-slide-description"
                            className={classes.modalBody}
                        >
                            <input type="text" style={{display: "none"}} value={this.state.id} id="id" />
                            <CustomInput
                                id="title"
                                error={this.state.error}
                                success={this.state.success}
                                labelText={lang.title}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    style: {minWidth: "500px"},
                                    value: this.state.title,
                                    onChange: (e) => {
                                        this.setState({ title: e.target.value }); 
                                        e.target.value != "" ? this.setState({ success: true }) : this.setState({ success: null });
                                        e.target.value != "" ? this.setState({ error: null }) : this.setState({ success: true });
                                    }
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
                                    style: {minWidth: "500px"},
                                    value: this.state.desc,
                                    onChange: (e) => {
                                        this.setState({ desc: e.target.value }); 
                                    }
                                }}
                            />

                            <FormControl fullWidth className={classes.selectFormControl}>

                                <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                                    {lang.parent}
                                </InputLabel>

                                <Select
                                    value={this.state.parent_dinamic}
                                    onChange={(e)=>this.setState({parent_dinamic: e.target.value})}
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    classes={{
                                        select: classes.select
                                    }}
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

                                    {this.printCategoryTree(null,"",this.state.id)}

                                </Select>

                            </FormControl>

                        </DialogContent>

                        <DialogActions className={classes.modalFooter}>
                            <Button 
                                onClick={() => this.handleSubmitModal()}
                                color="successNoBackground"
                            >
                                {lang.save}
                            </Button>
                            <Button
                                onClick={() => this.handleCloseModal()}
                                color="dangerNoBackground"
                            >
                                {lang.cancel}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        category: state.Category.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
      CategoryActions: bindActionCreators(CategoryActions, dispatch),
      AlertActions: bindActionCreators(AlertActions, dispatch)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(extendedTablesStyle,notificationsStyle)(Categories));