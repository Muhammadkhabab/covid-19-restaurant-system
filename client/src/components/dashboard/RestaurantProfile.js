import React from 'react';
import { Jumbotron, Container, Badge } from 'reactstrap';
import '../../styles/Restaurants.scss';

const RestaurantProfile = ({
  restObj: {
    restaurant_name,
    address,
    dine_in,
    dine_outside,
    pickup,
    curbside_pickup,
    delivery,
  },
}) => {
  return (
    <div id='restaurant-profile'>
      <Jumbotron>
        <Container className='my-4'>
          <div className='header-wrapper'>
            <div className='logo-wrapper'>
              <img
                src='https://images.squarespace-cdn.com/content/v1/578d4c7a8419c227c750b539/1572971173664-VMLWSYNF0B1T0WT99MT5/ke17ZwdGBToddI8pDm48kDldiTmRHKJ5v0YqxgeTKYoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcILJf9YR3LP5aM5G6UY-AAu_ngb_bs84XNd2m-CICIhr-FNO5NkILC6XZG9VcRQgL/Milk+Tea_smaller+v2.jpg'
                alt='Restaurant logo'
              />
            </div>
            <div className='basic-info'>
              <h1 className='header'>{restaurant_name}</h1>
              <p className='info-text'>{address}</p>
              <div className='badges'>
                {dine_in ? (
                  <Badge color='light'>
                    Dine in <i class='fas fa-check-square'></i>
                  </Badge>
                ) : (
                  <Badge color='light'>
                    Dine in <i class='fas fa-times-circle'></i>
                  </Badge>
                )}
                {dine_outside ? (
                  <Badge color='light'>
                    Dine outside <i class='fas fa-check-square'></i>
                  </Badge>
                ) : (
                  <Badge color='light'>
                    Dine outside <i class='fas fa-times-circle'></i>
                  </Badge>
                )}
                {pickup ? (
                  <Badge color='light'>
                    Pickup <i class='fas fa-check-square'></i>
                  </Badge>
                ) : (
                  <Badge color='light'>
                    Pickup <i class='fas fa-times-circle'></i>
                  </Badge>
                )}
                {curbside_pickup ? (
                  <Badge color='light'>
                    Curbside pickup <i class='fas fa-check-square'></i>
                  </Badge>
                ) : (
                  <Badge color='light'>
                    Curbside pickup <i class='fas fa-times-circle'></i>
                  </Badge>
                )}
                {delivery ? (
                  <Badge color='light'>
                    Delivery <i class='fas fa-check-square'></i>
                  </Badge>
                ) : (
                  <Badge color='light'>
                    Delivery <i class='fas fa-times-circle'></i>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default RestaurantProfile;
