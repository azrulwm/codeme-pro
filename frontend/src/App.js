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
    console.log(selectedItems.length);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedItems }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        // setPackages(data.packages);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
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
