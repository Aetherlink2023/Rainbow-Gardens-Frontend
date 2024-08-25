import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Plants.css';
import Card from 'react-bootstrap/Card';
import expandIcon from '../images/ExpandIcon.svg';
import cardImage from '../images/CardImage.svg';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import indoorImg from '../images/IndoorImage.svg';
import outdoorImg from '../images/OutdoorImage.svg';
import Airpurifier from '../images/Airpurifier.jpg';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slice/ProductSlice";
function Plants() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { plantsCategoryParams } = useParams();

  const [plantName,setPlantName] = useState('');
  const [plantCategory, setPlantCategory] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [plantsData, setPlantsData] = useState([]); // State for API data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleExpandClick = (plantId) => {
    navigate(`/product/${plantId}`);
  };

  const sendDataToParent = (plantName) => {
    setPlantName(plantName);
  }
//image fixing,background image fixing
  useEffect(() => {

    const getPlantsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/getproduct?category=${plantsCategoryParams}+Plant`);
        const data = await response.json();
        setPlantsData(data); // Assign the fetched data to plantsData state
      } catch (e) {
        console.log(e);
      }
    };

    const getProductByName = async () => {
      if (plantName) {
        try {
          const url =`http://localhost:3001/api/getplantname/${encodeURIComponent(plantName)}`
          console.log('url : ',url); 
          const response = await fetch(url);
          const data = await response.json();
          setPlantsData(Array.isArray(data)? data : []); // Assign the fetched data to plantsData state
        } catch (e) {
          console.log(e);
        }
      }
    };
  
    // Fetch data based on category or search
    if (plantName) {
      getProductByName();
    } else {
      getPlantsByCategory();
    }


    // Set category and background image based on route params
    switch (plantsCategoryParams) {
      case 'Indoor':
        setPlantCategory('Indoor');
        setBackgroundImage(indoorImg);
        break;
      case 'Outdoor':
        setPlantCategory('Outdoor');
        setBackgroundImage(outdoorImg);
        break;
      case 'Flowering':
        setPlantCategory('Flowering');
        setBackgroundImage('../flowering');
        break;
      case 'Prosperity':
        setPlantCategory('Prosperity');
        setBackgroundImage('../prosperity');
        break;
      case 'AirPurifier':
        setPlantCategory('AirPurifier');
        setBackgroundImage(Airpurifier);
        break;
      default:
        setPlantCategory('');
        setBackgroundImage('');
    }
  }, [plantsCategoryParams,plantName]);

  return (
    <div className="plantsContainer">
      <div className="plantsTopDiv" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        <div className="plantsFlexDiv">
          <div className="plantsContentContainer">
            <div className="plantsContentDiv">
              <div className="plantsTitleDiv">
                <span>
                  choose <br />
                  <span className="plantsTitleType2">{plantCategory} Plants</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="plantsMiddleDiv">
        <div className="plantsMiddleTopDiv">
          <SearchBar sendDataToParent={sendDataToParent} />
        </div>

        <div className="plantsDisplayContainer">
          <div className="PlantsGridDisplayContainer">
            {plantsData
              .filter(plant => plant.category === `${plantCategory} Plant` || plant.category === `${plantCategory} plant`)
              .slice(0, 9)
              .map((plant) => (
              <div className="plantDiv" key={plant.pno}>
                <Card className="plantCard">
                  <Card.Img
                    variant="top"
                    src={plant.images[0]}
                    style={{backgroundPosition:"center",backgroundSize:"cover",}}
                    className="plantCardImage"
                  />
                  <Card.Body className="plantCardBody">
                    <div className="plantTitle">
                      <span>{plant.plantName}</span>
                    </div>
                    <div className="plantCardBottomDiv">
                      <div className="plantCardLeftDiv">
                        <div className="plantDescription">
                          <span>{plant.plantDescriptionForCard}</span>
                        </div>
                        <div className="plantPrice">
                          <span>₹ {plant.plantPrice}</span>
                        </div>
                      </div>
                      <div className="plantCardRightDiv">
                        <img src={expandIcon} alt="expandIcon"
                        onClick={() => handleExpandClick(plant.Pno)}
                      />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="plantsFooterDiv">
        <Footer />
      </div>
    </div>
  );
}

export default Plants;