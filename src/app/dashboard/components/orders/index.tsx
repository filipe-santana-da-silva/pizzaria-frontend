'use client'
import { use } from 'react'
import styles from './styles.module.scss'
import { RefreshCcw } from 'lucide-react'
import { OrderProps } from '@/lib/order.type'
import { Modal } from '../modal'
import { OrderContent } from '@/providers/order'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Props{
    orders: OrderProps[]
}

export function Orders({ orders }: Props){
    const { isOpen, onRequestOpen } = use(OrderContent);
    const router = useRouter();

    async function handleDetailOrder(order_id: string){
        onRequestOpen(order_id);
    }

    function handleRefresh(){
        router.refresh();
        toast.success("Pedidos atualizados com sucesso!")
    }
    return (
        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>
                    <h1>Últimos Pedidos</h1>
                    <button onClick={handleRefresh}>
                        <RefreshCcw size={24} color="#3fffa3"/>
                    </button>
                </section>
                <section className={styles.listOrders}>
                    {orders.length === 0 && (
                        <span className={styles.emptyItem}>Nenhum Pedido Aberto no momento...</span>
                    )}
                    {orders.map( order => (
                        <button key={order.id} className={styles.orderItem} onClick={() => handleDetailOrder(order.id)}>
                            <div className={styles.tag}></div>
                            <span>Mesa {order.table}</span>
                        </button>
                    ))}
                </section>
            </main>
            { isOpen && <Modal/> }
        </>
    )
}