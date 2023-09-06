import { useState, useEffect } from "react";
import "./Index.css";
import ItemList from "./components/ItemList";
import OrderSummary from "./components/OrderSummary";

function App() {
  const [items, setItems] = useState([]); // Store fetched items
  const [selectedItems, setSelectedItems] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) => [...prev, itemId]);
  };

  const handlePlaceOrder = () => {
    console.log(selectedItems);
    // fetch("/api/placeOrder", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: selectedItems }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPackages(data.packages);
    //   });
  };

  return (
    <div className="App">
      <ItemList items={items} onSelectItem={handleSelectItem} />
      <button onClick={handlePlaceOrder} className="btn-primary">
        Place order
      </button>
      <OrderSummary packages={packages} />
    </div>
  );
}

export default App;
