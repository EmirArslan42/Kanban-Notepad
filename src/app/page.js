import Board from "@/app/Board/page";
export default function Home() {
  return (
    <div className="pl-5 pr-5 md:pl-14 md:pr-14">
      <div>
        <div className="text-center text-2xl font-semibold p-3">Regular Show</div>
        <Board />
      </div>
    </div>
  );
}
