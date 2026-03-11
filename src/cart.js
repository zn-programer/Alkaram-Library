/** @format */
import React, { useContext, useState } from "react";
import { Modal, Button, ListGroup, Image, Form } from "react-bootstrap";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  User,
  Phone,
  MapPin,
} from "lucide-react";
import { CartContext } from "./cartContextAPI";

const Cart = ({ show, handleClose }) => {
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const { cartItems, setCartItems } = useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const sendToTelegramBot = async () => {
    // التحقق من ملء البيانات قبل الإرسال
    if (!info.name || !info.phone || !info.address) {
      alert("يرجى ملء كافة معلومات التوصيل أولاً.");
      return;
    }

    const botToken = "8755376682:AAEcF3mdEFakfI51QSqQxgu1jr9P8eYH2EM";
    const chatId = "1573741391";

    // تنسيق الرسالة لتشمل بيانات الزبون
    const message =
      `🔔 *طلب جديد من مكتبة الكرم*\n` +
      `--------------------------\n` +
      `👤 *الزبون:* ${info.name}\n` +
      `📞 *الهاتف:* ${info.phone}\n` +
      `📍 *العنوان:* ${info.address}\n` +
      `--------------------------\n` +
      `📦 *المنتجات:*\n` +
      cartItems
        .map(
          (item) =>
            `• ${item.title} (x${item.count}) - ${item.price * item.count}د.ع`,
        )
        .join("\n") +
      `\n\n💰 *المجموع الكلي: ${total.toLocaleString()} د.ع*`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });
      alert("تم إرسال طلبك بنجاح! سنتواصل معك قريباً.");
      handleClose();
    } catch (error) {
      console.error("خطأ في الإرسال:", error);
      alert("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <Modal
      style={{ direction: "rtl" }}
      show={show}
      onHide={handleClose}
      centered
      size='md'
      className='cart-modal'>
      <Modal.Header className='border-0 pb-0'>
        <Modal.Title className='fw-bold d-flex align-items-center gap-2'>
          <ShoppingBag size={24} className='text-primary' />
          سلة المشتريات
        </Modal.Title>
        <Button variant='link' className='text-dark p-0' onClick={handleClose}>
          <X size={24} />
        </Button>
      </Modal.Header>

      <Modal.Body className='py-4'>
        {cartItems?.length > 0 ?
          <>
            <ListGroup variant='flush' className='mb-4'>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className='d-flex align-items-center gap-3 px-0 py-3 border-bottom'>
                  <Image
                    src={item.imageUrl}
                    rounded
                    className='object-fit-cover'
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div className='flex-grow-1'>
                    <h6 className='fw-bold mb-1 text-dark'>{item.title}</h6>
                    <span className='text-secondary small'>
                      {item.price * item.count} د.ع
                    </span>
                  </div>
                  {/* أزرار التحكم بالكمية */}
                  <div className='d-flex align-items-center bg-light rounded-pill px-2'>
                    <Button
                      onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart"));
                        const newCart = cart.map((element) => {
                          if (element.id === item.id) {
                            return {
                              ...element,
                              count:
                                element.count === 1 ? 1 : element.count - 1,
                            };
                          }
                          return element;
                        });
                        setCartItems(newCart);
                      }}
                      variant='link'
                      className='text-dark p-1'>
                      <Minus size={14} />
                    </Button>
                    <span className='mx-2 fw-bold' style={{ fontSize: "14px" }}>
                      {item.count}
                    </span>
                    <Button
                      onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart"));
                        const newCart = cart.map((element) => {
                          if (element.id === item.id) {
                            return {
                              ...element,
                              count: element.count + 1,
                            };
                          }
                          return element;
                        });
                        setCartItems(newCart);
                      }}
                      variant='link'
                      className='text-dark p-1'>
                      <Plus size={14} />
                    </Button>
                  </div>
                  <Button
                    onClick={() => {
                      const newCart = cartItems.filter((element) => {
                        return element.id !== item.id;
                      });
                      setCartItems(newCart);
                    }}
                    variant='link'
                    className='text-danger p-1 ms-2'>
                    <Trash2 size={18} />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <span className='fw-bold text-secondary'>المجموع الكلي:</span>
              <span className='fw-bold fs-5 text-dark'>
                {total.toLocaleString()} د.ع
              </span>
            </div>
            {/* معلومات التوصيل */}
            <div className='bg-light p-3 rounded-4 mb-3'>
              <h6 className='fw-bold mb-3 text-dark border-bottom pb-2'>
                معلومات التوصيل
              </h6>
              <Form.Group className='mb-2'>
                <div className='d-flex align-items-center gap-2 mb-1 small fw-bold text-secondary'>
                  <User size={14} /> الاسم الكامل
                </div>
                <Form.Control
                  type='text'
                  placeholder='مثال: زيد علي'
                  className='rounded-3 border-0 shadow-sm px-3 py-2'
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <div className='d-flex align-items-center gap-2 mb-1 small fw-bold text-secondary'>
                  <Phone size={14} /> رقم الهاتف
                </div>
                <Form.Control
                  type='tel'
                  placeholder='07XXXXXXXXX'
                  className='rounded-3 border-0 shadow-sm px-3 py-2 text-start'
                  value={info.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                />
              </Form.Group>

              <Form.Group className='mb-0'>
                <div className='d-flex align-items-center gap-2 mb-1 small fw-bold text-secondary'>
                  <MapPin size={14} /> العنوان بالتفصيل
                </div>
                <Form.Control
                  type='text'
                  placeholder='المنطقة، المعلم القريب...'
                  className='rounded-3 border-0 shadow-sm px-3 py-2'
                  value={info.address}
                  onChange={(e) =>
                    setInfo({ ...info, address: e.target.value })
                  }
                />
              </Form.Group>
            </div>
          </>
        : <div className='text-center py-5'>
            <ShoppingBag size={48} className='text-light mb-3' />
            <p className='text-secondary'>السلة فارغة حالياً</p>
          </div>
        }

        {/* المجموع والزر */}
        <div className='mt-4 pt-3 border-top'>
          <Button
            onClick={sendToTelegramBot}
            variant='dark'
            className='w-100 py-3 rounded-pill fw-bold shadow-lg d-flex align-items-center justify-content-center gap-2'
            disabled={cartItems?.length === 0}>
            إتمام الطلب الآن
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Cart;
