import { Editor } from "./components/Editor";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 p-8 text-zinc-900">
      {/* <div className="mx-auto grid min-h-[700px] w-full grid-cols-[16rem_1fr] overflow-hidden rounded-xl border border-black/20 bg-white shadow-sm"></div> */}
      <div className="mx-auto min-h-[700px] w-full overflow-hidden rounded-xl border border-black/20 bg-white shadow-sm">
        {/* <aside className="border-r border-r-zinc-100 bg-zinc-50 p-4"> */}
        <div className="flex gap-2 p-2">
          <button
            title="decorative button"
            className="h-3 w-3 rounded-full bg-red-400"
          />
          <button
            title="decorative button"
            className="h-3 w-3 rounded-full bg-yellow-400"
          />
          <button
            title="decorative button"
            className="h-3 w-3 rounded-full bg-green-400"
          />
        </div>
        {/* </aside> */}
        <main className="p-4">
          <Editor />
        </main>
      </div>
    </div>
  );
}
//video https://www.youtube.com/live/-SDxID3BS4I?si=r8ATIspQk3F01ETw
export default App;
