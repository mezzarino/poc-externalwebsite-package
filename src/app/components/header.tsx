import getHeaderNonce from "./nonce-value";

const Header = (props: { title: string }) => {
    const nonceValue = getHeaderNonce as unknown as string;

    return (
        <div nonce={nonceValue}>
            <h1 className="mx-auto text-center text-6xl font-bold tracking-tight text-black sm:text-7xl lg:text-8xl xl:text-8xl">
                {props.title}
            </h1>
        </div>
    );
}

export default Header;