import { useEffect, useState } from "react";
import { Col, Row, Pagination, Modal, Tooltip } from "antd";
import ProductCard from "./components/productCard";
import Layout from "./Layout";
import { data } from "./utils/dummyData";
import { Content } from "antd/es/layout/layout";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [productsToDisplay, setProductsToDisplay] = useState(data.slice(0, 15));
  const [filteredData, setFilteredData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pageSize, setPageSize] = useState(15);
  const [filters, setFilters] = useState({
    priceRange: null,
    productType: null,
    rating: null,
    colors: [],
  });

  // Function to filter products based on selected filters
  const filterProducts = () => {
    let filteredProducts = data; // Start with all products

    // Apply price range filter (if selected)
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("-");
      filteredProducts = filteredProducts.filter(
        (product) =>
          parseFloat(product.price) >= minPrice &&
          parseFloat(product.price) <= maxPrice
      );
    }

    // Apply product type filter (if selected)
    if (filters.productType) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.productType
      );
    }

    // Apply rating filter (if selected)
    if (filters.rating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating === parseFloat(filters.rating)
      );
    }

    // Apply color filters (if any selected)
    if (filters.colors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.product_colors.some((color) =>
          filters.colors.includes(color.colour_name)
        )
      );
    }

    setFilteredData(filteredProducts); // Update displayed products
  };

  // Function to handle filter changes from the Layout component
  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value }); // Update specific filter
  };

  // Handle pagination
  const handlePageChange = (page, pageSize) => {
    setPageSize(pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setProductsToDisplay(filteredData.slice(startIndex, endIndex));
    setCurrentPage(page);
  };

  const handleViewMore = (product) => {
    setSelectedProduct(product); // Set selected product for modal
  };

  const handleModalClose = () => {
    setSelectedProduct(null); // Clear selected product on modal close
  };

  // Call filterProducts initially to set up filtered data based on initial filters state
  useEffect(() => filterProducts(), [filters]);
  useEffect(() => {
    setProductsToDisplay(filteredData.slice(0, pageSize));
  }, [filteredData]);

  return (
    <Layout handleFilterChange={handleFilterChange}>
      <Content>
        <Row gutter={16}>
          {productsToDisplay.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              style={{ margin: "10px" }}
            >
              <ProductCard onViewMore={handleViewMore} product={product} />
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Pagination
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            pageSizeOptions={[10, 15, 20]}
            onChange={handlePageChange}
          />
        </div>
        <Modal
          open={selectedProduct !== null}
          onCancel={handleModalClose}
          footer={null}
        >
          {selectedProduct && (
            <div>
              <img
                src={selectedProduct.image_link}
                alt={selectedProduct.name}
                style={{ maxWidth: "300px" }}
              />
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: 10 }}>Rating:</span>
                <span> {selectedProduct.rating}</span>
              </div>
              <p>Price: ${selectedProduct.price}</p>
              <a href={selectedProduct.product_link}>Go to product page</a>
              {Boolean(selectedProduct?.product_colors.length) && (
                <div>
                  <h4>Colors:</h4>
                  <Row gutter={8}>
                    {selectedProduct.product_colors.map((color) => (
                      <Col key={color.hex_value} xs={2}>
                        <Tooltip title={color.colour_name || "No color name"}>
                          <div
                            style={{
                              width: 15,
                              height: 15,
                              borderRadius: "50%",
                              backgroundColor: color.hex_value,
                              margin: "5px",
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default App;
