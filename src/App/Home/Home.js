import React, { useEffect } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import whatsappIcon from '../images/WhatsappIcon.svg';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import Faq from '../Faq/Faq';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/Slice/ProductSlice';
import { Card } from 'react-bootstrap';
import expandIcon from '../images/ExpandIcon.svg';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector((state)=> state.product);

  useEffect(()=>{
   dispatch(fetchProducts());
  },[])

  const handleExpandClick=(plantId)=>{
    navigate(`/product/${plantId}`)
  }

  return (
    <div className='home'>
      <div className='homeTopDiv'>
        <Navbar/>

        <div className='topBottomDiv'>
          <div className='homeContentContainer'>
            <div className='homeContentDiv'>
            <div className='flourishDiv'>
             <span>Flourish</span>
            </div>

            <div className='togetherDiv'>
              <span>together</span>
            </div>
            
            <div className='descriptionDiv'>
              <span>Get the plant that makes you happy</span>
            </div>
            </div>
          </div>

          <div className='homeButtonContainer'>
            <button className='orderButton'>Order now</button>
          </div>

          <div className='whatsappIconContainer'>
            <img src={whatsappIcon} alt='whatsappIcon'/>
          </div>
        </div>
      </div>

      <div className='homeMiddleDiv'>
          
          <div className='categoriesContainer'>
            <div className='categoryLeftContainer'>
              <div className='allPlantsContainer'>
                <span>All Plants</span>
              </div>

              <div className='categoryLeftBottomContainer'>
                <div className='airPurifierContainer'>
                 <span>Air Purifier Plants</span>
                </div>

                <div className='indoorContainer'>
                 <span>Indoor Plants</span>
                </div>
              </div>
            </div>

            <div className='categoryRightContainer'>
              <div className='outdoorContainer'>
               <span>Outdoor Plants</span>
              </div>

              <div className='categorySideContainer'>
                <div className='floweringContainer'>
                 <span>Flowering Plants</span>
                </div>

                <div className='prosperityContainer'>
                  <span>Prosperity Plants</span>
                </div>
              </div>
          </div>
        </div>

      <div className='ChooseUsDiv'>
        <WhyChooseUs/>
      </div>
        
       <div className='plantGridDiv'>
          <div className='plantGrid'>
            <div className='plantGridTitle'>
              <span>Latest Arrivals</span>
            </div>

            <div className='plantGridBottomDiv'>
              <div className='plantGridContainer'>
                {productState.productList.slice(0,6).map((plant)=>(
                  <div className='plantCardContainer'>
                    <Card className='plantCard'>
                       <Card.Img variant='top' src={plant.images?.[0]} className='plantCardImageContainer'></Card.Img>
                       <Card.Body className='plantCardBody'>
                        <div className='plantCardTopDiv'>
                          <span className='plantCardTitle'>{plant.plantName}</span>
                        </div>

                        <div className='plantCardBottomDiv'>
                          <div className='plantCardBottomLeftDiv'>
                           <div className='plantDescriptionDiv'>{plant.plantSmallDescription}</div>
                           <div className='plantPriceDiv'> ₹{plant.plantPrice}</div>
                          </div>

                          <div className='plantCardBottomRightDiv'>
                            <img src={expandIcon} alt='expandIcon' onClick={()=>handleExpandClick(plant.Pno)}/>
                          </div>
                        </div>
                       </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className='frequentlyAskedQuestions'>
          <Faq/>
        </div>
      </div>

      <div className='footerDiv'>
      <Footer/>
      </div>
    </div>
  )
}