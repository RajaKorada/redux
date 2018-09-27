import React, { Component } from 'react';
import {fetchDefaultData} from './State/actions/sessions';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import BrandHpeStack from 'grommet/components/icons/base/BrandHpeStack';
import Spinning from 'grommet/components/icons/Spinning'
import Layer from 'grommet/components/Layer';
import Home from './SizingEngineUI/SizingEngineCommonScreens/Home';
import Build from './SizingEngineUI/SizingEngineCommonScreens/Build';
import {appUrl} from './AppConfig';
import Beforeunload from'react-beforeunload/lib/Beforeunload';

import LoginScr from './SizingEngineUI/UsherScreens/LoginForm';
import RegistrationScr from './SizingEngineUI/UsherScreens/RegistrationForm';
import ResetPasswordScr from './SizingEngineUI/UsherScreens/ResetPassword';
import ForgotPasswordScr from './SizingEngineUI/UsherScreens/ForgotPassword';
import ValidateUserScr from './SizingEngineUI/UsherScreens/ValidateUser';

import createBrowserHistory from 'history/createBrowserHistory';

// var globalVariableForCount=0;
const history = createBrowserHistory();

class MyApp extends Component {

  constructor(){
    super();
    this.state={ MainFooter: true , isLoading:true};
    this.reloadListener();
  }

  componentDidMount()
  {
      this.props.fetchDefaultData();
  }

  reloadListener() {
    if (window.performance) {
      if (performance.navigation.type == 1) {
         window.location.href=appUrl;
      } else {
      }
    }
  }

  render() {
    var DefInputs = this.props.DefaultInputs;
    if(DefInputs === undefined){
      DefInputs = {};
    }else{
      this.state.isLoading=false;
    }

    var layer = '';
    if(this.props.isLoading){
      layer = <Layer style={{zIndex:'500 !important'}}>
                <Box direction='row' style={{padding: '40px'}} size='medium' pad={{'between':'small'}}>
                     <Spinning size='small'/>
                     <Heading tag='h5' margin='none'>{this.props.LoadingMsg}</Heading>
                </Box>
              </Layer>
    }

    return (
      <Beforeunload onBeforeunload={() => "You'll loose your data!"}>
    <App centered={false}>
      <Box id="everything" className="everything" > 
        <Box id="content" >
          <Box id="header" className="header"></Box>
          {layer}
          {/*    <Header colorIndex="neutral-1" className="HeaderPart" fixed={false} style={{width:'100% !import',borderBottom: '1px solid rgb(66, 85, 99)'}}>
                <Box pad="none" margin="none" direction="row" style={{width:'100%'}}>
                    <Box basis="1/4" pad="small" className="Logo">
                       <BrandHpeStack size='xlarge'  type='logo'/>
                    </Box>
                    <Box basis="3/4" pad="small">
                      <Headline align="start" margin="small" size="small" strong={true}>
                        {DefInputs["SizerCaption"]}
                      </Headline>
                    </Box>
                </Box>
          </Header> */}

          <Router>
              <Switch>
                <Route exact={true} path='/' component={Home} history={history} />
                <Route path='/Login' component={LoginScr} history={history} />  
                <Route path='/Registration' component={RegistrationScr} history={history} />
                <Route path='/ResetPassword' component={ResetPasswordScr} history={history} />
                <Route path='/ForgotPassword' component={ForgotPasswordScr} history={history} />
                <Route path='/ValidateUser' component={ValidateUserScr} history={history} />

                <Route path='/Home' component={Home} history={history} />
                <Route path='/Build' component={Build} history={history} />              
                <Route component={Home} />
                {/*
                  <Route path='/ExampleConfig/' component={ExampleConfigPlaceHolder} history={history} />
                  <Route path='/LoadWorkload' component={LoadWorkload} />
                */}
              </Switch>
          </Router>
          <Box id="footer" className="footer"></Box>
        </Box>
      </Box>
    </App>
    </Beforeunload>
    );
  }
}

 const mapStateToProps = (state) => {
  return{
      DefaultInputs: state.sessions.sessionDefaults.inputs.Sizers,
      isLoading: state.sessions.isLoading,
      LoadingMsg: state.sessions.LoadingMsg,
  }
 };

 const mapDispatchToProps = (dispatch) => {
    return {
      fetchDefaultData:() =>{
        dispatch(fetchDefaultData());
      }
    };
 };

export default connect(mapStateToProps,mapDispatchToProps)(MyApp);
