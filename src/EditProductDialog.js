/** @format */
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import {
  Save,
  X,
  Edit3,
  DollarSign,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { db } from "./firebaseConfig";
import { ref, update } from "firebase/database";

const EditProductModal = ({ show, handleClose, sellectedId, products }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
  });

  const categories = [
    "اقلام",
    "دفاتر",
    "كتب دراسية",
    "مطارات",
    "الكترونيات",
    "ملازم",
    "هدايا",
    "قرطاسية",
  ];
  // تأثير جانبي: بمجرد تغير الـ ID، نبحث عن المنتج ونملأ الفورم
  useEffect(() => {
    if (sellectedId && products) {
      const productToEdit = products.find((p) => p.id === sellectedId);
      if (productToEdit) {
        setFormData({
          title: productToEdit.title,
          price: productToEdit.price,
          imageUrl: productToEdit.imageUrl,
          category: productToEdit.category,
        });
      }
    }
  }, [sellectedId, products]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productRef = ref(db, `products/${sellectedId}`);
      await update(productRef, {
        ...formData,
        price: Number(formData.price),
        lastEdit: new Date().toISOString(),
      });

      alert("تم تحديث المنتج بنجاح! ✅");
      handleClose(); // إغلاق الدايالوج بعد النجاح
    } catch (error) {
      console.error("خطأ في التحديث:", error);
      alert("فشل التحديث، حاول مجدداً.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='lg'
      style={{ direction: "rtl" }}>
      <Modal.Header className='bg-primary text-white border-0'>
        <Modal.Title className='fw-bold d-flex align-items-center gap-2'>
          <Edit3 size={22} />
          تعديل بيانات المنتج
        </Modal.Title>
        <Button variant='link' className='text-white p-0' onClick={handleClose}>
          <X size={24} />
        </Button>
      </Modal.Header>

      <Modal.Body className='p-4'>
        <Form onSubmit={handleUpdate}>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>
              <Tag size={16} className='me-1' /> اسم المنتج
            </Form.Label>
            <Form.Control
              type='text'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className='py-2 border-2'
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label className='fw-bold'>
                  <DollarSign size={16} className='me-1' /> السعر الجديد
                </Form.Label>
                <Form.Control
                  type='number'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                  className='py-2 border-2'
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label className='fw-bold'>التصنيف</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className='py-2 border-2'>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className='mb-4'>
            <Form.Label className='fw-bold'>
              <ImageIcon size={16} className='me-1' /> رابط الصورة
            </Form.Label>
            <Form.Control
              type='url'
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              required
              className='py-2 border-2'
            />
          </Form.Group>

          <div className='d-flex gap-2 mt-4'>
            <Button
              variant='primary'
              type='submit'
              className='w-100 py-2 fw-bold rounded-pill shadow-sm'>
              <Save size={18} className='me-2' /> حفظ التغييرات
            </Button>
            <Button
              variant='light'
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

export default EditProductModal;
