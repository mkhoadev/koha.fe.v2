import { SpinePlayer } from "@esotericsoftware/spine-player";
import { useRef } from "react";

export const Character = () => {
  const containerRef = useRef(null);
  var jsonUrl = "/public/files/spineboy-pro.json";
  var atlasUrl = "/public/files/spineboy-pro.atlas";

  new SpinePlayer(containerRef, {
    jsonUrl: jsonUrl,
    atlasUrl: atlasUrl,
    animation: "jump",
    premultipliedAlpha: true,
    backgroundColor: "#cccccc",
  });

  return <div ref={containerRef} id="player-container"></div>;
};
