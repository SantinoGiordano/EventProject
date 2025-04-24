import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="pt-18" />
      <div className="bg-orange-50 min-h-screen flex justify-center items-start">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 w-full max-w-7xl">
          <div className="w-full text-center">
            <h3 className="text-3xl font-semibold mb-2 text-stone-700">
              Studying
            </h3>
            <Image
              src="/studying.jpg"
              alt="Studying"
              width={700}
              height={300}
              className="rounded-md shadow-md w-full h-auto"
            />
           <p className="mt-4 text-stone-600 text-base leading-relaxed text-justify">
              Maximize your study sessions with smart scheduling. This planner
              app helps you stay focused, break down your tasks, and track
              progress—so you’re always learning efficiently and never cramming
              last minute.
            </p>
          </div>
          <div className="w-full text-center">
            <h3 className="text-3xl font-semibold mb-2 text-stone-700">
              Meeting
            </h3>
            <Image
              src="/meeting.jpg"
              alt="Meeting"
              width={400}
              height={200}
              className="rounded-md shadow-md w-full h-auto"
            />
            <p className="mt-4 text-stone-600 text-base leading-relaxed text-justify">
              Stay on top of all your work meetings with ease. This planner app
              ensures you’re always prepared and punctual, helping you balance
              collaboration and productivity like a pro.
            </p>
          </div>
          <div className="w-full text-center">
            <h3 className="text-3xl font-semibold mb-2 text-stone-700">
              Shopping
            </h3>
            <Image
              src="/shopping.jpg"
              alt="Shopping"
              width={400}
              height={200}
              className="rounded-md shadow-md w-full h-auto"
            />
            <p className="mt-4 text-stone-600 text-base leading-relaxed text-justify">
              Never miss a deal or forget an item again. With this planner app,
              your shopping trips become organized, stress-free, and efficient.
              Whether it’s groceries or gifts, you’ll always be a step ahead.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
