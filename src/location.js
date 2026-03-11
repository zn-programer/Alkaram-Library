import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MapPin, Phone,  ExternalLink } from 'lucide-react';

const Location = () => {
  return (
    <section id="location" className="py-5 bg-light">
      <Container>
        <Row className="align-items-center g-5">
          
          {/* جزء المعلومات */}
          <Col lg={5} className="text-right">
            <h2 className="fw-bold mb-4 display-6 text-dark">تفضل بزيارتنا</h2>
            <p className="text-secondary mb-5 fw-light">
              يسعدنا استقبالكم في مكتبة الكرم لتصفح تشكيلة القرطاسية والخدمات المكتبية والتعليمية عن قرب.
            </p>

            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-start gap-3">
                <div className="bg-white p-3 rounded-circle shadow-sm text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">العنوان</h5>
                  <p className="text-secondary m-0">JRJR+XH9، هيت، محافظة الأنبار، العراق</p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <div className="bg-white p-3 rounded-circle shadow-sm text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">الهاتف</h5>
                  <p className="text-secondary m-0" dir="ltr">07761813139</p>
                </div>
              </div>
            </div>

            <Button 
              href="https://maps.google.com/?cid=12351856065486487284&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl" 
              target="_blank"
              variant="dark" 
              className="mt-5 px-4 py-3 rounded-pill d-flex align-items-center gap-2 fw-bold"
            >
              افتح في خرائط جوجل <ExternalLink size={18} />
            </Button>
          </Col>

          {/* جزء الخريطة */}
          <Col lg={7}>
            <div className="overflow-hidden rounded-4 shadow-lg border-0" style={{ height: '450px' }}>
              {/* هنا نقوم بوضع الخريطة التفاعلية */}
              <iframe 
                title="موقع مكتبة الكرم"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.1620242551325!2d42.83903267554988!3d33.632372473318214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155c82000e2e6cb3%3A0xab6a6ba60c137ef4!2z2YXZg9iq2KjYqSDYp9mE2YPYsdmF!5e0!3m2!1sar!2siq!4v1709510000000!5m2!1sar!2siq" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default Location;