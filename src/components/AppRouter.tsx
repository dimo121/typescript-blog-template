
import React from 'react';
import '../styles/styles.css';
import Header from './Header';
import BlogPage from './BlogPage';
import CreateBlog from './CreateBlog';
import Dashboard from './Dashboard';
import Home from './Home';
import history from '../utils/history';
import { Route, Router,Switch }  from 'react-router-dom';
import { User } from '../types/TypeDefs';
import { AuthService } from '../services/AuthService';
import { DataService } from '../services/DataService';
import { CreateEntry } from './CreateEntry';
import { Footer } from './Footer';
import { MyBlogsPage } from './MyBlogsPage';
import ScrollToTop from './ScrollToTop';
import Partners from './Partners';




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
                      render={(props) => <MyBlogsPage {...props} dataService={this.dataService} />} 
                />
                <Route exact path="/blog/:id" 
                      render={(props) => <BlogPage {...props} dataService={this.dataService}/>}
                />
                <Route exact path="/partners" component={Partners} />
              </Switch>
              <Footer />
            </div>
          </Router>
        </div>
    )
  }
}
