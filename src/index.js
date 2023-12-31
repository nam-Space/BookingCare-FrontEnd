import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.scss";

import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";

import "react-image-lightbox/style.css";

import "react-markdown-editor-lite/lib/index.css";

import "react-loading-skeleton/dist/skeleton.css";

import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";

import { Provider } from "react-redux";
import reduxStore, { persistor } from "./redux";
import CustomScrollbars from "./components/CustomScrollbars";

const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <IntlProviderWrapper>
                {/* <CustomScrollbars style={{ width: "100%", height: "100vh" }}> */}
                <App persistor={persistor} />
                {/* </CustomScrollbars> */}
            </IntlProviderWrapper>
        </Provider>,
        document.getElementById("root")
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
