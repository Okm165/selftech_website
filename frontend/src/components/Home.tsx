import { Component, JSX } from "solid-js";
import Tile, { TileSide } from "components/Tile";

const Home: Component<JSX.HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div>
      <Tile
        side={TileSide.Left}
        directory="instalacje_dachowe"
      />
      <Tile
        side={TileSide.Right}
        directory="instalacje_wolnostojace"
       />
      <Tile
        side={TileSide.Left}
        directory="inwertery"
       />
      <Tile
        side={TileSide.Right}
        directory="offgrid"
       />
      <Tile
        side={TileSide.Left}
        directory="monitoring_sieci"
       />
    </div>
  );
};

export default Home;
