
import "../pages/Home.css";
import shop from "../images/shopbnr1.jpg";



import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCard } from "../cardSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [mydata, setMydata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadData = () => {
    let api = "http://localhost:9000/product/showproduct";
    axios.get(api).then((res) => {
      setMydata(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const addcardData = (id, name, desc, pro, price, image) => {
    dispatch(
      addToCard({
        id: id,
        name: name,
        description: desc,
        product: pro,
        price: price,
        image: image,
        qnty: 1,
      })
    );
  };

  const ans = mydata.map((key) => {
    return (
      <>
        <Card style={{ width: '18rem', marginTop:'20px' ,marginBottom:"20px"}}>
          <a href="#" onClick={()=>{navigate(`/prodetail/${key._id}`)}}>
          <Card.Img variant="top" src={key.image} style={{height:'300px'}} />
          </a>
      <Card.Body>
        <Card.Title>{key.name}</Card.Title>
        <Card.Text>
          {key.description}
          <br/>
          {key.product}
          <br/>
         <span style={{color:'red', fontWeight:'bold'}}> Price :Rs {key.price}/- </span> 
        </Card.Text>
        <Button variant="primary"
         onClick={()=>{addcardData(key._id, key.name, key.description, key.product, key.price, key.image)}}
        >Add to Cart</Button>
      </Card.Body>
    </Card>

      </>
    );
  });

  return (
    <>
  

      
<div className="bg">


      <div className="main-container">
        <div className="main-container-box-1">
          <div className="main-box img1"></div>
          <h5>jacket</h5>
        </div>
        <div className="main-container-box-1">
          <div className="main-box img2"></div>
          <h5>Top</h5>
        </div>
        <div className="main-container-box-1">
          <div className="main-box img3"></div>

          <h5>jeans</h5>
        </div>
        <div className="main-container-box-1">
          <div className="main-box img4"></div>

          <p>Huddy</p>
        </div>
        <div className="main-container-box-1">
          <div className="main-box img5"></div>

          <p>sweater</p>
        </div>
        <div className="main-container-box-1">
          <div className="main-box img6"></div>

          <p>danim jacket</p>
        </div>
        
     
      </div>
        
      <div className="Shopbnr1">
        <img
          src={shop}
          width="100%"
          height="300px"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <h3
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "600",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Our Trending Products
      </h3>

      
     <div
     id="cardData"
  
   >
     {ans}
   </div>
   

      <div className="Shopbnr">
        <h3
          style={{
            fontSize: "24px",
            color: "#FFFFFF",
            fontFamily: "Arial,sans-serif",
            fontWeight: "400",
          }}
        >
          Big saving on Topselling smartphones
        </h3>
        <h2
          style={{
            fontSize: "32px",
            color: "#FFFFFF",
            fontFamily: "Arial,sans-serif",
            fontWeight: "600",
          }}
        >
          Get 85% off on Big Billion Days 2024
        </h2>
        <button className="Shopbbtn">Shop now</button>
      </div>
      </div>
    </>
  );
};
export default Home;
