'use client';

import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import { Suspense } from 'react';
import HeroLights from "@/components/models/hero_models/HeroLights";
import Particles from "@/components/models/hero_models/Particles";
import {Room} from "@/components/models/hero_models/Room";

// Dynamically import Three.js components with SSR disabled
const Canvas = dynamic(
    () => import('@react-three/fiber').then((mod) => mod.Canvas),
    { ssr: false }
);

const OrbitControls = dynamic(
    () => import('@react-three/drei').then((mod) => mod.OrbitControls),
    { ssr: false }
);

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={0.2} color="#1a1a40" />
            <OrbitControls
                enablePan={false}
                enableZoom={!isTablet}
                maxDistance={20}
                minDistance={5}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />
            <Suspense fallback={null}>
                <Particles count={100} />
                <group
                    scale={isMobile ? 0.7 : 1}
                    position={[0, -3.5, 0]}
                    rotation={[0, -Math.PI / 4, 0]}
                >
                </group>
            </Suspense>
        </Canvas>
    );
};

export default HeroExperience;