
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-6xl bold text-center w-full">
          Truck Stop Fitness  
        </div> 
        <div className="text-center">
          If you are a trucker, and are into fitness, we would love your feedback!<br></br><br></br>
          We want to create micro-gyms at truck stops <br></br>so truckers can catch a good break from sitting all day!
        </div> 
        <div className="flex flex-col items-center w-full">
        <a href="https://forms.gle/oyngNsLpGQ4FBzzD8" target="_blank">
          <div className="bg-blue-800 p-4 rounded-xl text-center">
            Fill out this form
          </div>
        </a>    
        </div>  
      </main>
    </div>
  );
}
