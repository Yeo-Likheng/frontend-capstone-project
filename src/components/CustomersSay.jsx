import "../index.css"
import { Star } from "lucide-react";
const CustomersSay = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      name: "Jack M.",
      image: "https://images.unsplash.com/photo-1604088320425-bb79cb7fa522?auto=format&fit=crop&crop=faces&w=80&h=80",
      review: "Amazing food and great service! The lemon dessert is absolutely divine."
    },
    {
      id: 2,
      rating: 5,
      name: "John D.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      review: "Best Mediterranean restaurant in Chicago. The Greek salad is fantastic!"
    },
    {
      id: 3,
      rating: 4,
      name: "Maria L.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      review: "Family-friendly atmosphere with authentic flavors. Highly recommended!"
    },
    {
      id: 4,
      rating: 5,
      name: "Alex K.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      review: "The bruschetta is perfection. Can't wait to come back for more!"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="testimonials-title">Testimonials</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`star ${i < testimonial.rating ? 'star-filled' : 'star-empty'}`}
                  />
                ))}
              </div>
              <div className="testimonial-user">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="user-image"
                />
                <span className="user-name">{testimonial.name}</span>
              </div>
              <p className="testimonial-text">"{testimonial.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomersSay;