"use client";

import React, { useEffect, useState } from "react";
import { Container, ContainerIntern, Form, FormGroup, Label, Input, ErrorBox, VideoBg, VideoBgColor, Title, Wrapper, Text, TextLink, Title2 } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/app/Components/Button";


import { api } from "@/app/Services/api";
import { useRouter, useParams } from "next/navigation";
import { Divisor } from "@/app/Components/Divisor";
import Link from "next/link";



// ------------------------------------------------------Esquema de validação
const loginSchema = yup.object({
  passwordHash: yup.string().required("Senha é obrigatória"),
  passwordHash2: yup.string().required("Preenchimento obrigatório").oneOf([yup.ref('passwordHash')], "As senhas devem ser iguais")
 
}).required();



export default function AutenticateAccount() {

  const params = useParams();

  // Valida o ID vindo dos parâmetros
  const token = decodeURIComponent(params.token) ;
  
  const [data, setData] = useState(null);

   // ------------------------------------------------------Fazendo o request com as informações do formulário


  useEffect(() => {
      
    sendRequest()
    }, []);





  const sendRequest = async () => {
    
    await req()   
      

  };



// Função para realizar a requisição ao backend
  const req = async () => {
    try {
    const auth = token
    const response = await api.get(`/login/autenticateAccountEmail`,
      {
        headers: {
          Authorization: `Bearer ${auth}`, // Passando um token de autorização
          "Content-Type": "application/json", // Exemplo de outro cabeçalho, se necessário
        }
      }
    );
    setData(response)
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro na requisição:", error.message);
    return [];
  }
  };
  
  return (
    <Container>
      <VideoBg autoPlay loop muted playsInline>
          <source src="/assets/quarto.mp4"></source>
      </VideoBg>
      <VideoBgColor></VideoBgColor>
      {data ? <pre>

      <ContainerIntern>
        <Title>Conta Autenticada</Title>        
        <Form>          
          <Link href={`/Login`}>
          <Button title="Login" variant="secondary"/>

          </Link>
        </Form>
      </ContainerIntern>
      </pre>: <ContainerIntern>
        <Title2>Erro Conta não Autenticada</Title2>        
        
      </ContainerIntern>}
    </Container>
  );
}
