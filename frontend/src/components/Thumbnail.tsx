import { Component, createSignal, Show } from "solid-js";
import {
    Card,
    CardMedia,
} from "@suid/material"
import { resources, quality, thumbnail, tiles } from "api";

const Thumbnail: Component<{ url: string }> = (props) => {
    const [show, setShow] = createSignal<boolean>(false)

    return (
        <>
            <Card sx={{ display: "inline-block", m: 1, cursor: "pointer", flexShrink: 0 }} onClick={(e) => { setShow(true) }}>
                <CardMedia component="img" src={resources + thumbnail + props.url} sx={{ width: 200, height: 200 }} />
            </Card>
            <Show when={show()}>
                <div class="image_quality fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center" onClick={(e) => { setShow(false) }}>
                    <div>
                        <img class="ml-auto mr-auto" src={resources + quality + props.url}/>
                    </div>
                </div>
            </Show>
        </>

    )
}

export default Thumbnail
