declare module "@mkkellogg/gaussian-splats-3d" {
  import * as THREE from "three";

  export const RenderMode: {
    Always: 0;
    OnChange: 1;
    Never: 2;
  };

  export const SceneRevealMode: {
    Default: 0;
    Gradual: 1;
    Instant: 2;
  };

  export const LogLevel: {
    None: 0;
    Error: 1;
    Warning: 2;
    Info: 3;
    Debug: 4;
  };

  export interface ViewerOptions {
    threeScene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    camera?: THREE.Camera;
    rootElement?: HTMLElement;
    selfDrivenMode?: boolean;
    useBuiltInControls?: boolean;
    renderMode?: number;
    sceneRevealMode?: number;
    logLevel?: number;
    gpuAcceleratedSort?: boolean;
    cameraUp?: [number, number, number];
    initialCameraPosition?: [number, number, number];
    initialCameraLookAt?: [number, number, number];
  }

  export interface SplatSceneOptions {
    showLoadingUI?: boolean;
    splatAlphaRemovalThreshold?: number;
    position?: [number, number, number];
    rotation?: [number, number, number, number];
    scale?: [number, number, number];
    progressiveLoad?: boolean;
    onProgress?: (
      percent: number,
      percentLabel: string,
      loaderStatus: number
    ) => void;
  }

  export class Viewer {
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer;
    controls: {
      target: THREE.Vector3;
      update: () => void;
      autoRotate: boolean;
      autoRotateSpeed: number;
    };
    splatMesh: THREE.Mesh;

    constructor(options?: ViewerOptions);
    addSplatScene(
      path: string,
      options?: SplatSceneOptions
    ): Promise<void>;
    start(): void;
    stop(): void;
    dispose(): Promise<void>;
    update(): void;
    render(): void;
  }

  export class DropInViewer extends THREE.Group {
    constructor(options?: Partial<ViewerOptions>);
    addSplatScene(
      path: string,
      options?: SplatSceneOptions
    ): Promise<void>;
    update(
      renderer: THREE.WebGLRenderer,
      camera: THREE.Camera
    ): void;
    dispose(): Promise<void>;
  }
}
