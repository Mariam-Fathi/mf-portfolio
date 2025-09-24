'use client';

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "three";
import { Points as PointsElement, PointMaterial } from "@react-three/drei";

const Particles = ({ count = 200 }) => {
    const pointsRef = useRef<Points>(null!);

    const { positions, speeds } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = Math.random() * 10 + 5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            speeds[i] = 0.005 + Math.random() * 0.001;
        }

        return { positions, speeds };
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current) return;

        const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            let y = positionsArray[i * 3 + 1];
            y -= speeds[i];
            if (y < -2) y = Math.random() * 10 + 5;
            positionsArray[i * 3 + 1] = y;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <PointsElement ref={pointsRef} positions={positions}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </PointsElement>
    );
};

export default Particles;