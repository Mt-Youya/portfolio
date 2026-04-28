'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '@/store/useAppStore'

// 主几何体：线框正二十面体
function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    // 使用 getState() 避免订阅 Zustand 导致的 re-render
    const { mousePosition } = useAppStore.getState()
    // 持续缓慢旋转
    meshRef.current.rotation.x += delta * 0.12
    meshRef.current.rotation.y += delta * 0.18
    // 鼠标视差（lerp）
    meshRef.current.rotation.x += (mousePosition.y * 0.3 - meshRef.current.rotation.x) * 0.02
    meshRef.current.rotation.y += (mousePosition.x * 0.3 - meshRef.current.rotation.y) * 0.02
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  )
}

// 外层大球：极低不透明度，营造深度感
function OuterSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y -= delta * 0.05
    meshRef.current.rotation.x += delta * 0.03
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[4, 2]} />
      <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.07} />
    </mesh>
  )
}

// 环形结
function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    // 使用 getState() 避免订阅 Zustand 导致的 re-render
    const { mousePosition } = useAppStore.getState()
    meshRef.current.rotation.x += delta * 0.25
    meshRef.current.rotation.z += delta * 0.15
    meshRef.current.position.x += (mousePosition.x * 0.5 - meshRef.current.position.x) * 0.03
    meshRef.current.position.y += (mousePosition.y * 0.3 - meshRef.current.position.y) * 0.03
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[3.5, -1.5, -1]}>
        <torusKnotGeometry args={[0.6, 0.18, 80, 12]} />
        <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.5} />
      </mesh>
    </Float>
  )
}

// 粒子群：使用 drei <Points> + <PointMaterial> 简化实现
function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(180 * 3)
    for (let i = 0; i < 180; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        color="#f59e0b"
        size={0.06}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 1.5]}
      frameloop="demand"
    >
      {/* ambientLight 足够支撑 meshBasicMaterial；pointLight 留给未来切换材质用 */}
      <ambientLight intensity={0.3} />

      <Suspense fallback={null}>
        <Stars
          radius={80}
          depth={50}
          count={3000}
          factor={3}
          saturation={0}
          fade
          speed={0.3}
        />

        <IcosahedronMesh />
        <OuterSphere />
        <TorusKnotMesh />
        <ParticleField />
      </Suspense>
    </Canvas>
  )
}
