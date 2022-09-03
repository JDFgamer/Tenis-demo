import { useEffect } from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DataPicker from '../../components/DataPicker/DataPicker';
import Login from '../../components/Login/ModalLogin'
import SingUp from '../../components/SingUp/ModalSingUp'
import Account from '../../components/Account/ModalAccount'
import getToken from '../../hook/verifyToken'
import './style.css'

function NavScrollExample() {
  const [userLogin, setUserLogin] = useState(false)
  const [validateGoogle, setValidateGoogle] = useState(false)
  let token = getToken();
  useEffect(() => {
    if (window.localStorage.getItem('login')) {
      setUserLogin(true)
      setValidateGoogle(token.userGoogle)
      return
    }
  }, [userLogin])

  function handleCloseAccount() {
    window.localStorage.clear();
    setUserLogin(false)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Tennis-demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div className='nav-contain'>
              {!userLogin ?
                <>
                  <Nav.Link>
                    <Login setUserLogin={setUserLogin} />
                  </Nav.Link>
                  <Nav.Link href="#action2">
                    <SingUp setUserLogin={setUserLogin} />
                  </Nav.Link>
                </>
                : <>
                  <Nav.Link onClick={handleCloseAccount}>
                    Salir de la cuenta
                  </Nav.Link>
                  {!validateGoogle ?
                    <Nav.Link>
                      <Account setUserLogin={setUserLogin} />
                    </Nav.Link>
                    : <></>
                  }

                </>
              }

              <NavDropdown title="Filtro" id="navbarScrollingDropdown">
                <DataPicker />
              </NavDropdown>
              {token?.admin ?
                <Nav.Link href="/admin">
                  Admin
                </Nav.Link>
                :
                <></>}

            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;