import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Team = () => {
  const team = [
    { id: 1, name: "كرم محمد", role: "مدير المكتبة", img: "/karam.jpg" },
    { id: 2, name: "زيد الطائي", role: "مبرمج و مسؤول العمليات الالكترونية", img: "/zaid.webp" },
    { id: 3, name: "ضرغام", role: "مدير السوشل ميديا", img: "/durgham.jpeg"},
    { id: 4, name: "عبدالرزاق داود", role: "خبير حاسبات و موظف مبيعات", img: "/razzaqimg.jpg" },
  ];

  return (
    <section id="team" className="py-5 bg-light">
      <Container>
        {/* عنوان القسم بتوسيط كلاسيكي */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">فريق العمل</h2>
          <p className="text-secondary small">نخبة من المبدعين في خدمتكم دائماً</p>
          <div className="mx-auto" style={{ width: '50px', height: '3px', backgroundColor: '#000' }}></div>
        </div>

        <Row className="justify-content-center g-4">
          {team.map((member) => (
            <Col key={member.id} xs={6} md={3} className="text-center">
              {/* حاوية الصورة الدائرية */}
              <div className="mb-3 mx-auto position-relative" style={{ width: '120px', height: '120px' }}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle w-100 h-100 object-fit-cover shadow-sm border border-3 border-white"
                />
              </div>
              <h6 className="fw-bold mb-1 text-dark">{member.name}</h6>
              <p className="text-muted small">{member.role}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Team;