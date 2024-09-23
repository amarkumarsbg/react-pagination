import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  // State to hold the list of products and the current page
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    // Check if data and products are available and set the state
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  // useEffect to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler to select the desired page
  const selectPageHandler = (selectedPage) => {
    // Ensure the selected page is within the valid range and is not the current page
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {/* Display a slice of products based on the current page */}
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          {/* Previous page button */}
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀️
          </span>
          {/* Pagination numbers */}
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          {/* Next page button */}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
