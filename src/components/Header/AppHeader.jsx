import { Form, Badge, Menu, Drawer, Table, InputNumber, Button, Input, Checkbox , message} from 'antd'
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Typography from 'antd/es/typography/Typography';
import { useState, useEffect } from 'react';
import { getToCart } from '../Api'

export default function AppHeader() {
  const navigate = useNavigate()
  const onMenuClick = (item) => {
    navigate(`/${item.key}`)
  }
  return (
    <div className="appHeader">

      <Menu
      className='appMenu'
        mode="horizontal"
        onClick={onMenuClick}
        items={[
          {
            label: <HomeOutlined />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Mens-shirts",
                key: "mens-shirts",
              },
              {
                label: "Mens-shoes",
                key: "mens-shoes",
              },
              {
                label: "Mens-watches",
                key: "mens-watches",
              },
            ]
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Womens-shoes",
                key: "womens-shoes",
              },
              {
                label: "Womens-dresses",
                key: "womens-dresses",
              },
              {
                label: "Skincare",
                key: "skincare",
              },
            ]
          },
          {
            label: "Home-decoration",
            key: "home-decoration"
          },
        ]}>

      </Menu>
     c
      <AppCart />

    </div >
  )



  function AppCart() {
    const [cartOpen, setCartOpen] = useState();
    const [cartItem, setCartItem] = useState([]);
    const [checkDrawerOpen, setCheckDrawerOpen] = useState(false)

    useEffect(() => {
      getToCart().then(res => {
        setCartItem(res.products)
      })
    }, [])

    const ConfirmOrder = (values) => {
      console.log(values)
      setCartOpen(false)
      setCheckDrawerOpen(false)
      message.success("Your order has been successfully")
    }
    return (
      <>
        <Badge onClick={() => { setCartOpen(true) }} count={cartItem.length} className="cartIcon">
          <ShoppingCartOutlined />
        </Badge>
        <Drawer open={cartOpen} onClose={() => { setCartOpen(false) }} title="Your Cart" contentWrapperStyle={{ width: 500 }}>
          <Table
            pagination={false}
            columns={[{
              title: "Title",
              dataIndex: "title"
            }, {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>
              }
            }, {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return <InputNumber min={0} max={9} defaultValue={value} onChange={(value) => {
                  setCartItem(carts => carts.map(item => {
                    if (record.id === item.id) {
                      item.total = item.price * value;
                    }
                    return item
                  }))
                }}></InputNumber>
              }
            }, {
              title: "Total",
              dataIndex: "total",
              render: (value) => {
                return <span>${value}</span>
              }
            }]}
            dataSource={cartItem}
            summary={(data) => {
              const total = data.reduce((acc, item) => {
                return acc + item.total
              }, 0)
              return <span>Total:{total}</span>
            }}
          />

          <Button type="primary"
            onClick={() => {
              setCheckDrawerOpen(true);
            }}
          >Check your cart</Button>
        </Drawer>
        <Drawer
          open={checkDrawerOpen}
          onClose={() => {
            setCheckDrawerOpen(false);
          }}
          title="Confirm Order">


          <Form onFinish={ConfirmOrder}>
            <Form.Item rules={[{
              required: true,
              type: "text",
              message: "Please enter your full name"
            }]} label="Full Name" name="Full_Name">
              <Input placeholder='Enter Your Full Name' />
            </Form.Item>
            <Form.Item
              rules={[{
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
              label="Email"
              name="your_email"
            >
              <Input placeholder="Enter your email.." />
            </Form.Item>
            <Form.Item rules={[{
              required: true,
              type: "text",
              message: "Please enter your address"
            }]} label="Adress" name="Address">
              <Input placeholder='Enter Your Address' />
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked disabled>Cash on Delivery</Checkbox>
            </Form.Item>
            <Typography.Paragraph type="secondary">
More methods coming soon
            </Typography.Paragraph>
            <Button type="primary" htmlType='submit'>Confirm Order</Button>
          </Form>
        </Drawer>
      </>
    )

  }
}
