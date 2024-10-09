import { useEffect, useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonBackButton } from '@ionic/react';

import './Product.css';
import { Product } from '../models/Product.model';
import { useAppSelector, useAppDispatch } from '../shared/hooks';
import { useHistory } from 'react-router-dom';
import { loadSelected } from '../slices/lstSelectedSlice';

const Selected: React.FC = () => {
  const lstSelected = useAppSelector(state => state.lstSelected.list);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const nav = useRef<HTMLIonNavElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    dispatch(loadSelected(1));
  }, [dispatch]);

  
  const handleCardClick = (cardId: number) => {

    history.push(`/products/${cardId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonBackButton></IonBackButton>
          <IonTitle>Productos Seleccionados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Productos</IonTitle>
          </IonToolbar>
        </IonHeader>
        {lstSelected.length > 0 && lstSelected.map(item => (
        <IonCard key={item.idProduct}>
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

export default Selected;
