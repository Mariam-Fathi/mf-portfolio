"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Portfolio <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Mariam Fathi{" "}
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`/MF2.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
