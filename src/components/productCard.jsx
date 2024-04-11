/* eslint-disable react/prop-types */
import { Card, Image, Rate, Typography } from "antd";
const { Link } = Typography;
const ProductCard = ({ product, onViewMore }) => {
  const { name, price, rating, image_link } = product;

  return (
    <Card
      cover={<Image src={image_link} alt={name} style={{ padding: "1rem" }} />}
    >
      <Card.Meta title={name} />
      <p className="price">${price}</p>
      <Rate defaultValue={rating} disabled />
      <Link onClick={() => onViewMore(product)} style={{ display: "block" }}>
        View More
      </Link>
    </Card>
  );
};

export default ProductCard;
