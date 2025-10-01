import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Import Header and Footer
import Header from "../components/Header";
import Footer from "../components/Footer";

const carouselSlides = [
  {
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1500&q=80",
    alt: "School Campus",
    title: "Welcome to the Bursary Portal",
    text: "Empowering students with equal access to education.",
  },
  {
    img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1500&q=80",
    alt: "University",
    title: "Fair. Fast. Transparent.",
    text: "Apply, track, and manage bursary requests with ease.",
  },
];

const whyUsItems = [
  {
    icon: "bi bi-check-circle-fill text-success",
    title: "Fast Application",
    text: "Submit your application in just minutes online.",
    aos: "fade-right",
  },
  {
    icon: "bi bi-shield-lock-fill text-primary",
    title: "Secure and Reliable",
    text: "Your data is protected and processed with integrity.",
    aos: "fade-up",
    delay: 200,
  },
  {
    icon: "bi bi-graph-up-arrow text-warning",
    title: "Track Progress",
    text: "View the status of your bursary at any time.",
    aos: "fade-left",
    delay: 400,
  },
];

const steps = [
  {
    icon: "bi bi-pencil-square text-info",
    title: "Step 1: Register",
    text: "Create an account to begin your bursary application process.",
  },
  {
    icon: "bi bi-journal-text text-warning",
    title: "Step 2: Apply",
    text: "Fill in your details and submit all required documents online.",
    delay: 200,
  },
  {
    icon: "bi bi-check-circle text-success",
    title: "Step 3: Get Results",
    text: "Track your application and get notified when approved.",
    delay: 400,
  },
];

const testimonials = [
  {
    quote: "This portal made my bursary application easy and quick. Thank you!",
    author: "Alice M., Karatina University",
    delay: 100,
  },
  {
    quote: "I was able to apply and get updates without visiting the office. So helpful.",
    author: "John K., Maseno University",
    delay: 200,
  },
  {
    quote: "Easy to use, fast responses, and secure – everything I needed.",
    author: "Grace N., Egerton University",
    delay: 300,
  },
];

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <>
      {/* ✅ Header Section */}
      <Header />

      {/* Hero Carousel */}
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        data-bs-pause="false"
      >
        <div className="carousel-inner">
          {carouselSlides.map((slide, idx) => (
            <div
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
              key={idx}
            >
              <img
                src={slide.img}
                alt={slide.alt}
                className="d-block w-100"
                style={{ objectFit: "cover", height: "100vh" }}
              />
              <div
                className="carousel-caption bg-dark bg-opacity-50 p-3 rounded text-center"
                data-aos="zoom-in"
              >
                <h1 className="text-light fw-bold">{slide.title}</h1>
                <p className="text-light">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Why Choose Us */}
      <section className="py-5 text-center" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-4">Why Use Our System?</h2>
          <p className="lead mb-5">
            We simplify bursary application, tracking, and approval processes.
          </p>
          <div className="row g-4">
            {whyUsItems.map((item, idx) => (
              <div
                className="col-sm-12 col-md-4"
                data-aos={item.aos}
                data-aos-delay={item.delay || 0}
                key={idx}
              >
                <div className="p-3 border rounded h-100 shadow-sm">
                  <i className={`${item.icon} fs-1`}></i>
                  <h5 className="mt-3">{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-light py-5" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="mb-4">How It Works</h2>
          <div className="row g-4">
            {steps.map((step, idx) => (
              <div
                className="col-md-4"
                data-aos="zoom-in"
                data-aos-delay={step.delay || 0}
                key={idx}
              >
                <i className={`${step.icon} fs-1`}></i>
                <h5 className="mt-3">{step.title}</h5>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 text-center" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-4">What Students Are Saying</h2>
          <div className="row g-4">
            {testimonials.map((t, idx) => (
              <div
                className="col-md-4"
                data-aos="fade-up"
                data-aos-delay={t.delay}
                key={idx}
              >
                <div className="p-4 shadow rounded bg-white h-100">
                  <p>"{t.quote}"</p>
                  <h6 className="text-muted">– {t.author}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white text-center py-5" data-aos="slide-up">
        <div className="container">
          <h2 className="mb-3">Ready to Get Started?</h2>
          <p className="mb-4">
            Register now and take the first step towards funding your education.
          </p>
          <a href="/register" className="btn btn-light btn-lg">
            Apply for Bursary
          </a>
        </div>
      </section>

      {/* ✅ Footer Section */}
      <Footer />
    </>
  );
};

export default Home;
