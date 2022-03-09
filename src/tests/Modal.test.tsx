import { render, screen } from "@testing-library/react";
import Modal from '../components/Modal';
import { AuthService } from "../controllers/AuthService/AuthService";
//import { User } from '../types/TypeDefs';
import user from "@testing-library/user-event";

let modalOpen: boolean = true;

const mockSubmission = jest.fn();

const mockClearModal = jest.fn(); 

const authService = new AuthService();

it("test if modal is open and rendering elements", () => {
  render(
    <Modal
      modalOpen={modalOpen}
      onSubmission={mockSubmission}
      clearModal={mockClearModal}
      authService={authService}
    />
  );

  expect(screen.getByText(/Sign in details/i)).toBeInTheDocument();
  expect(screen.queryByText(/Registeration details/i)).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Enter" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  expect(
    screen.getByText(/If you are not a member please register/i)
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  
});

it("test registration modal is rendering after register button is pressed", () => {
  render(
    <Modal
      modalOpen={modalOpen}
      onSubmission={mockSubmission}
      clearModal={mockClearModal}
      authService={authService}
    />
  );

  const registerButton = screen.getByRole("button", { name: "Register" });

  user.click(registerButton);

  expect(screen.queryByText(/Sign in details/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Registration details/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Enter" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  expect(
    screen.queryByText(/If you are not a member please register/i)
  ).not.toBeInTheDocument();
  
});

it("should render error message if Email field is missing", () => {
    render(
        <Modal
          modalOpen={modalOpen}
          onSubmission={mockSubmission}
          clearModal={mockClearModal}
          authService={authService}
        />
    );

    const passwordInput = screen.getByTestId('password');

    user.type(passwordInput, 'testing123');

    const submitButton = screen.getByRole('button', { name: 'Enter'});

    user.click(submitButton);

    expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

})

it("should render error message if Password field is missing", () => {
    render(
        <Modal
          modalOpen={modalOpen}
          onSubmission={mockSubmission}
          clearModal={mockClearModal}
          authService={authService}
        />
    );

    const passwordInput = screen.getByTestId('useremail');

    user.type(passwordInput, 'testing123');

    const submitButton = screen.getByRole('button', { name: 'Enter'});

    user.click(submitButton);

    expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

})

it("should submit and trigger mockSubmission if no fields are missing", () => {
    render(
        <Modal
          modalOpen={modalOpen}
          onSubmission={mockSubmission}
          clearModal={mockClearModal}
          authService={authService}
        />
    );

    const passwordInput = screen.getByTestId('password');

    user.type(passwordInput, 'testing123');

    const emailInput = screen.getByTestId('useremail')

    user.type(emailInput, 'testing123@gmail.com');

    const submitButton = screen.getByRole('button', { name: 'Enter'});

    user.click(submitButton);

    expect(mockSubmission).toHaveBeenCalledWith({
      username: '',
      email: 'testing123@gmail.com',
      password: 'testing123'
    });

})


it("should render registration modal upon register button click", () => {
  render(
      <Modal
        modalOpen={modalOpen}
        onSubmission={mockSubmission}
        clearModal={mockClearModal}
        authService={authService}
      />
  );

  const registerButton = screen.getByRole('button', { name: 'Register' });

  user.click(registerButton);

  expect(screen.getByText(/Registration details/i)).toBeInTheDocument();

});

it("should render error message if username field is missing on register", () => {
  render(
      <Modal
        modalOpen={modalOpen}
        onSubmission={mockSubmission}
        clearModal={mockClearModal}
        authService={authService}
      />
  );

  const registerButton = screen.getByRole('button', { name: 'Register' });

  user.click(registerButton);

  const passwordInput = screen.getByTestId('password');

  user.type(passwordInput, 'testing123');

  const emailInput = screen.getByTestId('useremail')

  user.type(emailInput, 'testing123@gmail.com');

  const submitButton = screen.getByRole('button', { name: 'Enter' });

  user.click(submitButton);

  expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

})

it("should submit and trigger mockSubmission if no registration fields are missing", () => {
  render(
      <Modal
        modalOpen={modalOpen}
        onSubmission={mockSubmission}
        clearModal={mockClearModal}
        authService={authService}
      />
  );

  const registerButton = screen.getByRole('button', { name: 'Register' });

  user.click(registerButton);

  const usernameInput = screen.getByTestId('username');

  user.type(usernameInput, 'registerUser123');

  const passwordInput = screen.getByTestId('password');

  user.type(passwordInput, 'testing123');

  const emailInput = screen.getByTestId('useremail')

  user.type(emailInput, 'testing123@gmail.com');

  const submitButton = screen.getByRole('button', { name: 'Enter'});

  user.click(submitButton);

  expect(mockSubmission).toHaveBeenCalledWith({
    username: 'registerUser123',
    email: 'testing123@gmail.com',
    password: 'testing123'
  });

})


// test("take a snapshot of the container", () => {
//   const { container } = render(
//     <Modal
//       modalOpen={modalOpen}
//       onSubmission={mockSubmission}
//       clearModal={mockClearModal}
//     />
//   );
//   expect(container).toMatchInlineSnapshot(`<div />`);
// });
