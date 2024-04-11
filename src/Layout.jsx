import { Breadcrumb, Form, Layout, Menu, Select, theme } from "antd";
import { data } from "./utils/dummyData";
import "./layout.css";

const { Header, Content, Sider } = Layout;

const App = ({ children, handleFilterChange }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const uniqueCategories = new Set(data.map((product) => product.category));
  const uniqueColors = new Set(
    data.map(
      (item) => item.product_colors[0] && item.product_colors[0].colour_name
    )
  );

  return (
    <Layout className="layout">
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Sider
            width={200}
            style={{ background: colorBgContainer, padding: "20px" }}
          >
            <Form layout="vertical" autoComplete="off">
              <Form.Item label="Price">
                <Select
                  defaultValue=""
                  onChange={(value) => handleFilterChange("priceRange", value)}
                >
                  <Select.Option value="">All Prices</Select.Option>
                  <Select.Option value="0-10">Under $10</Select.Option>
                  <Select.Option value="10-20">$10 - $20</Select.Option>
                  <Select.Option value="20-50">$20 - $50</Select.Option>
                  <Select.Option value="50-100">$50 - $100</Select.Option>
                  <Select.Option value="100-">Above $100</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Product Type">
                <Select
                  defaultValue=""
                  onChange={(value) => handleFilterChange("productType", value)}
                >
                  <Select.Option value="">All Types</Select.Option>
                  {[...uniqueCategories].map(
                    (product) =>
                      product && (
                        <Select.Option key={product} value={product}>
                          {product}
                        </Select.Option>
                      )
                  )}
                </Select>
              </Form.Item>
              <Form.Item label="Rating">
                <Select
                  defaultValue=""
                  onChange={(value) => handleFilterChange("rating", value)}
                >
                  <Select.Option value="">All Ratings</Select.Option>
                  <Select.Option value="1">1 Star</Select.Option>
                  <Select.Option value="2">2 Stars</Select.Option>
                  <Select.Option value="3">3 Stars</Select.Option>
                  <Select.Option value="4">4 Stars</Select.Option>
                  <Select.Option value="5">5 Stars</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Product Colors">
                <Select
                  defaultValue=""
                  onChange={(value) => handleFilterChange("colors", value)}
                >
                  <Select.Option value="">All Colors</Select.Option>

                  {[...uniqueColors].map(
                    (product) =>
                      product && (
                        <Select.Option key={product} value={product}>
                          {product}
                        </Select.Option>
                      )
                  )}
                </Select>
              </Form.Item>
            </Form>
          </Sider>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
