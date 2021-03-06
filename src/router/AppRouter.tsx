import React, { lazy, Suspense } from 'react';
import awsconfig from '../aws-exports';
import Amplify, { API } from 'aws-amplify';
import AWS from 'aws-sdk';
import { config } from '../config';
import '../styles/styles.min.css';
import { Header } from '../components/Header';
import { BlogPage } from '../components/BlogPage';
import { CreateBlog } from '../components/CreateBlog';
import { Dashboard } from '../components/Dashboard';
import { Home } from '../components/Home';
import history from '../utils/history';
import { Route, Router, Switch }  from 'react-router-dom';
import { User } from '../types/TypeDefs';
import { CreateEntry } from '../components/CreateEntry';
import { Footer } from '../components/Footer';
import { MyBlogsPage } from '../components/MyBlogsPage';
import { ScrollToTop } from '../components/ScrollToTop';
import { Spinner } from '../components/Spinner';

const Contact = lazy(() => import("../components/Contact"));
const Partners = lazy(() => import("../components/Partners"));

Amplify.configure(awsconfig);
API.configure(awsconfig);

AWS.config.region = config.REGION;

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.IDENTITY_POOL_ID
});

interface IAppState {
  user: User | undefined
}

export default class AppRouter extends React.Component<{},IAppState>{

  constructor(props:any){
    super(props);

    this.state = {
      user: undefined
    }
      
    this.setUser = this.setUser.bind(this);
  }

  // private authService: AuthService = new AuthService();
  // private dataService: DataService = new DataService();

  private setUser(user:User|undefined){
    
    this.setState({
      user
    });
      
  }

  render(){
    return (
        <div className='main-container'>
          <Router history={history}>
            <div>
              <ScrollToTop />
              <Header user={this.state.user} setUser={this.setUser} />
              <div className='page-container'>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path="/createblog"
                        render={(props) => (
                            <CreateBlog {...props} currentUser={this.state.user}/>
                        )} 
                  />
                  <Route exact path="/createentry"
                        render={(props) => (
                            <CreateEntry {...props} currentUser={this.state.user}/>
                        )} 
                  />
                  <Route exact path="/myblogs"
                        render={(props) => <MyBlogsPage {...props} user={this.state.user} />} 
                  />
                  <Route exact path="/blog/:id" component={BlogPage} />
                  <Route exact path="/partners" 
                        render={() => 
                    <Suspense fallback={<Spinner />}>
                      <Partners />
                    </Suspense>} 
                  />
                  <Route exact path="/contactus" render={() => 
                    <Suspense fallback={<Spinner />}>
                      <Contact />
                    </Suspense>}
                  />
                </Switch>
              </div>
              <Footer />
            </div>
          </Router>
        </div>
    )
  }
}