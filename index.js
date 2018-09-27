import React from 'react';
import ReactDOM from 'react-dom';
import store from './State/store';
import {Provider} from 'react-redux'; 
import $ from 'jquery';

import './scss/index.scss';

import App from './MyApp';

const element = document.getElementById('Bodycontent');

const render = () =>{
ReactDOM.render(
  
   <Provider store={store}>
    <App />
   </Provider> , element);
};

   store.subscribe(render);
   
   render();

document.body.classList.remove('loading');

 $(window).on("navigate", function (event) {
     event.preventDefault();
     window.history.forward(1);

});