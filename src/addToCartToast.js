/** @format */
import { Toast, ToastContainer } from "react-bootstrap";
import { CheckCircle } from "lucide-react";

const AddToCartToast = ({ show, setShow, productName }) => {
  return (
    <ToastContainer 
      // التثبيت في أسفل المنتصف
      position="bottom-center" 
      className="p-3" 
      style={{ 
        zIndex: 9999, 
        position: 'fixed', // لضمان عدم تأثره بالسكرول
        bottom: '20px',    // مسافة من الأسفل
        left: '50%',       // التوسيط
        transform: 'translateX(-50%)' // موازنة التوسيط
      }}
    >
      <Toast 
        onClose={() => setShow(false)} 
        show={show} 
        delay={3000} 
        autohide 
        className="border-0 shadow-lg rounded-4 overflow-hidden"
      >
        <Toast.Body className="bg-dark text-white py-3 px-4 d-flex align-items-center gap-3">
          <CheckCircle size={24} className="text-success" />
          <div style={{ direction: "rtl", textAlign: "right" }}>
            <div className="fw-bold">تمت الإضافة!</div>
            <div className="small opacity-75">أضيف {productName} إلى السلة.</div>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AddToCartToast;