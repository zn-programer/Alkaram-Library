/** @format */

import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import { Navbar, Nav, Container } from "react-bootstrap";
function ListOverlay({ sellectedCategory, setSellectedCategory, getProducts }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <Overlay target={target.current} show={show} placement='left'>
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: "absolute",
              color: "white",
              borderRadius: 3,
              zIndex: "10",
              ...props.style,
            }}>
            <Navbar
              bg='white'
              expand='lg'
              className='shadow-sm sticky-top py-3'>
              <Container>
                <Nav
                  className='ms-auto me-4 fw-medium text-center'>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "اقلام" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("اقلام");
                    }}
                    className='mx-2 text-dark'>
                    اقلام
                  </Nav>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "دفاتر" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("دفاتر");
                    }}
                    className='mx-2 text-dark'>
                    دفاتر
                  </Nav>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "كتب دراسية" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("كتب دراسية");
                    }}
                    className='mx-2 text-dark'>
                    كتب دراسية
                  </Nav>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "مطارات" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("مطارات");
                    }}
                    className='mx-2 text-dark'>
                    مطارات
                  </Nav>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "الكترونيات" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("الكترونيات");
                    }}
                    className='mx-2 text-dark'>
                    الكترونيات
                  </Nav>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "ملازم" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("ملازم");
                    }}
                    className='mx-2 text-dark'>
                    ملازم
                  </Nav>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "هدايا" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("هدايا");
                    }}
                    className='mx-2 text-dark'>
                    هدايا
                  </Nav>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "قرطاسية" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("قرطاسية");
                    }}
                    className='mx-2 text-dark'>
                    قرطاسية
                  </Nav>
                  <Nav
                    style={{
                      ...listItemStyle,
                      background:
                        sellectedCategory === "الكل" ?
                          "rgba(60, 128, 237, 0.45)"
                        : "rgb(226, 220, 220)",
                    }}
                    onClick={() => {
                      setSellectedCategory("الكل");
                    }}
                    className='mx-2 text-dark'>
                    الكل
                  </Nav>
                </Nav>
              </Container>
            </Navbar>
          </div>
        )}
      </Overlay>
      <Button
        style={{
          border: "solid rgb(59, 56, 56) 3px",
          borderRadius: "10px",
          fontWeight: "bolder",
        }}
        variant='white'
        ref={target}
        onClick={() => setShow(!show)}>
        الاقسام
        <img
          style={{
            width: "30px",
            height: "auto",
            margin: "10px",
            borderRadius: "30%",
          }}
          alt='arrow'
          src='/arrow.png'
        />
      </Button>
    </>
  );
}

const listItemStyle = {
  background: "rgb(226, 220, 220)",
  padding: "8px",
  color: "white",
  borderRadius: "10px",
  fontWeight: "bolder",
  width: "95px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};
export default ListOverlay;
