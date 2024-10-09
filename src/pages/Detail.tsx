import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../shared/hooks';
import { IonButton, IonBackButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar, IonModal, IonButtons, IonNav } from '@ionic/react';
import { loadCategories } from '../slices/categorySlice';
import { addSelected } from '../slices/selectedSlice';
import Selected from './Selected'; 
import { Product } from '../models/Product.model';

const Details: React.FC = () => {
    const productsFromRedux = useAppSelector(state => state.products.list);
    const categoriesFromRedux = useAppSelector(state => state.categories.list);
    const cardId:any = useParams<{cardId: string}>();
    const detailProduct:any = productsFromRedux.find(r => r.idProduct === parseInt(cardId.id));
    const detailCategory = categoriesFromRedux.find(c => c.idFeature === detailProduct?.featureId );
    const dispatch = useAppDispatch();
    const history = useHistory();
    
    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);
    
    
      const handleCardClick = () => {
        dispatch(addSelected(detailProduct?.idProduct, 1))
        history.push(`/selected`);
      };
    

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonBackButton></IonBackButton>
                <IonTitle>Detalle {detailProduct?.productName} </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList>
                <IonItem>
                    <IonLabel>Descripcion: {detailProduct?.description}</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>Precio: ${detailProduct?.price}</IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>Categoria: {detailCategory?.featureName}</IonLabel>
                </IonItem>
            </IonList>
            <IonButton onClick={() => handleCardClick()}>Agregar a deseos</IonButton>
        </IonContent>
      </IonPage>
  );
};

export default Details;