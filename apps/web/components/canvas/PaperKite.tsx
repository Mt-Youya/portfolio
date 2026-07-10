"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

function KiteMesh() {
  const group = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const elapsed = useRef(0)

  useFrame((state, delta) => {
    if (!group.current) {
      return
    }
    elapsed.current += delta
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.05)
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.05)
    group.current.rotation.y = mouse.current.x * 0.35
    group.current.rotation.x = -mouse.current.y * 0.2 + Math.sin(elapsed.current * 0.4) * 0.05
    group.current.position.y = Math.sin(elapsed.current * 0.6) * 0.08
  })

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const verts = new Float32Array([
      0, 1.4, 0,
      -1, 0, 0.15,
      1, 0, 0.15,
      0, -1.2, 0,
    ])
    g.setAttribute("position", new THREE.BufferAttribute(verts, 3))
    g.setIndex([0, 1, 2, 1, 2, 3])
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#1e4fd8" wireframe transparent opacity={0.55} />
      </mesh>
      <lineSegments geometry={new THREE.EdgesGeometry(geometry)}>
        <lineBasicMaterial color="#1e4fd8" />
      </lineSegments>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([0, -1.2, 0, 0, -2.4, 0.4]), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1e4fd8" transparent opacity={0.5} />
      </line>
    </group>
  )
}

export default function PaperKite() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <KiteMesh />
    </Canvas>
  )
}
