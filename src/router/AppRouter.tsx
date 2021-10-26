
import React, { lazy, Suspense } from 'react';
import '../styles/styles.css';
import Header from '../components/Header';
import BlogPage from '../components/BlogPage';
import CreateBlog from '../components/CreateBlog';
import Dashboard from '../components/Dashboard';
import Home from '../components/Home';
import history from '../utils/history';
import { Route, Router, Switch }  from 'react-router-dom';
import { User } from '../types/TypeDefs';
import { AuthService } from '../services/AuthService/AuthService';
import { DataService } from '../services/DataService/DataService';
import { CreateEntry } from '../components/CreateEntry';
import { Footer } from '../components/Footer';
import { MyBlogsPage } from '../components/MyBlogsPage';
import { ScrollToTop } from '../components/ScrollToTop';
import { Partners } from '../components/Partners';

const Contact = lazy(() => import("../components/Contact"));


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

  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();



  private setUser(user:User|undefined){
    
    this.setState({
      user
    });
      
    console.log('Logged in user is: ', user?.username);
  };

  render(){
    return (
        <div className='main-container'>
          <Router history={history}>
            <div>
              <ScrollToTop />
              <Header user={this.state.user} setUser={this.setUser} authService={this.authService}/>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/dashboard' 
                        render={(props) => (
                          <Dashboard {...props} dataService={this.dataService} />
                        )} 
                />
                <Route exact path="/createblog"
                      render={(props) => (
                          <CreateBlog {...props} dataService={this.dataService} user={this.state.user}/>
                      )} 
                />
                <Route exact path="/createentry"
                      render={(props) => (
                          <CreateEntry {...props} dataService={this.dataService} user={this.state.user}/>
                      )} 
                />
                <Route exact path="/myblogs"
                      render={(props) => <MyBlogsPage {...props} dataService={this.dataService} user={this.state.user} />} 
                />
                <Route exact path="/blog/:id" 
                      render={(props) => <BlogPage {...props} dataService={this.dataService}/>}
                />
                <Route exact path="/partners" component={Partners} />
                <Route exact path="/contactus" render={() => (
                  <Suspense fallback={
                    <div className="page-container">
                      <h1 style={{fontSize : '1em', color:'white', padding:'4em',marginTop:'0'}}>Loading...</h1>
                    </div>} >
                    <Contact />
                  </Suspense>
                )}
                />
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
    )
  }
}
