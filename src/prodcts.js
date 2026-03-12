/** @format */
import { Helmet } from "react-helmet-async";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import ListOverlay from "./listOverlay";
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useContext } from "react";
import { CartContext } from "./cartContextAPI";
import AllProductsModal from "./allProducts";
import ProductManagement from "./AdminProductsManagement";
import AddToCartToast from "./addToCartToast";
export default function Products({ sellectedCategory, setSellectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [pName, setPName] = useState(""); //product name for toast

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
          if (sellectedCategory === "الكل") {
            setProducts(productList);
          } else {
            const dataWithCategory = productList.filter((element) => {
              return element.category === sellectedCategory;
            });
            setProducts(dataWithCategory);
          }
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
  }, [sellectedCategory]);

  const { setCartItems } = useContext(CartContext);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const handleCloseAllProducts = () => {
    setShowAllProducts(false);
  };
  if (loading) {
    return (
      <div className='text-center py-5'>
        <Spinner animation='border' variant='dark' />
        <p className='mt-2 text-secondary'>جاري تحميل منتجات مكتبة الكرم...</p>
      </div>
    );
  } else {
    return (
      <Container
        id='products'
        className='py-5'
        style={{ direction: "rtl", width: "100vw" }}>
        <Helmet>
          <title>{`منتجات  - مكتبة الكرم`}</title>
          <meta
            name='description'
            content={`اشتري الآن  بأفضل الأسعار من مكتبة الكرم. توصيل سريع لكل محافظات العراق.`}
          />
        </Helmet>
        <div className='d-flex align-items-center mb-5 border-end border-primary border-4 pe-3'>
          <ListOverlay
            sellectedCategory={sellectedCategory}
            setSellectedCategory={setSellectedCategory}
            getProducts={getProducts}
          />{" "}
        </div>
        <Row className='flex-nowrap overflow-auto pb-3'>
          {products.map((product) => (
            <Col
              key={product.id}
              xs={8}
              md={6}
              lg={3} // جعل الكارت يأخذ مساحة أكبر في السكرول الأفقي للموبايل
              className='mb-4 px-2 flex-shrink-0'>
              <Card className='h-100 border-0 shadow-sm hover-shadow transition'>
                <Card.Img
                  variant='top'
                  src={product.imageUrl}
                  className='object-fit-cover'
                  style={{ height: "220px" }}
                />
                <Card.Body>
                  <Badge bg='primary-subtle' text='primary' className='mb-2'>
                    {product.category}
                  </Badge>
                  <Card.Title className='fw-bold fs-6 text-truncate'>
                    {product.title}
                  </Card.Title>
                  <Card.Text className='text-primary fw-bold fs-5'>
                    {product.price} دينار
                  </Card.Text>
                  <Button
                    onClick={() => {
                      const nowCart = localStorage.getItem("cart");
                      const cart = nowCart ? JSON.parse(nowCart) : [];
                      const exists = cart.some((e) => e.id === product.id);
                      if (exists) {
                        const newCart = cart.map((element) => {
                          if (element.id === product.id) {
                            return { ...element, count: element.count + 1 };
                          }
                          return element;
                        });
                        setCartItems(newCart);
                      } else {
                        const newCart = [...cart, { ...product, count: 1 }];
                        setCartItems(newCart);
                      }
                      setPName(product.title);
                      setShowToast(true);
                    }}
                    variant='outline-dark'
                    className='w-100 rounded-pill mt-2 btn-sm'>
                    أضف للسلة
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* all product component */}
        <AllProductsModal
          products={products}
          setCartItems={setCartItems}
          show={showAllProducts}
          handleClose={handleCloseAllProducts}
          setShowToast={setShowToast}
          setPName={setPName}
        />
        {/* زر إظهار المزيد */}

        <div className='text-center mt-4'>
          <Button
            variant='dark'
            className='rounded-pill px-5 shadow-sm'
            onClick={() => setShowAllProducts(true)}>
            إظهار جميع المنتجات
          </Button>
        </div>
        {/* Add To Cart Toast */}
        <AddToCartToast
          show={showToast}
          setShow={setShowToast}
          productName={pName}
        />
        {/* Admin products management */}

        {/* <ProductManagement products={products} /> */}
      </Container>
    );
  }
}
