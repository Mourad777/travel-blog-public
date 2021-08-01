import React, { useEffect, useState } from "react";
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import { BrowserRouter, withRouter } from "react-router-dom";
import Home from './pages/Main/Home'
import { Switch, Route } from "react-router-dom";
import { getWindowSizeInteger } from "./pages/utility";
import _ from "lodash";
import Loader from "./pages/Main/Loader";

const Post = React.lazy(() => import("./pages/Posts/Post"));
// const Category = React.lazy(() => import("./pages/Category/Category"));
// const Photo = React.lazy(() => import("./pages/Photos/Photo"));
const Video = React.lazy(() => import("./pages/Videos/Video"));

const ScrollToTop = withRouter(({ history }) => {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);

    return (null);
})

const App = () => {
    // console.log('process.env.PUBLIC_URL',process.env.PUBLIC_URL)
    const [winSize, setWinSize] = useState(getWindowSizeInteger(window.innerWidth));
    const [scrollWidth, setScrollWidth] = useState(getWindowSizeInteger(window.innerWidth));
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
       window.addEventListener("resize", _.throttle(getWindowSize, 200), { passive: true });
    }, []);

    const getWindowSize = () => {
        const windowSizeWidthInt = getWindowSizeInteger(window.innerWidth);
        const windowSizeHeight = window.innerHeight;
        setScrollWidth(window.innerWidth);
        setHeight(windowSizeHeight)
        setWinSize(windowSizeWidthInt);
    };

    return (
        <BrowserRouter>
            <ScrollToTop />
            <React.Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/post/:postId">
                        <Post winSize={winSize} />
                    </Route>
                    {/* <Route path="/destination/:country">
                        <Category winSize={winSize} height={height} />
                    </Route>
                    <Route path="/category/:categoryId">
                        <Category winSize={winSize} />
                    </Route>
                    <Route path="/photo/:photoId">
                        <Photo winSize={winSize} />
                    </Route>
                    <Route path="/video/:videoId">
                        <Video winSize={winSize} />
                    </Route> */}
                    <Route path="/">
                     
                        <Home winSize={winSize} scrollWidth={scrollWidth} height={height} />
                    </Route>
                </Switch>
            </React.Suspense>
        </BrowserRouter>
    );
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
