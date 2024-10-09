import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Category.css';
import { Category } from '../models/Category.model';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../shared/hooks';
import { loadCategories } from '../slices/categorySlice';

const Categories: React.FC = () => {
  const categoriesFromRedux = useAppSelector(state => state.categories.list);
  const statusProducts = useAppSelector(state => state.categories.status);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categorias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Categorias</IonTitle>
          </IonToolbar>
        </IonHeader>
        {categoriesFromRedux.length > 0 && categoriesFromRedux.map(item => (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{item.featureName}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>{item.products}</IonCardContent>
        </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Categories;
