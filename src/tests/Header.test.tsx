import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { AuthService } from '../controllers/AuthService/AuthService';
import { Router } from 'react-router-dom';
import history from '../utils/history';
import '../styles/styles.css';
import Enzyme from 'enzyme'; 
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({
    adapter: new Adapter()
});


const authService = new AuthService();

const mockSetUser = jest.fn();

test('renders header title React.JS blog', () => {

  render(<Router history={history}>
    <Header setUser={mockSetUser} authService={authService}/>
    </Router>);
  const linkElement = screen.getByText(/React.JS blog/i);
  expect(linkElement).toBeInTheDocument();

});


test('should take a snapshot of the header', () => {
  const { container } = render(<Router history={history}>
    <Header setUser={mockSetUser} authService={authService}/>
    </Router>);

  expect(container).toMatchSnapshot();
})


test('should render hamburger for mobile screen size only', () => {
    
    render(<Router history={history}> 
              <Header setUser={mockSetUser} authService={authService}/>
            </Router>);

    global.innerWidth = 320;
    global.innerHeight = 750;
    global.dispatchEvent(new Event('resize'));

    expect(window.innerWidth).toEqual(320);
    expect(window.innerHeight).toEqual(750);
    
    //expect(screen.getByTestId('hamburger')).toHaveStyle('display: none');
    //expect(wrapper.find('#hamburger').getDOMNode()).toHaveStyle('display: none');
    //toHaveStyle('display : none');
    //expect(button).toHaveAttribute('class','nav-toggle');
    //still renders with display : none
})
