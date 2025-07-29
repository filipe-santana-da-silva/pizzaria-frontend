
import styles from '@/app/page.module.scss';
import logoImg from '../../../public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
//import { useState } from 'react';
import { api } from '@/services/api'
import { redirect } from 'next/navigation';

export default function SignUp() {
//    const [username, setUserName] = useState("");

    async function handleRegister(formData: FormData){
        'use server'
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        if(name === "" || email === "" || password === ""){
            console.log("Preencha todos os campos")
            return;
        }
        try{
            await api.post("/users",{
                name,
                email,
                password
            })
        } catch(err){
            console.log("error")
            console.log(err)
        }
        redirect("/")
    }
  return (
    <>
      <div className={styles.containerCenter}>
       <Image src={logoImg} alt='Logo da pizzaria'/>
        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action={handleRegister}>
            <input type='text'
            required
            name='name'
            placeholder='Digite o seu nome...'
            className={styles.input}/>

            <input type='email'
            required
            name='email'
            placeholder='Digite o seu email...'
            className={styles.input}/>

            <input type='password'
            required
            name='password'
            placeholder='Digite a sua senha...'
            className={styles.input}/>

            <button type='submit'>
              Cadastrar
            </button>
          </form>

          <Link href="/" className={styles.text}>Já possui uma conta? Faça o Login</Link>
        </section>
      </div>
    </>
  );
}
