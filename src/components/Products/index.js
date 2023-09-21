import { useEffect, useState } from "react";
import { getAllProducts, addProductToCard , productCategory} from "../Api";

import { useParams } from "react-router-dom";
import {
  Card,
  List,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Spin,
  Select
} from "antd";

export default function Products() {
  const [items, setItems] = useState([]);
  const params = useParams()
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    (params?.categoryId
      ? productCategory(params.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [params]);

  const getSortedItems=()=>{
    const sortedItems =[...items]
    sortedItems.sort((a,b)=>{
        const aLowerCaseTitle = a.title.toLowerCase();
        const bLowerCaseTitle = b.title.toLowerCase();
  
        if (sortOrder === "az") {
          return aLowerCaseTitle > bLowerCaseTitle
            ? 1
            : aLowerCaseTitle === bLowerCaseTitle
            ? 0
            : -1;
        } else if (sortOrder === "za") {
          return aLowerCaseTitle < bLowerCaseTitle
            ? 1
            : aLowerCaseTitle === bLowerCaseTitle
            ? 0
            : -1;
        } else if (sortOrder === "lowHigh") {
          return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
        } else if (sortOrder === "highLow") {
          return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
        }
      });
      return sortedItems;
    
  }
  if(loading){
    return <Spin spinning/>
  }
  return (
    <div>
          <div>
   
        <Select
          onChange={(value) => {
            setSortOrder(value);
          }}
          defaultValue={"az"}
          options={[
            {
              label: "Alphabetically a-z",
              value: "az",
            },
            {
              label: "Alphabetically z-a",
              value: "za",
            },
            {
              label: "Price Low to High",
              value: "lowHigh",
            },
            {
              label: "Price High to Low",
              value: "highLow",
            },
          ]}
        ></Select>
      </div>
      <List
      loading={loading}
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              text={`${product.discountPercentage}% off`}
              color="orange"
              className="itemBadge"
            >
              <Card
                className="itemCard"
                title={product.title}
                key={index}
                cover={
                  <Image
                    src={product.thumbnail}
                    className="productImage"
                    alt="product image"
                  />
                }
                actions={[
                  <Rate allowHalf disabled value={product.rating} />,
                  <AddToCard item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ row: 2, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={getSortedItems()}
      ></List>
    </div>
  );

  function AddToCard(item) {
    const [loading,setLoading] = useState(false)
    const addProduct = () => {
  setLoading(true)
        addProductToCard(item.item.id)
        message.success(`${item.item.title} has been added to card`)
        setLoading(false)
    };
    return (
      <Button
        type="link"
        onClick={() => {
          addProduct();
        }}
        loading={loading}
      >
        Add to card
      </Button>
    );
  }
}
