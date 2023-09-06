const ItemList = ({ items, onSelectItem }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <input type="checkbox" onChange={() => onSelectItem(item.id)} />
          {item.name} - ${item.price} - {item.weight}g
        </div>
      ))}
    </div>
  );
};
export default ItemList;
