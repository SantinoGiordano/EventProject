import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="pt-18" />
      <div className="bg-orange-50 flex justify-center items-start">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 w-full max-w-7xl">
          <div className="w-full text-center">
            <h3 className="text-3xl font-semibold mb-2 text-stone-700">
              Studying
            </h3>
            <Image
              draggable="false"
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
              draggable="false"
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
              draggable="false"
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
      <hr />
      <div className="bg-orange-50 py-12 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-stone-800 mb-6 text-center">
          Creating Events
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-stone-700 leading-relaxed text-justify">
            With our intuitive scheduling feature, you can easily map out your
            entire day—whether it’s classes, work meetings, errands, or personal
            time. Our user-friendly interface makes it simple to create, edit,
            and manage events with just a few clicks. Color-coded tasks help you
            visualize your day at a glance, while smart notifications ensure you
            never miss a beat. Whether you’re balancing a hectic school schedule
            or juggling multiple deadlines at work, this planner adapts to your
            lifestyle. You can break your day into manageable chunks, prioritize
            tasks, and even block off time for breaks or self-care. Simply
            select your tasks, assign time slots, and let the planner organize
            everything for you. No more juggling sticky notes or forgetting
            important to-dos—our site keeps your schedule clear, connected, and
            totally customizable. It’s your time, your way—planned with purpose
            and designed for productivity.
          </p>
          <div className="mt-8 flex justify-center">
            <Image
              src="/create.jpg"
              alt="Create image"
              width={600}
              height={300}
              className="rounded-md shadow-md w-full max-w-xl h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
