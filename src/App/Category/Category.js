import React from 'react';
import './Category.css';
import Navbar from '../Navbar/Navbar';
import whatsappIcon from '../images/WhatsappIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import plantData from '../Home/Home.json';
import Card from 'react-bootstrap/Card';
import expandIcon from '../images/ExpandIcon.svg';
import cardImage from '../images/CardImage.svg';
import offerImage from '../images/OfferImage.svg';
import Footer from '../Footer/Footer';

function Category() {
  return (
    <div className='categoryContainer'>
      <div className='categoryTopDiv'>
        <Navbar/>
        <div className='categoryFlexDiv'>
          <div className='whatsappDiv'>
            <img src={whatsappIcon} alt='whatsappIcon'/>
          </div>
        </div>
      </div>

      <div className='categoryMiddleDiv'>
        <SearchBar/>
        <div className='plantButtonContainer'>
          <button>Indoor Plants</button>
          <button>Outdoor Plants</button>
          <button>Flowering Plants</button>
          <button>Prosperity Plants</button>
          <button>Air Purifier Plants</button>
        </div>

        <div className='recommendationContainer'>
          <div className='recommendationTopDiv'>
            <div className='recommendationTitle'>
              <span>Top Recommendations</span>
            </div>

            <div className='recommendationGridContainer'>
              <div className='recommendationTopGridContainer'>
              {plantData.plants.map((plant)=>(
                <div className='plantDiv'>
                  <Card className='plantCard'>
                    <Card.Img variant='top' src={cardImage} className='plantCardImage'></Card.Img>
                    <Card.Body className='plantCardBody'>
                      <div className='plantTitle'>
                         <span>{plant.plantName}</span>
                      </div>

                      <div className='plantCardBottomDiv'>
                        <div className='plantCardLeftDiv'>
                          <div className='plantDescription'>
                           <span>{plant.plantDescription}</span>
                          </div>

                          <div className='plantPrice'>
                            <span>₹ {plant.price}</span>
                          </div>
                        </div>

                        <div className='plantCardRightDiv'>
                          <img src={expandIcon} alt='expandIcon'/>
                        </div>
                      </div>
                      {/* <div className='plantDetailsDiv'>
                        <div className='plantDetailsTopDiv'>
                         <div className='plantTitle'>
                           <span>{plant.plantName}</span>
                         </div>

                         <div className='plantDescription'>
                           <span>{plant.plantDescription}</span>
                         </div>
                         </div>
                        
                        <div className='plantPrice'>
                          <span>{plant.price}</span>
                        </div>
                      </div>
                      
                      <div className='viewPlantDiv'>
                        <img src={expandIcon} alt='expandIcon'/>
                      </div> */}
                    </Card.Body>
                  </Card>
                </div>
              ))}
              </div>
            </div>
          </div>

          <div className='recommendationMiddleDiv'>
            <div className='offerContainer'>
              <div className='offerContent'>
                 <span>50% OFF on all Indoor Plants!!</span>
                 <span>from 15th March to 25th March</span>
              </div>

              <div className='offerImage'>
                 <img src={offerImage} alt='offerImg'/>
              </div>
            </div>
          </div>

          <div className='recommendationBottomDiv'>
            <div className='recommendationBottomGridContainer'>
            {plantData.plants.slice(0,3).map((plant)=>(
                <div className='plantDiv'>
                  <Card className='plantCard'>
                    <Card.Img variant='top' src={cardImage} className='plantCardImage'></Card.Img>
                    <Card.Body className='plantCardBody'>
                      <div className='plantDetailsDiv'>
                        <div className='plantDetailsTopDiv'>
                         <div className='plantTitle'>
                           <span>{plant.plantName}</span>
                         </div>

                         <div className='plantDescription'>
                           <span>{plant.plantDescription}</span>
                         </div>
                         </div>
                        
                        <div className='plantPrice'>
                          <span>{plant.price}</span>
                        </div>
                      </div>
                      
                      <div className='viewPlantDiv'>
                        <img src={expandIcon} alt='expandIcon'/>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='categoryFooterDiv'>
        <Footer/>
      </div>
    </div>
  )
}

export default Category