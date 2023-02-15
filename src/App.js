export default function App() {
  return (
    <div className="text-sm h-full w-full font-serif p-8">
      <div className="flex flex-col justify-between h-full">
        <dl className="[&>*:nth-child(4n-1)]:bg-neutral-900/50 [&>*:nth-child(4n)]:bg-neutral-900/50 grid auto-cols-auto grid-cols-4">
          {[
            {name: "Chess Coordinate Trainer", url: "/ChessCoordTrainer/", 
              desc: "Tool to help memorize the squares on a chess board."},
            {name: "SnakeGameJS", url: "/SnakeGameJs/", 
              desc: "The classic snake game written in javascript. Honestly, not the best version of this game."},
            {name: "Old jakethoffman.com", url: "/ArchivedWebpages/OldJakethoffman/public/", 
              desc: "A previous version of my personal website. Currently a little broken since I've converted to React."},
            {name: "Waves", url: "/Waves/", 
              desc: "Type something."},
            {name: "Words", url: "/Words/", 
              desc: "Write some words and I'll put them in a database."},
            {name: "Cube", url: "/Cube/", 
              desc: "CSS cube will follow you."},
            ].map((item) => 
              <>
                  <dt><a href={item.url} className="font-bold hover:text-neutral-300">{item.name}</a></dt>
                  <dd className="col-span-3">     {item.desc}</dd>
              </>
            )}
        </dl>
        <div>
            {[
              {url: "https://github.com/jakehffn", title: "@GitHub"},
              {url: "https://www.linkedin.com/in/jacob-t-hoffman/", title: "@LinkedIn"},
              {url: "https://twitter.com/jakehffn", title: "@Twitter"}
            ].map((link) => {return <a href={link.url} className="p-2 text-sm font-bold hover:text-neutral-300">{link.title}</a>})}
        </div>
      </div>
    </div>
  );
}