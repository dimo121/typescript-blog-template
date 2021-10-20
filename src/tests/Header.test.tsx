import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { AuthService } from '../services/AuthService/AuthService';
import { User } from '../types/TypeDefs';
import { Router } from 'react-router-dom';
import history from '../utils/history';


const authService = new AuthService();

function setUser(user:User|undefined){
    
  console.log('Logged in user is: ', user?.username);
};


test('renders header title React.JS blog', () => {

  render(<Router history={history}>
    <Header setUser={setUser} authService={authService}/>
    </Router>);
  const linkElement = screen.getByText(/React.JS blog/i);
  expect(linkElement).toBeInTheDocument();

});


test('should take a snapshot of the header', () => {
  const { container } = render(<Router history={history}>
    <Header setUser={setUser} authService={authService}/>
    </Router>);

  expect(container).toMatchSnapshot();
})

test('should render hamburger for mobile interface only', () => {
    
    render(<Router history={history}>
            <Header setUser={setUser} authService={authService}/>
          </Router>);

    global.innerWidth = 520;
    global.innerHeight = 750;
    global.dispatchEvent(new Event('resize'));


    expect(window.innerWidth).toEqual(520);
    expect(window.innerHeight).toEqual(750);
    
    expect(screen.getByTestId('hamburger')).toBeInTheDocument();
    //expect(button).toHaveAttribute('class','nav-toggle');
    //still renders with display : none
})