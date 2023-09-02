import Container from "./container";

export default function ListeItems({children}){
    return(
        <div>
            <div className=" w-full overflow-hidden">
                {children}
            </div>
        </div>
    )
}