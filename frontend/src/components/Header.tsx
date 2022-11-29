import { Component, JSX } from "solid-js";

const Header: Component<JSX.HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div class="header_background flex min-h-[600px] flex-row items-center justify-around truncate bg-slate-900 p-1 text-slate-100 shadow-inner">
      <div class="p-1">
        <div class="p-2 text-7xl font-extrabold">SELFTECH</div>
        <div class="flex flex-row justify-end p-2 text-right font-['Tangerine-Bold'] text-3xl font-light">
          <div class="px-1.5">Dariusz Nowak</div>
          <div class="px-1.5">i</div>
          <div class="px-1.5">Synowie</div>
        </div>
      </div>
      <div class="hidden flex-[0.6] flex-row flex-wrap text-2xl font-medium sm:flex">
        <span class="p-3">instalacje fotowoltaiczne</span>
        <span class="p-3">on-grid</span>
        <span class="p-3">off-grid</span>
        <span class="p-3">alarmy</span>
        <span class="p-3">monitoring</span>
        <span class="p-3">strony internetowe</span>
        <span class="p-3">chmury plików</span>
        <span class="p-3">oprogramowanie</span>
      </div>
    </div>
  );
};

export default Header;
