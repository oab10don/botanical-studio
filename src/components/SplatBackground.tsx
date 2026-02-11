"use client";

import { useEffect } from "react";

/**
 * 3D Gaussian Splat を body 直下の全画面キャンバスとして描画するコンポーネント。
 * /test ページと同一の方式（rootElement 無し → ライブラリが body にキャンバス追加）。
 * position: fixed でビューポート上部に固定し、z-index で他コンテンツの背面に配置。
 */
export default function SplatBackground({ url }: { url: string }) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let viewer: any = null;
    let disposed = false;

    (async () => {
      const mod = await import("@mkkellogg/gaussian-splats-3d");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const GS3D = (mod as any).default ?? mod;

      if (disposed) return;

      viewer = new GS3D.Viewer({
        selfDrivenMode: true,
        useBuiltInControls: true,
        cameraUp: [0, 1, 0],
        initialCameraPosition: [0, 0.5, 3.5],
        initialCameraLookAt: [0, -0.8, 0],
        sharedMemoryForWorkers:
          typeof crossOriginIsolated !== "undefined" && crossOriginIsolated,
      });

      // ライブラリが作る rootElement を固定位置に変更
      // デフォルトは position:absolute で top/left 未設定のため
      // React コンテンツの後方（画面外）に配置されてしまう問題を修正
      const root = viewer.rootElement;
      if (root) {
        root.style.position = "fixed";
        root.style.top = "0";
        root.style.left = "0";
        root.style.zIndex = "1";
      }

      // position 変更後のカメラアスペクト比を補正
      if (viewer.camera && root) {
        viewer.camera.aspect = root.offsetWidth / root.offsetHeight;
        viewer.camera.updateProjectionMatrix();
      }

      await viewer.addSplatScene(url, {
        showLoadingUI: false,
        splatAlphaRemovalThreshold: 5,
      });

      if (disposed) return;

      viewer.start();

      // コントロール設定: 回転のみ、ズーム・パン無効
      if (viewer.controls) {
        viewer.controls.enablePan = false;
        viewer.controls.enableZoom = false;
        viewer.controls.autoRotate = true;
        viewer.controls.autoRotateSpeed = 0.6;
        viewer.controls.maxPolarAngle = Math.PI * 0.75;
        viewer.controls.minPolarAngle = Math.PI * 0.25;
      }

      // タップで注視点がずれる問題を防止（毎フレーム固定位置にリセット）
      // initialCameraLookAt と同じ値にすることで、モデルがビューポート上部に表示される
      function lockTarget() {
        if (disposed) return;
        if (viewer?.controls) {
          viewer.controls.target.set(0, -0.8, 0);
        }
        requestAnimationFrame(lockTarget);
      }
      lockTarget();
    })();

    return () => {
      disposed = true;
      try {
        viewer?.dispose();
      } catch {
        /* ignore */
      }
    };
  }, [url]);

  return null;
}
