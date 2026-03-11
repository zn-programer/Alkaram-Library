import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Instagram, Facebook, MessageCircle, Send, Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const socialLinks = [
    { id: 1, name: "واتساب", icon: <MessageCircle size={32} />, color: "#25D366", link: "https://wa.me/96407761813139", user: "07761813139" },
    { id: 2, name: "انستغرام", icon: <Instagram size={32} />, color: "#E4405F", link: "https://www.instagram.com/alkarmlibrary?igsh=MXhueGFheHZ0M3NqbQ==", user: "alkaramlibrary" },
    { id: 3, name: "فيسبوك", icon: <Facebook size={32} />, color: "#1877F2", link: "https://www.facebook.com/share/1FFiN1p9X3/", user: "مكتبة الكرم للقرطاسية" },
    { id: 4, name: "تليجرام", icon: <Send size={32} />, color: "#0088cc", link: "#", user: "@ALKARAM11" },
  ];

  return (
    <section id="social" className="py-5 bg-white">
      <Container>
        {/* عنوان القسم بتوسيط بدون فليكس */}
        <div className="text-center mb-5 mx-auto" style={{ maxWidth: '700px' }}>
          <h2 className="fw-bold display-6 text-dark mb-3">كن على اتصال بنا</h2>
          <p className="text-secondary fw-light">
            تابعنا لتصلك أحدث تشكيلات القرطاسية، البوسترات، ونماذج الأسئلة الامتحانية أولاً بأول.
          </p>
        </div>
        {/* شبكة التواصل - متجاوبة (عمودي في الهاتف، أفقي في الحاسوب) */}
        <Row className="g-4 justify-content-center">
          {socialLinks.map((social) => (
            <Col key={social.id} xs={12} sm={6} lg={3}>
              <a href={social.link} className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm text-center py-4 hover-social-card transition">
                  <div className="mx-auto mb-3 p-3 rounded-circle d-inline-flex align-items-center justify-content-center" 
                       style={{ backgroundColor: `${social.color}15`, color: social.color }}>
                    {social.icon}
                  </div>
                  <Card.Title className="fw-bold text-dark mb-1">{social.name}</Card.Title>
                  <Card.Text className="text-secondary small">{social.user}</Card.Text>
                </Card>
              </a>
            </Col>
          ))}
        </Row>

        {/* معلومات التواصل السريع أسفل الأيقونات */}
        <div className="mt-5 p-4 bg-light rounded-4 border-0 d-flex flex-column flex-md-row justify-content-around align-items-center gap-4 text-center">
          <div className="d-flex align-items-center gap-3">
            <Phone size={20} className="text-primary" />
            <span className="fw-medium text-dark" dir="ltr">07761813139</span>
          </div>
          <div className="d-flex align-items-center gap-3 border-md-start border-md-end px-md-5">
            <Mail size={20} className="text-primary" />
            <span className="fw-medium text-dark">mktbtalkrm65@gmail.com</span>
          </div>
          <div className="d-flex align-items-center gap-3 border-md-start border-md-end px-md-5">
            <MapPin size={20} className="text-primary" />
            <span className="fw-medium text-dark">هيت - حي جمعية-مجمع مكة</span>
          </div>
        </div>
      </Container>

      {/* CSS مخصص للتفاعل */}
      <style>{`
        .hover-social-card {
          transition: all 0.3s ease;
          border: 1px solid transparent !important;
        }
        .hover-social-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
          border-color: #eee !important;
        }
        @media (max-width: 768px) {
          .border-md-start { border: none !important; }
          .border-md-end { border: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;