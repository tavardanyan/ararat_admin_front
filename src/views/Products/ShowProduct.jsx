import React from "react";

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OptionsActions from 'redux/actions/options';
import * as AlertActions from 'redux/actions/alert';
import * as ProductActions from 'redux/actions/product';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import ImagePriceCard from 'components/Cards/ImagePriceCard.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import HeaderCard from "components/Cards/HeaderCard.jsx";

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import Tooltip from "material-ui/Tooltip";

// @material-ui/icons
import ArtTrack from '@material-ui/icons/ArtTrack';
import Refresh from '@material-ui/icons/Refresh';
import Edit from '@material-ui/icons/Edit';
import Place from "@material-ui/icons/Place";

import { lang, API_URL } from "config.js";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import priceImage1 from "assets/img/card-2.jpeg";


const PRODUCT = {
    id: null,
    available: null,
    box_weight: null,
    box_size: null,
    brend: null,
    country: null,
    category: null,
    color: null,
    count: null,
    count_in_box: null,
    count_in_pack: null,
    count_reserve: null,
    desc: null,
    file: null,
    material: null,
    model: null,
    name: null,
    pack_size: null,
    pack_weight: null,
    piece_size: null,
    piece_weight: null,
    price1: null,
    price2: null,
    price3: null,
    sku: null,
    specific: null,
    tags: null,
}


class ShowProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.product
        }
    }

    componentWillMount() {
        this.props.ProductActions.getProduct({ by: 'sku', value: this.props.match.params.sku })
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps.product})
        console.log(nextProps.product)
        console.log(this.state)
    }

    componentDidUpdate() {
        this.props.ProductActions.getProduct({ by: 'sku', value: this.props.match.params.sku })
    }

    render() {

        const { classes } = this.props;

        return (
            <GridContainer justify="center">
                <ItemGrid xs={12} sm={8}>
                    
                <HeaderCard
                    cardTitle={"ID:" + this.state.id }
                    headerColor="rose"
                    content={"jghjkh"}
                />
                // <Button onClick={() => console.log(this.state)}></Button>
                </ItemGrid>
            </GridContainer>
        );
    }
}

function mapStateToProps (state) {
    return {
        product: state.Product.product,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ProductActions: bindActionCreators(ProductActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(ShowProduct));
