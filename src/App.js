/** @format */
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Location from "./location";
import Contact from "./contact";
import { Helmet } from 'react-helmet-async';
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import {
  ShoppingCart,
  Printer,
  BookOpen,
  Gift,
  Mail,
  Phone,
  FileQuestion,
  Image,
  Flower,
  Sticker,
  Facebook,
  Instagram,
  Send,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import OurWork from "./ourworks";
import Openions from "./openions";
import Team from "./team";
import Cart from "./cart";
import AddProduct from "./addProducts";
import Products from "./prodcts";
import { CartContext } from "./cartContextAPI";
import ProductManagement from "./AdminProductsManagement";
const App = () => {
  const [show, setShow] = useState(false); //Spinner for loading
  const startCartValue =
    localStorage.getItem("cart") ?
      JSON.parse(localStorage.getItem("cart"))
    : [];
  const [cartItems, setCartItems] = useState(startCartValue);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const [sellectedCategory, setSellectedCategory] = useState("الكل");
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Helmet>
        <title>مكتبة الكرم | الصفحة الرئيسية - قرطاسية وأدوات مكتبية</title>
        <meta name="description" content="أهلاً بكم في مكتبة الكرم، وجهتكم الأولى لأفضل أنواع القرطاسية والأدوات المكتبية والهندسية في العراق." />
      </Helmet>
      <div dir='rtl' className='bg-light'>
        {/* Navbar */}
        <Navbar bg='white' expand='lg' className='shadow-sm sticky-top py-3'>
          <Container>
            <Nav>
              <img
                style={{ width: "50px", height: "auto", borderRadius: "50%" }}
                alt='logo'
                src='/logo.png'
              />
            </Nav>
            <Navbar.Brand href='#' className='fw-bold text-primary fs-3'>
              مكتبة الكرم
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto me-4 fw-medium'>
                <Nav.Link href='#hero' className='mx-2'>
                  الرئيسية
                </Nav.Link>
                <Nav.Link href='#products' className='mx-2'>
                  المنتجات
                </Nav.Link>
                <Nav.Link href='#services' className='mx-2'>
                  الخدمات
                </Nav.Link>
                <Nav.Link href='#works' className='mx-2'>
                  اعمالنا
                </Nav.Link>
                <Nav.Link href='#location' className='mx-2'>
                  موقعنا
                </Nav.Link>
                <Nav.Link href='#openions' className='mx-2'>
                  آراء الزبائن
                </Nav.Link>
                <Nav.Link href='#contact' className='mx-2'>
                  تواصل
                </Nav.Link>
              </Nav>
              <Button
                onClick={() => {
                  setShow(true);
                }}
                variant='outline-primary'
                className='rounded-pill px-4 d-flex align-items-center gap-2'>
                <ShoppingCart size={18} /> السلة
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Hero Section */}
        <section
          id='hero'
          className='bg-primary text-white py-5 position-relative overflow-hidden'
          style={{ backgroundImage: "url(/background.jpeg)" }}>
          <Container
            className='py-5 text-center position-relative'
            style={{ zIndex: 2 }}>
            <h1
              className='display-3 fw-bold mb-4'
              style={{
                color: "rgba(32, 32, 36, 0.86)",
                textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)", // ظل أبيض خلف النص الغامق
              }}>
              أناقة الورق.. إبداعٌ لا ينتهي
            </h1>
            <p
              className='lead mb-5 px-3 py-2 d-inline-block rounded-3'
              style={{
                color: "#fff",
                backgroundColor: "rgba(0, 0, 0, 0.4)", // طبقة سوداء شفافة خلف النص فقط
                backdropFilter: "blur(8px)", // تأثير الغباش العصري
                fontWeight: "500",
              }}>
              في مكتبة الكرم، نؤمن أن كل فكرة عظيمة تبدأ بصفحة بيضاء وقلم أنيق.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Nav.Link
                style={{ background: "white", width: "200px" }}
                variant='light'
                size='lg'
                href='#products'
                className='px-5 py-3 fw-bold text-primary rounded-pill shadow-lg'>
                تسوق الآن
              </Nav.Link>
            </div>
          </Container>
        </section>

        {/* Products Section */}
        <Products
          sellectedCategory={sellectedCategory}
          setSellectedCategory={setSellectedCategory}
        />
        {/* Services Section */}
        <div id='services' className='bg-white py-5'>
          <Container>
            <h2 className='text-center fw-bold mb-5 italic'>
              خدماتنا المكتبية
            </h2>
            <Row className='text-center'>
              <ServiceCard
                icon={<Printer size={48} />}
                title='الطباعة الحرارية'
                desc='نحول تصاميمك المبتكرة إلى واقع على أرقى أنواع الدفاتر والمنسوجات.'
              />
              <ServiceCard
                icon={<BookOpen size={48} />}
                title='تجليد الكتب'
                desc='خدمات تجليد فاخرة للحفاظ على كتبك ودفاترك المفضلة بلمسة فنية.'
              />
              <ServiceCard
                icon={<Gift size={48} />}
                title='تجهيز الهدايا'
                desc='نصمم ونغلف هداياكم المكتبية بشكل يعبر عن ذوقكم الرفيع.'
              />
              <ServiceCard
                icon={<FileQuestion size={48} />}
                title='طباعة الأسئلة الامتحانية'
                desc='نوفر عليك عناء الكتابة و الطباعة و نطبعلك الاسئلة بأبهى حلة'
              />
              <ServiceCard
                icon={<Image size={48} />}
                title='انشاء بوسترات'
                desc='بوسترات بدقة عالية تعبر عنك و عن خدماتك بكل احترافية و بمقاسات متنوعة'
              />
              <ServiceCard
                icon={<Flower size={48} />}
                title='تجيهز بوكيهات ورد'
                desc='ورداتك راح تحجي بمكانك و تعبر عن مشاعرك بجمالها'
              />
              <ServiceCard
                icon={<Sticker size={48} />}
                title='طباعة ستيكرات'
                desc='ستيكرات متنوعة و باشكال مختلفة حسب طلبك'
              />
            </Row>
          </Container>
        </div>
        {/* our works */}
        <div id='works'>
          <OurWork />
        </div>
        {/* our location */}
        <div id='location'>
          <Location />
        </div>
        {/* our openions */}
        <div id='openions'>
          <Openions />
        </div>
        {/* contact us */}
        <div id='contact'>
          <Contact />
        </div>
        {/* our team */}
        <Team />
        {/* cart */}
        <Cart show={show} handleClose={() => setShow(false)} />
        {/* Footer */}
        <footer
          style={{ width: "100vw" }}
          className='bg-dark text-white pt-5 pb-3'>
          <Container>
            <Row className='mb-4'>
              <Col md={6}>
                <h3 className='fw-bold mb-3'>مكتبة الكرم</h3>
                <p className='text-secondary w-75'>
                  المكان الأمثل لعشاق القرطاسية وهواة الكتابة الراقية في العراق.
                </p>
              </Col>
              <Col md={6} className='text-md-start'>
                <div className='d-flex flex-column gap-2 mt-4 mt-md-0'>
                  <div className='d-flex align-items-center gap-2 justify-content-md-end'>
                    <Phone size={18} /> 07761813139
                  </div>
                  <div className='d-flex align-items-center gap-2 justify-content-md-end'>
                    <Mail size={18} /> mktbtalkrm65@gmail.com
                  </div>
                </div>
              </Col>
            </Row>

            <hr className='border-secondary' />
            <div className='d-flex flex-column align-items-center justify-content-center w-100 text-center'>
              {/* السطر الأول: الحقوق والبرمجة */}
              <div className='mb-3'>
                <div className='text-secondary small mt-1'>
                  تمت البرمجة بواسطة{" "}
                  <span className='text-white fw-bold'>زيد حازم الطائي</span>
                </div>
              </div>

              {/* السطر الثاني: أيقونات التواصل الاجتماعي */}
              <div className='d-flex gap-3 justify-content-center'>
                <a
                  href='https://www.facebook.com/share/1Cxf95fEtq/'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <Facebook size={20} />
                </a>
                <a
                  href='https://www.instagram.com/zaidaltai5?igsh=ZGoxZ3ExY3hkY3Z0'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <Instagram size={20} />
                </a>
                <a
                  href='https://www.linkedin.com/in/zaid-altai-563972381/'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <Linkedin size={20} />
                </a>
                <a
                  href='https://wa.me/96407870020515'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <MessageCircle size={20} />
                </a>
                <a
                  href='https://t.me/zaid_5z'
                  target='_blank'
                  rel='noreferrer'
                  className='text-secondary hover-white'>
                  <Send size={20} />
                </a>
              </div>
            </div>
               <div className='d-flex flex-column align-items-center justify-content-center w-100 text-center'>
                <p className='text-secondary small mb-0'>
                  © {new Date().getFullYear()} جميع الحقوق محفوظة لمكتبة الكرم
                </p>
                </div>
          </Container>

          {/* تنسيق بسيط لتحويل اللون عند تمرير الماوس */}
          <style>
            {`
          .hover-white:hover {
            color: white !important;
            transition: 0.3s;
          }
        `}
          </style>
        </footer>

        {/* Custom Styles for Hover Effect */}
        <style>{`
        .transition { transition: all 0.3s ease; }
        .hover-shadow:hover { transform: translateY(-10px); box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important; }
      `}</style>
      </div>
    </CartContext.Provider>
  );
};

const ServiceCard = ({ icon, title, desc }) => (
  <Col md={4} className='mb-4'>
    <div className='p-4 rounded-4 border-0 h-100 transition hover-shadow bg-light'>
      <div className='text-primary mb-3'>{icon}</div>
      <h4 className='fw-bold'>{title}</h4>
      <p className='text-muted'>{desc}</p>
    </div>
  </Col>
);

export default App;
