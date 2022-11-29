import { Component, JSX } from "solid-js";

const HeaderThin: Component<JSX.HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div class="header_background flex min-h-[200px] flex-row items-center justify-around truncate bg-slate-900 p-1 text-slate-100 shadow-inner">
      <div class="p-1">
        <div class="p-2 text-7xl font-extrabold">SELFTECH</div>
        <div class="flex flex-row justify-end p-2 text-right font-['Tangerine-Bold'] text-3xl font-light">
          <div class="px-1.5">Dariusz Nowak</div>
          <div class="px-1.5">i</div>
          <div class="px-1.5">Synowie</div>
        </div>
      </div>
    </div>
  );
};

export default HeaderThin;
