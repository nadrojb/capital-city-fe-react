export function Header({country}) {
    return (
        <>
        <div className="text-white">
            <h1 className="text-3xl">What is the capital city of:</h1>
            <h2 className="text-2xl mt-4">{country}</h2>
        </div>
        </>
    )
}