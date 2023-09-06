const OrderSummary = ({ packages }) => {
  return (
    <div>
      {packages.map((pkg, idx) => (
        <div key={idx}>
          <h4>Package {idx + 1}</h4>
          <p>Items - {pkg.items.map((i) => `Item ${i.id}`).join(", ")}</p>
          <p>Total weight: {pkg.totalWeight}g</p>
          <p>Total price: ${pkg.totalPrice}</p>
          <p>Courier price: ${pkg.courierPrice}</p>
        </div>
      ))}
    </div>
  );
};
export default OrderSummary;
