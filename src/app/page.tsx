import Image from "next/image"
import Link from "next/link"
import styles from '@/app/page.module.scss';
import logoimg from '../../public/logo.svg'
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home(){

    async function handleLogin(formData: FormData){
        'use server'
        const email = formData.get("email")
        const password = formData.get("password")

        if(email === "" || password === ""){
            return;
        }

        try{
            const response = await api.post("/session", {
                email,
                password
            })

            if(!response.data.token){
                return;
            }

            console.log(response.data)
            const expressTime = 60 * 60 * 24 * 30 * 1000;
            const cookieStore = await cookies();
            cookieStore.set("session", response.data.token, {
                maxAge: expressTime,
                path: "/",
                httpOnly: false,
                secure: process.env.NODE_ENV === "production"
            })
        } catch(error){
            console.log(error)
            return;
        }
        redirect("/dashboard")
    }
    return(
        <>
            <main>
                <div className={styles.containerCenter}>
                <Image src={logoimg} alt='Logo da pizzaria'/>
                <section className={styles.login}>
                <form action={handleLogin}>
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
                    Acessar
                    </button>
                </form>

                <Link href="/signup" className={styles.text}>Não possui uma conta? Cadastre-se</Link>
                </section>
            </div>
            </main>
        </>
    )
}