import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

const exportGLTF = (scene) => {
    return new Promise((resolve, reject) => {
        const exporter = new GLTFExporter();
        exporter.parse(
            scene,
             gltf => {
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/octet-stream' });
           resolve(blob);
            
             },
            error => reject(error),

            {binary: false}

        );
    });
}

export default exportGLTF;