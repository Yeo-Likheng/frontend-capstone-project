import "../index.css";

const Specials = () => {
  const specials = [
    {
      id: 1,
      name: "Greek Salad",
      price: "$12.99",
      image: "/greekSalad.jpg",
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
    },
    {
      id: 2,
      name: "Bruchetta",
      price: "$5.99",
      image: "/bruchetta.jpg",
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
    },
    {
      id: 3,
      name: "Lemon Dessert",
      price: "$5.00",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop&crop=center",
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
    }
  ];

  return (
    <section className="specials-section">
      <div className="container">
        <div className="specials-header">
          <h2 className="specials-title">This week's specials!</h2>
          <button className="menu-button">Online Menu</button>
        </div>
        <div className="specials-grid">
          {specials.map((special) => (
            <div key={special.id} className="special-card">
              <img 
                src={special.image} 
                alt={special.name}
                className="special-image"
              />
              <div className="special-content">
                <div className="special-header">
                  <h3 className="special-name">{special.name}</h3>
                  <span className="special-price">{special.price}</span>
                </div>
                <p className="special-description">
                  {special.description}
                </p>
                <button className="delivery-button">
                  Order a delivery 🛵
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;