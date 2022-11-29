import { Route, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import "./index.css";
import Header from "components/Header";
import Footer from "components/Footer";

const Home = lazy(() => import("components/Home"));
const Gallery = lazy(() => import("components/Gallery"));

const App: Component<{}> = () => {
    return (
        <main class="min-h-screen-[] m-0 flex flex-col bg-red-50 p-0">
            <Header />
            <div class="gradient min-h-screen flex-1 py-10">
                <Routes>
                    <Route path="/" component={Home} />
                    <Route path="/:id" component={Gallery} />
                </Routes>
            </div>
            <Footer />
        </main>
    )
};

export default App;