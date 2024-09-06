import { CardItem } from "@/components/cardItem"
import "./carditem.css"

export default function Productos({params}) {
    const {productoid} = params
    
    return (
        <div className="padre-card-item">
            <CardItem idparams={productoid} />
        </div>
    )
}