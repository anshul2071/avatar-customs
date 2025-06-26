import { Suspense, use, useRef} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import useAvatarStore from "@/store/store";


const BaseModel = () => {
    const {scene} = useGLTF('/models/baseAvatar.glb');
    return <primitive object={scene} />;
}


const AssetModel = ({asset}) => {
    const gltf = useGLTF(asset.storagePaht || asset.url);
    gltf.scene.traverse(node => {
        if(node.isMesh && asset.color) {
            node.material.color.set(asset.color);
        }
    })
    return <primitive object={gltf.scene.clone()} />;
}


export default function AvatarScene() {

    const selections = useAvatarStore(state => state.selections);
    const sceneRef = useRef();


    useFrame(() => {
        if(sceneRef.current) {
            sceneRef.current.rotation.y += 0.01
        }
    })


    return (
        <Canvas
           shadows
           camera={{ position: [0,1.5,3], fov: 50 }} ref={sceneRef}
           >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
                <BaseModel />
                <Environment preset="studio"/>
                {Object.entries(selections).map(([category, asset]) => (
                    <AssetModel key={category} asset={asset} />
                ))}
            </Suspense>
            <OrbitControls enableZoom={false} />
           </Canvas>
    )
}