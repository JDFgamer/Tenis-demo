import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CreateCourt from '../../../../components/CreateCourt/ModalCreateCourt';

function NavBar() {

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Admin</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#CreateCourt"><CreateCourt /></Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavBar;