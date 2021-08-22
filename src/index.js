import React, { createContext, useEffect, useState } from "react";
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom";
import { BrowserRouter, withRouter } from "react-router-dom";
import Home from './pages/Main/Home'
import { Switch, Route } from "react-router-dom";
import { getWindowSizeInteger } from "./pages/utility";
import _ from "lodash";
import Loader from "./components/Loader/Loader";
import './bootstrap.min.css'

export const BlogContext = createContext({});

const Post = React.lazy(() => import("./pages/Posts/Post"));
const Category = React.lazy(() => import("./pages/Category/Category"));
const Photo = React.lazy(() => import("./pages/Photos/Photo"));
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

    const [winSize, setWinSize] = useState(getWindowSizeInteger(window.innerWidth));
    const [scrollWidth, setScrollWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [initialDataPercentage, setInitialDataPercentage] = useState(0);
    const [lastViewedSection, setLastViewedSection] = useState(null);

    const [selectedPostsPage, setSelectedPostsPage] = useState(0);
    const [selectedPhotosPage, setSelectedPhotosPage] = useState(0);
    const [selectedVideosPage, setSelectedVideosPage] = useState(0);


    useEffect(() => {
        if (initialDataPercentage === 100) {
            setIsPageLoaded(true)
        }
    }, [initialDataPercentage])


    const handlePageLoad = () => {
        // setTimeout(() => {
        //     setIsPageLoaded(true)
        // }, 10000)
    }

    useEffect(() => {
        window.addEventListener('load', handlePageLoad)
        // window.addEventListener('load',()=>setIsPageLoaded(false))
        console.log('isPageLoaded', isPageLoaded)

        window.addEventListener("resize", _.throttle(getWindowSize, 200), { passive: true });
        return () => {
            window.removeEventListener("resize", getWindowSize)
        }
    }, []);

    const getWindowSize = () => {
        const windowSizeWidthInt = getWindowSizeInteger(window.innerWidth);
        const windowSizeHeight = window.innerHeight;
        setScrollWidth(window.innerWidth);
        setHeight(windowSizeHeight)
        setWinSize(windowSizeWidthInt);
    };

    const SuspenseFallback = () => (
        <div style={{ height: '100vh', width: '100%', background: 'black', position: 'fixed' }}>
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%)' }}>
                <Loader />
            </div>
        </div>
    )

    return (
        <BrowserRouter>
            {/* <ScrollToTop /> */}
            <React.Suspense fallback={<SuspenseFallback />}>
                <BlogContext.Provider
                    value={{
                        winSize,
                        height,
                        scrollWidth,
                        selectedPostsPage,
                        setSelectedPostsPage,
                        selectedPhotosPage,
                        setSelectedPhotosPage,
                        selectedVideosPage,
                        setSelectedVideosPage,
                        isPageLoaded,
                        lastViewedSection,
                        setLastViewedSection,
                        initialDataPercentage,
                        setInitialDataPercentage,
                    }}
                >

                    <Switch>
                        {/*key necessary so component remounts when parameter changes*/}
                        <Route path="/post/:postId" render={(props) => (
                            <Post key={props.match.params.postId} {...props} winSize={winSize} />)
                        } />
                        <Route path="/destination/:country">
                            <Category winSize={winSize} height={height} />
                        </Route>
                        <Route path="/category/:categoryId">
                            <Category winSize={winSize} />
                        </Route>
                        <Route path="/photo/:photoId">
                            <Photo winSize={winSize} />
                        </Route>
                        <Route path="/video/:videoId" render={(props) => (
                            <Video key={props.match.params.videoId} {...props} winSize={winSize} />)
                        } />
                        <Route path="/">
                            <Home
                                setInitialDataPercentage={setInitialDataPercentage}
                                initialDataPercentage={initialDataPercentage}
                                isPageLoaded={isPageLoaded}
                                setIsPageLoaded={setIsPageLoaded}
                                winSize={winSize}
                                scrollWidth={scrollWidth}
                                height={height}
                                setLastViewedSection={setLastViewedSection}
                                lastViewedSection={lastViewedSection}
                            />
                        </Route>
                    </Switch>
                </BlogContext.Provider>
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

//////////////////




// // TodoPage.js
// export const TodoContext = createContext({});

// class TodoPage extends React.Component {
//     state = {
//         todos: [
//             { id: 1, desc: 'Check email', completed: false },
//             { id: 2, desc: 'Write blog post', completed: false },
//         ],
//         user: { name: 'John', canDelete: true },
//     };

//     handleDelete = todo => {
//         const todos = this.state.todos.filter(t => t.id !== todo.id);
//         this.setState({ todos });
//     };

//     render() {
//         const { todos, user } = this.state;
//         return (
//             <TodoContext.Provider
//                 value={{ canDelete: user.canDelete, onDelete: this.handleDelete }}
//             >
//                 <div>
//                     <TodoList todos={todos} />
//                 </div>
//             </TodoContext.Provider>
//         );
//     }
// }


// // TodoList.js
// const TodoList = ({ todos }) => {
//     return (
//         <div>
//             <Title value="Todo List" />
//             <div>
//                 {todos.map(todo => (
//                     <TodoItem key={todo.id} todo={todo} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// TodoList.propTypes = {
//     todos: PropTypes.array,
// };


// // TodoItem.js
// const TodoItem = ({ todo }) => {
//     return (
//         <TodoContext.Consumer>
//             {({ onDelete, canDelete }) => (
//                 <div>
//                     <div>{todo.desc}</div>
//                     <div>
//                         <button disabled={!canDelete} onClick={() => onDelete(todo)} />
//                     </div>
//                 </div>
//             )}
//         </TodoContext.Consumer>
//     );
// };

// TodoItem.propTypes = {
//     todo: PropTypes.object,
// };