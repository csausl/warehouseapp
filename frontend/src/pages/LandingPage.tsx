export type LandingPageProps = {
    username: string|undefined|null,

}

export default function LandingPage(props: LandingPageProps) {

    return(
        <>
            <h1>Welcome To Login!</h1>
            <h2>{props.username}</h2>
        </>
    )
}