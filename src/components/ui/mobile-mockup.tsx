import React from "react";

interface MobileMockupProps {
  image?: string;
}

const MobileMockup = ({ image }: MobileMockupProps) => {
  return (
    <div className="relative flex justify-center h-[300px] w-[160px] border-4 border-black rounded-2xl bg-gray-50 overflow-hidden">
      {/* Top notch */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 border border-black bg-black w-20 h-2 rounded-b-xl" />

      {/* Right-side buttons */}
      <span className="absolute -right-2 top-14 border-4 border-black h-7 rounded-md" />
      <span className="absolute -right-2 bottom-36 border-4 border-black h-10 rounded-md" />

      {/* Image */}
      {image && (
        <img
          src={image}
          alt="Mobile Mockup"
          className="h-full w-full object-cover rounded-2xl"
        />
      )}
    </div>
  );
};

export default MobileMockup;
