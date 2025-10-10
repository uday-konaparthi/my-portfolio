import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import styles from "./DisplacementSphere.module.css";
import { useSelector } from "react-redux";

export const DisplacementSphere = (props) => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const sphereRef = useRef();
  const uniformsRef = useRef();
  const mouseRef = useRef(new THREE.Vector2(0.8, 0.5));
  const rotationRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();
  const startTimeRef = useRef(Date.now());
  const [visible, setVisible] = useState(false);
  const dark = useSelector((state) => state.theme.dark);

  // Initialize Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { innerWidth, innerHeight } = window;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true,
    });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    rendererRef.current = renderer;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      54,
      innerWidth / innerHeight,
      0.1,
      100
    );
    camera.position.z = 52;
    cameraRef.current = camera;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Uniforms
    const uniforms = {
      time: { value: 0 },
      diffuse: {
        value: new THREE.Color(dark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"),
      }, // white / black
      emissive: {
        value: new THREE.Color(dark ? "rgb(34, 34, 34)" : "rgb(0, 0, 0)"),
      }, // dark gray / black
      specular: { value: new THREE.Color("rgb(17, 17, 17)") },
      shininess: { value: 30 },
      opacity: { value: 1.0 },
    };

    uniformsRef.current = uniforms;

    // Material
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Geometry (optimize subdivisions for mobile)
    const isMobile = innerWidth < 768;
    const geometry = new THREE.SphereGeometry(
      32,
      isMobile ? 48 : 128,
      isMobile ? 48 : 128
    );
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(22, 16, 0);
    sphereRef.current = sphere;
    scene.add(sphere);

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(100, 100, 200);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Show after initialization
    setTimeout(() => setVisible(true), 100);

    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      if (sphereRef.current) {
        sphereRef.current.geometry.dispose();
        sphereRef.current.material.dispose();
        scene.remove(sphereRef.current);
      }

      renderer.dispose();
    };
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      const adjustedHeight = innerHeight + innerHeight * 0.3;

      if (rendererRef.current) {
        rendererRef.current.setSize(innerWidth, adjustedHeight);
      }
      if (cameraRef.current) {
        cameraRef.current.aspect = innerWidth / adjustedHeight;
        cameraRef.current.updateProjectionMatrix();
      }

      // Sphere position responsive
      if (sphereRef.current) {
        const width = window.innerWidth;
        const minWidth = 360;
        const maxWidth = 1920;

        // normalize width between 0 and 1
        const t = Math.min(Math.max((width - minWidth) / (maxWidth - minWidth), 0), 1);

        // interpolate between small-screen and large-screen positions
        const x = 10 + (22 - 10) * t;
        const y = 7 + (16 - 7) * t;

        sphereRef.current.position.set(x, y, 0);
      }

    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;

      mouseRef.current.set(x, y);
      rotationRef.current.x = y / 2;
      rotationRef.current.y = x / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate
  useEffect(() => {
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (
        uniformsRef.current &&
        sphereRef.current &&
        rendererRef.current &&
        sceneRef.current &&
        cameraRef.current
      ) {
        uniformsRef.current.time.value =
          0.00005 * (Date.now() - startTimeRef.current);

        sphereRef.current.rotation.z += 0.001;
        sphereRef.current.rotation.x = rotationRef.current.x;
        sphereRef.current.rotation.y = rotationRef.current.y;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Update uniforms when theme changes
  useEffect(() => {
    if (uniformsRef.current) {
      uniformsRef.current.diffuse.value.set(dark ? 0xffffff : 0x000000);
      uniformsRef.current.emissive.value.set(dark ? 0x222222 : 0x000000);
    }
  }, [dark]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`${styles.canvas} `}
      data-visible={visible}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      {...props}
    />
  );
};

export default DisplacementSphere;
