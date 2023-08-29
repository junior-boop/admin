import Container from "./container";

export default function ListeItems({children}){
    return(
        <div>
            <Container>
                <div className="rounded-xl border border-slate-200 w-full overflow-hidden">
                    {children}
                </div>
            </Container>
        </div>
    )
}