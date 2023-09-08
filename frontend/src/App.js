import { useState, useEffect } from "react";
import "./index.css";
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
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
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
        setPackages(data);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };
  return (
    <div className="App bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="flex space-x-8">
        <div className="flex flex-col items-center space-y-4">
          <ItemList items={items} onSelectItem={handleSelectItem} />
          <button
            onClick={handlePlaceOrder}
            className="btn-primary text-white py-2 px-6 rounded-full hover:bg-blue-500 transition-colors duration-300"
          >
            Place order
          </button>
        </div>
        {packages.length > 0 && <OrderSummary packages={packages} />}
      </div>
    </div>
  );
}

export default App;
