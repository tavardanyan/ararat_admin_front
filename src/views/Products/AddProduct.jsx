import React from "react";
import { Redirect } from "react-router-dom";
import randomstring from 'randomstring';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OptionsActions from 'redux/actions/options';
import * as AlertActions from 'redux/actions/alert';
import * as ProductActions from 'redux/actions/product';

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";

import Step1 from "./AddProductSteps/step1.jsx";
import Step2 from "./AddProductSteps/step2.jsx";
import Step3 from "./AddProductSteps/step3.jsx";
import Step4 from "./AddProductSteps/step4.jsx";
import Step5 from "./AddProductSteps/step5.jsx";

import { lang, API_URL } from "config.js";


const PRODUCT = {
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
    sku: randomstring.generate({ length: 3, charset: 'alphabetic', capitalization: "uppercase"}) + randomstring.generate({ length: 9, charset: 'numeric'}),
    specific: null,
    tags: null,
}


class WizardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new: false
        }
        this.addProduct = this.addProduct.bind(this);
    }

    componentDidMount() {
        this.props.ProductActions.storeNewProduct(PRODUCT);
        this.props.ProductActions.checkSKU(PRODUCT.sku);
        
    }

    addProduct() {
        // add action here on action we must clean store
        this.props.ProductActions.addProduct(this.props.product.new_product);
        this.setState({new: true});
    }

    render() {
        if(this.state.new) {
            return <Redirect to={'/product/' + this.props.product.new_product.sku} />
        }
        return (
            <GridContainer justify="center">
                <ItemGrid xs={12} sm={8}>
                    <Wizard
                        validate
                        steps={[
                            { stepName: lang.shop.step1, stepComponent: Step1, stepId: "main", stepUpdate: { name: '', sku: '', category: '' }  },
                            { stepName: lang.shop.step2, stepComponent: Step2, stepId: "price" },
                            { stepName: lang.shop.step3, stepComponent: Step3, stepId: "attribute" },
                            { stepName: lang.shop.step4, stepComponent: Step4, stepId: "size" },
                            { stepName: lang.shop.step5, stepComponent: Step5, stepId: "more" }
                        ]}
                        title={lang.shop.title}
                        subtitle={lang.shop.subtitle}
                        previousButtonText={lang.shop.prev}
                        nextButtonText={lang.shop.next}
                        finishButtonText={lang.shop.finish}
                        finishButtonClick={() => this.addProduct()}
                    />
                </ItemGrid>
            </GridContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(WizardView);
