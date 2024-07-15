import { Editor } from "../components/Editor";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="/background.jpg"
        alt="Background"
      />
      <div className="relative min-h-screen p-8 text-zinc-900">
        <div className="mx-auto min-h-[700px] w-full overflow-hidden rounded-xl border border-black/20 bg-white shadow-sm">
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
          <main className="p-4">
            <Editor />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
