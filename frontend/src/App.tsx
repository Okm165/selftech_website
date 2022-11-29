import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import "./index.css";
import Footer from "components/Footer";

const Header = lazy(() => import("components/Header"));
const HeaderThin = lazy(() => import("components/HeaderThin"));
const Home = lazy(() => import("components/Home"));
const Gallery = lazy(() => import("components/Gallery"));

const App: Component<{}> = () => {
    return (
        <main class="min-h-screen-[] m-0 flex flex-col bg-red-50 p-0">
            <Routes>
                <Route path="/" element={
                    <>
                        <Header />
                        <div class="gradient min-h-screen flex-1 py-10">
                            <Home />
                        </div>
                    </>
                } />
                <Route path="/:id" element={
                    <>
                        <HeaderThin />
                        <div class="gradient min-h-screen flex-1 py-10">
                            <Gallery />
                        </div>
                    </>
                } />
            </Routes>
            <Footer />
        </main>
    )
};

export default App;