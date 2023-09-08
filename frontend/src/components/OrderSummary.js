const OrderSummary = ({ packages }) => {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Order Summary
      </h1>
      {packages.map((pkg, idx) => (
        <div key={idx} className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-800">
            Package {idx + 1}
          </h4>
          <p className="text-gray-600 mt-2">
            Items:{" "}
            <span className="text-gray-500">
              {pkg.items.map((i) => `Item ${i.name}`).join(", ")}
            </span>
          </p>
          <p className="text-gray-600 mt-2">
            Total weight: <span className="text-gray-500">{pkg.weight}g</span>
          </p>
          <p className="text-gray-600 mt-2">
            Total price: <span className="text-gray-500">${pkg.cost}</span>
          </p>
          <p className="text-gray-600 mt-2">
            Courier price: <span className="text-gray-500">${pkg.charges}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
export default OrderSummary;
