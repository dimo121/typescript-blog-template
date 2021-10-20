import { render, screen } from "@testing-library/react";
import { ModalComponent } from "../components/Modal";
//import { User } from '../types/TypeDefs';
import user from "@testing-library/user-event";

let modalOpen: boolean = true;

const mockSubmission = () => {
  console.log("form submitted");
};

const mockClearModal = () => {
  modalOpen = false;
};

it("test if modal is open and rendering elements", () => {
  render(
    <ModalComponent
      modalOpen={modalOpen}
      onSubmission={mockSubmission}
      clearModal={mockClearModal}
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
  //screen.debug();
});

it("test registration modal is rendering after register button is pressed", () => {
  render(
    <ModalComponent
      modalOpen={modalOpen}
      onSubmission={mockSubmission}
      clearModal={mockClearModal}
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
        <ModalComponent
          modalOpen={modalOpen}
          onSubmission={mockSubmission}
          clearModal={mockClearModal}
        />
    );

    const passwordInput = screen.getByTestId('password');

    user.type(passwordInput, 'testing123');

    const submitButton = screen.getByRole('button', { name: 'Enter'});

    user.click(submitButton);

    expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

    //screen.debug();
})

it("should render error message if Password field is missing", () => {
    render(
        <ModalComponent
          modalOpen={modalOpen}
          onSubmission={mockSubmission}
          clearModal={mockClearModal}
        />
    );

    const passwordInput = screen.getByTestId('useremail');

    user.type(passwordInput, 'testing123');

    const submitButton = screen.getByRole('button', { name: 'Enter'});

    user.click(submitButton);

    expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

    //screen.debug();
})

it("should not render error message if no fields is missing", () => {
    render(
        <ModalComponent
          modalOpen={modalOpen}
          onSubmission={mockSubmission}
          clearModal={mockClearModal}
        />
    );

    const passwordInput = screen.getByTestId('useremail');

    user.type(passwordInput, 'testing123');

    const submitButton = screen.getByRole('button', { name: 'Enter'});

    user.click(submitButton);

    expect(screen.getByText(/All fields are required/i)).toBeInTheDocument();

    //screen.debug();
})

test("should take a snapshot of the container", () => {
  const { container } = render(
    <ModalComponent
      modalOpen={modalOpen}
      onSubmission={mockSubmission}
      clearModal={mockClearModal}
    />
  );
  expect(container).toMatchInlineSnapshot(`<div />`);
});
