import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBackButton } from '@ionic/react';

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

  const handleCardClick = (cardId: number) => {
    history.push(`/products/${cardId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonBackButton></IonBackButton>
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
          </IonCardHeader>

          <IonCardContent>{item.description}</IonCardContent>
        </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Products;
