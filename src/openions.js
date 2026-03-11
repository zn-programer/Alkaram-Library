import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Quote } from 'lucide-react';

const Openions = () => {
  // بيانات الآراء (صور بارتفاعات مختلفة لإنشاء تأثير الطابوق)
  const reviews = [
    { id: 1, name: "razzaq",  img: "/razzaq.jpg" },
    { id: 2, name: "malak",  img: "/malak.jpg" },
    { id: 3, name: "venus",  img: "/venus.jpg" },
    { id: 4, name: "instagram user",  img: "/instagram user.jpg" },
  ];

  return (
    <section id="testimonials" className="py-5 bg-white">
      <Container>
        {/* عنوان القسم */}
        <div className="text-center mb-5">
          <div className="text-primary mb-2 d-inline-block p-3 bg-light rounded-circle shadow-sm">
            <Quote size={32} strokeWidth={1.5} />
          </div>
          <h2 className="fw-bold display-5 text-dark mt-3">ماذا يقول عملاؤنا؟</h2>
          <p className="text-secondary fw-light mx-auto" style={{ maxWidth: '600px' }}>
            نعتز بثقة زبائننا في مكتبة الكرم، وهذه بعض آرائهم التي نفخر بها.
          </p>
        </div>

        {/* شبكة الطابوق (Masonry Grid) */}
        <div className="masonry-wrapper">
            
          {reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden position-relative hover-lift transition">
                {/* الصورة (رأي الزبون) */}
                <Card.Img 
                  src={review.img} 
                  alt={`رأي ${review.name}`} 
                  className="w-100 h-100 object-fit-cover" 
                />
                
                {/* معلومات الزبون (طبقة سفلية ناعمة) */}
                <div className="card-img-overlay d-flex flex-column justify-content-end p-3 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                  <Card.Title className="fw-bold m-0 fs-6">{review.name}</Card.Title>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      {/* CSS المخصص لتأثير الطابوق */}
      <style>{`
        /* حاوية الـ Masonry الرئيسية */
        .masonry-wrapper {
          column-count: 1; /* عمود واحد للجوال */
          column-gap: 1.5rem; /* المسافة الأفقية بين الأعمدة */
          direction:ltr;
        }

        /* لقطات الشاشة (شاشات متوسطة وكبيرة) */
        @media (min-width: 768px) {
          .masonry-wrapper {
            column-count: 2; /* عمودين للأجهزة اللوحية */
          }
        }

        @media (min-width: 992px) {
          .masonry-wrapper {
            column-count: 3; /* 3 أعمدة للحاسوب */
          }
        }


        /* تأثير الارتفاع عند الهوفر */
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.15)!important;
        }

        .transition {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Openions;