/** @format */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Form,
} from "react-bootstrap";
import { X, ShoppingCart } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebaseConfig";

const AllProductsModal = ({ show, handleClose, setCartItems, setShowToast, setPName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const getProducts = () => {
    const productsRef = ref(db, "products");
    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setProducts(productList);
        } else {
          setProducts([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("خطأ في جلب البيانات:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  };
  useEffect(() => {
    getProducts();
  }, []);
  const searchedData = products.filter((element) => {
    return element.title.includes(search);
  });
  const dataToView = search === "" ? products : searchedData;
  if (loading) {
    return (
      <div className='text-center py-5'>
        <Spinner animation='border' variant='dark' />
        <p className='mt-2 text-secondary'>جاري تحميل منتجات مكتبة الكرم...</p>
      </div>
    );
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      fullscreen={true} // هذا الخيار يجعل الدايالوج يغطي كامل الشاشة
      scrollable={true}
      style={{ direction: "rtl" }}>
      {/* الرأس (Header) ثابت في الأعلى */}
      <Modal.Header
        style={{ justifyContent: "space-around" }}
        className='border-bottom shadow-sm px-4 py-3 bg-white sticky-top'>
        <ShoppingCart className='text-primary' />
        <Modal.Title className='fw-bold d-flex align-items-center gap-2'>
          جميع منتجات المكتبة
        </Modal.Title>
        <Button
          variant='light'
          className='rounded-circle p-2 shadow-sm'
          onClick={handleClose}>
          <X size={28} />
        </Button>
      </Modal.Header>
      <Form.Control
        type='text'
        placeholder='ابحث عن كتاب، قلم، أو حقيبة...'
        className='border-0 py-3 shadow-none text-end'
        style={{
          fontSize: "1rem",
          direction: "rtl",
          outline: "none",
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Modal.Body className='bg-light py-5'>
        <Container>
          <Row className='g-4'>
            {dataToView.map((product) => (
              <Col key={product.id} xs={6} md={4} lg={3}>
                <Card className='h-100 border-0 shadow-sm hover-shadow transition'>
                  <div className='position-relative'>
                    <Card.Img
                      variant='top'
                      src={product.imageUrl}
                      className='object-fit-cover'
                      style={{ height: "200px" }}
                    />
                    <Badge
                      bg='dark'
                      className='position-absolute top-0 end-0 m-2 opacity-75'>
                      {product.category}
                    </Badge>
                  </div>
                  <Card.Body className='d-flex flex-column'>
                    <Card.Title className='fw-bold fs-6 mb-1 text-truncate'>
                      {product.title}
                    </Card.Title>
                    <Card.Text className='text-primary fw-bold mb-3'>
                      {Number(product.price).toLocaleString()} دينار
                    </Card.Text>

                    <Button
                      onClick={() => {
                        const nowCart = localStorage.getItem("cart");
                        const cart = nowCart ? JSON.parse(nowCart) : [];
                        const exists = cart.some((e) => e.id === product.id);

                        let newCart;
                        if (exists) {
                          newCart = cart.map((el) =>
                            el.id === product.id ?
                              { ...el, count: el.count + 1 }
                            : el,
                          );
                        } else {
                          newCart = [...cart, { ...product, count: 1 }];
                        }
                        setCartItems(newCart);
                        setPName(product.title)
                        setShowToast(true)
                      }}
                      variant='primary'
                      className='w-100 rounded-pill mt-auto fw-bold'>
                      أضف للسلة
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AllProductsModal;
