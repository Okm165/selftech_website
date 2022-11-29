import { Component, JSX, JSXElement } from "solid-js";
import { Switch, Match } from "solid-js";
import Button from "@suid/material/Button";
import { A } from "@solidjs/router";
import { titleMapping } from "models";

export enum TileSide {
  Left,
  Right,
}

export interface TileProps {
  side: TileSide;
  directory: string;
}

const Tile: Component<JSX.HTMLAttributes<HTMLDivElement> & TileProps> = (
  props
) => {
  return (
    <div class="flex flex-row items-center py-5">
      <Switch>
        <Match when={props.side == TileSide.Left}>
          <TileText
            class="flex-[1]"
            header={
              titleMapping[props.directory as keyof typeof titleMapping].header
            }
            link={props.directory}
          >
            {titleMapping[props.directory as keyof typeof titleMapping].text}
          </TileText>
          <TileImg src={titleMapping[props.directory as keyof typeof titleMapping].tiles} side={props.side} />
        </Match>
        <Match when={props.side == TileSide.Right}>
          <TileImg src={titleMapping[props.directory as keyof typeof titleMapping].tiles} side={props.side} />
          <TileText
            class="flex-[1]"
            header={
              titleMapping[props.directory as keyof typeof titleMapping].header
            }
            link={props.directory}
          >
            {titleMapping[props.directory as keyof typeof titleMapping].text}
          </TileText>
        </Match>
      </Switch>
    </div>
  );
};

export default Tile;

export interface TileTextProps {
  header?: JSXElement;
  children?: JSXElement;
  link: string;
}

const TileText: Component<
  JSX.HTMLAttributes<HTMLDivElement> & TileTextProps
> = (props) => {
  return (
    <div class={"flex flex-col p-10 text-lg font-medium " + props.class}>
      <div class="flex-1">
        <div class="text-2xl">{props.header}</div>
        <div>{props.children}</div>
      </div>
      <div class="center p-5">
        <Button size="large" variant="text">
          <A href={"/" + props.link}>Zobacz więcej!</A>
        </Button>
      </div>
    </div>
  );
};

export interface TileImgProps {
  side: TileSide;
  src: string;
}

const TileImg: Component<JSX.HTMLAttributes<HTMLDivElement> & TileImgProps> = (
  props
) => {
  return (
    <div class="hidden flex-1 sm:block">
      <Switch>
        <Match when={props.side == TileSide.Left}>
          <img src={props.src} class={"image_clip image_clip_right"} />
        </Match>
        <Match when={props.side == TileSide.Right}>
          <img src={props.src} class={"image_clip image_clip_left"} />
        </Match>
      </Switch>
    </div>
  );
};
