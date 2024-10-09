import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Product.css';
import { Product } from '../models/Product.model';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../shared/hooks';
import { loadProducts } from '../slices/productSlice';
import { useHistory } from 'react-router-dom';

const Products: React.FC = () => {
  const productsFromRedux = useAppSelector(state => state.products.list);
  const statusProducts = useAppSelector(state => state.products.status);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleCardClick = (cardId:any) => {
    history.push(`/details/${cardId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Productos</IonTitle>
          </IonToolbar>
        </IonHeader>
        {productsFromRedux.length > 0 && productsFromRedux.map(item => (
        <IonCard key={item.idProduct} button onClick={() => handleCardClick(item.idProduct)}>
          <IonCardHeader>
            <IonCardTitle>{item.productName}</IonCardTitle>
            <IonCardSubtitle>${item.price}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>{item.description}</IonCardContent>
        </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Products;
