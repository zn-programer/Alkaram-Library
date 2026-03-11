/** @format */
import React, { useState } from "react";
import {
  Modal,
  Table,
  Button,
  Form,
  InputGroup,
  Image,
  Badge,
  Container,
} from "react-bootstrap";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { db } from "./firebaseConfig";
import { ref, remove } from "firebase/database";
import AddProduct from "./addProducts";
import EditProductModal from "./EditProductDialog";

const ProductManagement = ({ handleClose, products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. فلترة المنتجات للبحث
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 2. دالة الحذف
  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج نهائياً؟")) {
      remove(ref(db, `products/${id}`))
        .then(() => alert("تم الحذف بنجاح"))
        .catch((err) => console.error("خطأ بالحذف:", err));
    }
  };
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [sellectedIdToEdit, setSellectedIdToEdit] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
  };
  
  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
  };
  return (
    <Modal
      show={true}
      onHide={handleClose}
      fullscreen={true}
      scrollable
      style={{ direction: "rtl" }}>
      {/* Add product */}
      <AddProduct show={showAddProduct} handleClose={handleCloseAddProduct} />
      <Modal.Header className='bg-dark text-white border-0 px-4'>
        <Modal.Title className='fw-bold'>إدارة مخزن مكتبة الكرم</Modal.Title>
      </Modal.Header>

      <Modal.Body className='bg-light'>
        <Container py={4}>
          {/* شريط البحث والأدوات */}
          <div className='d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3'>
            <InputGroup
              className='shadow-sm rounded-pill overflow-hidden bg-white'
              style={{ maxWidth: "400px" }}>
              <InputGroup.Text className='bg-white border-0 ps-3'>
                <Search size={18} className='text-secondary' />
              </InputGroup.Text>
              <Form.Control
                placeholder='ابحث عن منتج ...'
                className='border-0 shadow-none text-end'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <Button
              onClick={() => {
                setShowAddProduct(true);
              }}
              variant='primary'
              className='rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2'>
              <Plus size={20} /> إضافة منتج جديد
            </Button>
          </div>

          {/* جدول المنتجات */}
          <div className='bg-white rounded-4 shadow-sm overflow-hidden'>
            <Table hover responsive className='mb-0 align-middle'>
              <thead className='bg-light'>
                <tr>
                  <th className='border-0 py-3 ps-4'>المنتج</th>
                  <th className='border-0 py-3'>الفئة</th>
                  <th className='border-0 py-3'>السعر</th>
                  <th className='border-0 py-3 text-center'>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className='ps-4'>
                      <div className='d-flex align-items-center gap-3'>
                        <Image
                          src={product.imageUrl}
                          rounded
                          className='object-fit-cover'
                          style={{ width: "45px", height: "45px" }}
                        />
                        <span className='fw-bold text-dark'>
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Badge
                        bg='info-subtle'
                        text='info'
                        className='px-3 py-2 rounded-pill'>
                        {product.category}
                      </Badge>
                    </td>
                    <td className='fw-bold'>
                      {Number(product.price).toLocaleString()} د.ع
                    </td>
                    <td>
                      <div className='d-flex justify-content-center gap-2'>
                        <Button
                          onClick={() => {
                            setSellectedIdToEdit(product.id);
                            setShowEditDialog(true);
                          }}
                          variant='outline-primary'
                          size='sm'
                          className='rounded-pill px-3 border-0 bg-primary-subtle'>
                          <Edit size={16} className='me-1' /> تعديل
                        </Button>
                        <Button
                          variant='outline-danger'
                          size='sm'
                          className='rounded-pill px-3 border-0 bg-danger-subtle'
                          onClick={() => handleDelete(product.id)}>
                          <Trash2 size={16} className='me-1' /> حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </Modal.Body>
      {/* Edit product dialog */}
      <EditProductModal
        products={products}
        show={showEditDialog}
        handleClose={handleCloseEditDialog}
        sellectedId={sellectedIdToEdit}
      />
    </Modal>
  );
};

export default ProductManagement;
