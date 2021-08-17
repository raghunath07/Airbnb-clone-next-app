import { format } from "date-fns"
import { useRouter } from "next/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard"
import Map from "../components/Map"

function Search({result}) {
    const router = useRouter()
    const {location, startDate, endDate, guests} = router.query
    const formatedSDate = format(new Date(startDate), "dd MMMM yy")
    const formatedEDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formatedSDate} - ${formatedEDate}`


    return (
        <div>
           <Header placeHolder={`${location} | ${range} | ${guests}`}/> 
           <main className="flex">
            <section className="flex-grow pt-14 px-6">
                <p className="text-xs ">300+ stays - {range} - for {guests} number of guests</p>
                <h1 className="text-3xl font-semibold mb-6 ">Stays in {location} </h1>
                <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                    <p className="button">Cancellation Flexibility</p>
                    <p className="button">Type of Place</p>
                    <p className="button">Price</p>
                    <p className="button">Rooms and Beds</p>
                    <p className="button">More filters</p>
                </div>
                <div className="flex flex-col">
                    {
                        result?.map(({img, location, title, description, price, total}) => {
                           return <InfoCard key={img} img={img} location={location} title={title} description={description} price={price} total={total}/>
                        })
                    }
                </div>
            </section>
            <section className="hidden xl:inline xl:min-w-[500px]">
                <Map result = {result}/>
            </section>
           </main>
           <Footer/>
        </div>
    )
}

export default Search

export async function getServerSideProps(context) {
    const result = await fetch("https://links.papareact.com/isz").then((res) => res.json())
    return {
        props : {
            result
        }
    }
}
