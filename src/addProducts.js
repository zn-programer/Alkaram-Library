/** @format */
import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { PackagePlus, Image as ImageIcon, Tag, DollarSign, X } from "lucide-react";
import { db } from "./firebaseConfig";
import { ref, push, set } from "firebase/database";

const AddProduct = ({ show, handleClose }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "اقلام",
  });

  const categories = [
    "اقلام", "دفاتر", "كتب دراسية", "مطارات", 
    "الكترونيات", "ملازم", "هدايا", "قرطاسية"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productsRef = ref(db, "products");
      const newProductRef = push(productsRef);

      await set(newProductRef, {
        ...product,
        price: Number(product.price),
        createdAt: new Date().toISOString(),
      });

      alert("تم إضافة المنتج بنجاح إلى مكتبة الكرم!");
      setProduct({ title: "", price: "", imageUrl: "", category: "اقلام" });
      handleClose(); // إغلاق الدايالوج تلقائياً بعد الإضافة الناجحة
    } catch (error) {
      console.error("خطأ في الإضافة:", error);
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      size="lg" 
      backdrop="static" // يمنع الإغلاق عند الضغط خارج الدايالوج لضمان عدم ضياع البيانات
      style={{ direction: "rtl" }}
    >
      {/* رأس الدايالوج بتصميم عصري */}
      <Modal.Header className="bg-dark text-white border-0 px-4 py-3">
        <Modal.Title className="d-flex align-items-center gap-2 fw-bold">
          <PackagePlus size={24} />
          إضافة منتج جديد للمكتبة
        </Modal.Title>
        <Button variant="link" className="text-white p-0 border-0" onClick={handleClose}>
          <X size={28} />
        </Button>
      </Modal.Header>

      <Modal.Body className="p-4 p-md-5 bg-white">
        <Form onSubmit={handleSubmit}>
          {/* خانة اسم المنتج */}
          <Form.Group className='mb-4'>
            <Form.Label className='fw-bold text-dark d-flex align-items-center gap-2'>
              <Tag size={18} className="text-primary" /> اسم المنتج
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='مثال: دفتر ملاحظات سلك'
              className='py-3 border-2 shadow-none focus-primary'
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              required
            />
          </Form.Group>

          <Row>
            {/* خانة السعر */}
            <Col md={6}>
              <Form.Group className='mb-4'>
                <Form.Label className='fw-bold text-dark d-flex align-items-center gap-2'>
                  <DollarSign size={18} className="text-primary" /> السعر (د.ع)
                </Form.Label>
                <Form.Control
                  type='number'
                  placeholder='5000'
                  className='py-3 border-2 shadow-none'
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>

            {/* قائمة التصنيفات */}
            <Col md={6}>
              <Form.Group className='mb-4'>
                <Form.Label className='fw-bold text-dark d-flex align-items-center gap-2'>
                  <PackagePlus size={18} className="text-primary" /> التصنيف
                </Form.Label>
                <Form.Select
                  className='py-3 border-2 shadow-none cursor-pointer'
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* خانة رابط الصورة */}
          <Form.Group className='mb-5'>
            <Form.Label className='fw-bold text-dark d-flex align-items-center gap-2'>
              <ImageIcon size={18} className="text-primary" /> رابط الصورة (Direct Link)
            </Form.Label>
            <Form.Control
              type='url'
              placeholder='https://i.ibb.co/...'
              className='py-3 border-2 shadow-none'
              value={product.imageUrl}
              onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
              required
            />
            <Form.Text className='text-muted small'>
              تأكد من استخدام الرابط المباشر لتظهر الصورة في المتجر.
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              variant='dark'
              type='submit'
              className='w-100 py-3 rounded-pill fw-bold shadow-lg transition-all'>
              حفظ المنتج الآن
            </Button>
            <Button
              variant='outline-secondary'
              onClick={handleClose}
              className='px-4 rounded-pill'>
              إلغاء
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProduct;