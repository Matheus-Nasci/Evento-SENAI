import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/home/index';
import Login from './pages/login/index';
import Eventos from './pages/eventos/index';

function Router() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/eventos" component={Eventos}/>
        </BrowserRouter>
    )
}

export default Router;