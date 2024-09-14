import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            {new Date().getFullYear()} © OPA.
                        </Col>
                        <Col sm={6}>
                            <div className="  text-sm-end d-none d-sm-block" style={{ fontWeight: '500' }}>
                                Portal managed by UMA Network Ltd.
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;