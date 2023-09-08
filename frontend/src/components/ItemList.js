const ItemList = ({ items, onSelectItem }) => {
  return (
    <div className="min-w-[300px] mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Select Items
      </h1>
      {items.map((item) => (
        <label
          key={item.id}
          htmlFor={`item-${item.id}`}
          className="flex mb-2 items-center justify-between p-6 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300 cursor-pointer"
        >
          <input
            type="checkbox"
            id={`item-${item.id}`}
            className="form-checkbox h-6 w-6 text-blue-600 mr-4"
            onChange={() => onSelectItem(item.id)}
          />
          <div className="flex-1 text-left text-gray-700 font-semibold">
            <span className="block text-lg">{item.name}</span>
            <span className="text-sm text-gray-500 mt-1">
              ${item.price} - {item.weight}g
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default ItemList;
