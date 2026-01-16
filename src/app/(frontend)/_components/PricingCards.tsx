/* eslint-disable @typescript-eslint/no-explicit-any */

export default function PricingCards({ page }: { page: any }) {
  const specialPricing = page?.specialPricing

  // console.log(specialPricing)
  return (
    <section className="grid grid-cols-3 max-sm:grid-cols-1 justify-center gap-4 max-sm:gap-5 px-6 w-full mb-20">
      {specialPricing.map((item: any) => (
        <PriceCard
          key={item.id}
          value={item.value}
          title={item.title}
          price={`৳${item.price}`}
          offerPrice={`৳${item.offerPrice}`}
          highlight={item.highlight || false} // optional logic for highlight
        />
      ))}
      {/* <PriceCard value="Single" title="Premium Turtleneck" price="৳1200" offerPrice="৳1000" />
      <PriceCard
        value="Best Value"
        title="2 Piece Combo"
        price="৳2000"
        offerPrice="৳1800"
        highlight
      />
      <PriceCard value="Combo 3" title="Combo 3" price="৳2500" offerPrice="৳2200" /> */}
    </section>
  )
}

function PriceCard({
  value,
  title,
  price,
  offerPrice,
  highlight,
}: {
  value: string
  title: string
  price?: string
  offerPrice?: string
  highlight?: boolean
}) {
  return (
    <div
      className={` rounded-xl text-center shadow-lg flex flex-col justify-center items-center w-full p-10 ${
        highlight
          ? 'bg-[linear-gradient(135deg,var(--secondary),var(--accent))] text-white'
          : 'bg-white'
      }`}
    >
      <p className="text-md font-semibold bg-(--accent) p-3 px-5 rounded-full mb-3">{value}</p>
      <p className="text-2xl font-normal font-playfair">{title}</p>
      <p className="text-lg font-normal mt-2 line-through">{price}</p>
      <p className="text-4xl font-bold mt-2 linethrough">{offerPrice}</p>
    </div>
  )
}
