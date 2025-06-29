import { Suspense, useRef} from "react";
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


function RotatingGroup () {
    const ref = useRef();
    const selections = useAvatarStore(state => state.selections);

    useFrame(() => {
        if(ref.current) {
            ref.current.rotation.y += 0.01;
        }
    })

    return (
        <group ref={ref}>
            <BaseModel />
            {Object.entries(selections).map(([category, asset]) => (
                <AssetModel key={category} asset={asset} />
            ))}
        </group>
    );

}
 
export default function AvatarScene() {


    return (
        <Canvas
           shadows
           camera={{ position: [0,1.5,3], fov: 50 }}
           >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
               <RotatingGroup/>
                <Environment preset="studio"/>
               
            </Suspense>
            <OrbitControls enableZoom={false} />
           </Canvas>
    );
}