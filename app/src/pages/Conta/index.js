import React, { useState, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
//import Style
import {Container, TitleList,ListContas, ItemConta, TitleConta, DescConta,ImgConta, LoadingArea} from './styles';

//import API
import api from '../../config/api';

export default function Conta(){
  const [contas, setContas] = useState('');

  const [loading, setLoading] = useState(false);

  const getContas = async () => {
    setLoading(true);
    try{
      const response = await api.get('/contas');
      setContas(response.data.contas);
      setLoading(false);
    }catch(err){
      Alert.alert("","Erro: Nenhuma conta encontrada.")
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getContas();
    },[])
  );

  return(
    <Container>
      <TitleList>Listar</TitleList>
      {loading ? <LoadingArea>
          <ActivityIndicator size="large" color="#fff"/>
        </LoadingArea> : 
        <ListContas 
          data={contas}
          renderItem={({item}) => (
            <ItemConta>
              <ImgConta source={{uri:item.foto}}/>
              <TitleConta>{item.nome}</TitleConta>
              <DescConta>{item.dataNascimento}</DescConta>
            </ItemConta>
          )} keyExtractor={conta => String(conta._id)}
        />
      }
    </Container>
  );
}