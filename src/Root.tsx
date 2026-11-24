import React from "react";
import { Composition } from "remotion";
import { JakartaFloodVideo9x16 } from "./JakartaFloodVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="JakartaFloodExplainer9x16"
        component={JakartaFloodVideo9x16}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
