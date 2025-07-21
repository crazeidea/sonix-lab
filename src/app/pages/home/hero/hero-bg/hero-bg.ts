import {
  afterNextRender,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-hero-bg',
  imports: [],
  template: ``,
  host: {
    style: `width: 100%; height: 100%; position: absolute; top: 0; left: 0; overflow: hidden;`,
  },
})
export class HeroBg {
  private readonly elementRef = inject(ElementRef);

  renderer: THREE.WebGLRenderer | null = null;
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  particleSystem: THREE.Points | null = null;
  particleGeometry: THREE.BufferGeometry | null = null;

  velocities: THREE.Vector3[] = [];

  animationId = 0;
  maxFrames = 300; // Limit to 1000 frames

  constructor() {
    afterNextRender(() => {
      this.initialize();
      this.animate();
    });
  }

  initialize() {
    const width = this.elementRef.nativeElement.clientWidth;
    const height = this.elementRef.nativeElement.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.elementRef.nativeElement.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    this.camera.position.set(8, 8, 10);

    /** Particle 생성 */
    const particleCount = 5000;
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push((Math.random() - 0.5) * 10); // X Axis
      positions.push((Math.random() - 0.5) * 10); // Y Axis
      positions.push((Math.random() - 0.5) * 10); // Z Axis

      colors.push(1.0, 0.8 + Math.random() * 0.1, 0.5 + Math.random() * 0.2);

      this.velocities.push(
        new THREE.Vector3(
          Math.random() * 0.04 + 0.01,
          Math.random() * 0.02 + 0.01,
          Math.random() * 0.01
        )
      );
    }

    this.particleGeometry = new THREE.BufferGeometry();
    this.particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.particleGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );

    const material = new THREE.PointsMaterial({
      size: 0.1,
      opacity: 0.4,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particleSystem = new THREE.Points(this.particleGeometry, material);

    this.scene.add(this.particleSystem);
  }

  animate() {
    if (!this.renderer || !this.scene || !this.camera) {
      console.warn('Renderer, scene, or camera not initialized');
      return;
    }

    this.animationId = requestAnimationFrame(() => this.animate());

    const positions = this.particleGeometry?.attributes[
      'position'
    ] as THREE.BufferAttribute;

    for (let i = 0; i < positions.count; i++) {
      const idx = i * 3;

      positions.array[idx] += this.velocities[i].x;
      positions.array[idx + 1] += this.velocities[i].y;
      positions.array[idx + 2] += this.velocities[i].z;
    }

    positions.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }
}
