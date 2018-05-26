import { pages } from "./local/pages.jsx";
import { countries } from "./local/countries.jsx";

const lang = pages.ru;

const API_URL = 'http://46.229.213.136:3003/api/';

const pricing = {
    currency: "$",
    price2Dif: -10,
    price3Dif: -15,
}

export { lang, API_URL, pricing, countries }