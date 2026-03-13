import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const OurWork = () => {
  const works = [
    { id: 1, title: "تجليد فاخر", category: "كتب", img: "/tajleed.webp" },
    { id: 2, title: "طباعة بوسترات", category: "تصميم", img: "/poster.webp" },
    { id: 3, title: "تنسيق هدايا", category: "مناسبات", img: "/hadaya.webp" },
    { id: 4, title: "دفاتر مخصصة", category: "قرطاسية", img: "/dafater.webp" },
    { id: 5, title: "تغليف احترافي", category: "هدايا", img: "/gifts.webp" },
    { id: 6, title: "بوكيهات ورد", category: "تنسيق", img: "/pokes.webp" },
  ];

  return (
    <section id="portfolio" className="py-5 bg-white">
      <Container>
        {/* عنوان القسم */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 text-dark">معرض أعمالنا</h2>
          <p className="text-secondary fw-light mx-auto" style={{ maxWidth: '600px' }}>
            نفتخر بتقديم أفضل الخدمات المخصصة التي تلبي تطلعات عملائنا في مكتبة الكرم.
          </p>
          <div className="mx-auto mt-3" style={{ width: '60px', height: '4px', backgroundColor: '#0d6efd' }}></div>
        </div>

        {/* الشبكة (Grid) */}
        <Row className="g-4">
          {works.map((work) => (
            <Col key={work.id} xs={12} sm={6} lg={4}>
              <div className="portfolio-item position-relative overflow-hidden rounded-4 shadow-sm">
                {/* الصورة */}
                <img 
                  src={work.img} 
                  alt={work.title} 
                  className="w-100 h-100 object-fit-cover transition-transform duration-500" 
                  style={{ minHeight: '300px' }}
                />
                
                {/* طبقة المعلومات عند الهوفر */}
                <div className="portfolio-overlay d-flex flex-column justify-content-center align-items-center text-white p-4">
                  <span className="badge bg-light text-primary mb-2 rounded-pill px-3">{work.category}</span>
                  <h4 className="fw-bold m-0">{work.title}</h4>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CSS المخصص لهذا القسم */}
      <style>{`
        .portfolio-item {
          cursor: pointer;
          height: 350px;
        }
        
        .portfolio-item img {
          transition: transform 0.6s ease;
        }

        .portfolio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7); /* لون أسود شفاف */
          opacity: 0;
          transition: opacity 0.4s ease;
          backdrop-filter: blur(3px); /* تأثير ضبابي عصري */
        }

        .portfolio-item:hover img {
          transform: scale(1.1); /* تكبير الصورة عند الهوفر */
        }

        .portfolio-item:hover .portfolio-overlay {
          opacity: 1;
        }

        .duration-500 {
          transition-duration: 500ms;
        }
      `}</style>
    </section>
  );
};

export default OurWork;