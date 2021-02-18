import React from 'react';
import {useNavigation} from '@react-navigation/native'

//import Style
import {Container, Btn, BtnTxt} from './styles'

export default function Home(){

  const navigation = useNavigation();

  const Conta = () => {
    navigation.navigate('Conta');
  }

  const AddConta = () => {
    navigation.navigate('AddConta');
  }

  return(
    <Container>
      <Btn onPress={Conta}>
        <BtnTxt>Listar</BtnTxt>
      </Btn>
      <Btn onPress={AddConta}>
        <BtnTxt>Cadastrar</BtnTxt>
      </Btn>
    </Container>
  );
}