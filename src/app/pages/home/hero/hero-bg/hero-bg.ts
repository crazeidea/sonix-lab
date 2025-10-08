import {
  afterNextRender,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
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

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private geometry!: THREE.BufferGeometry;
  private velocities!: Float32Array;

  private particleCount = 5000;

  constructor() {}

  ngOnInit(): void {
    this.initThree();
    this.createParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    this.renderer.dispose();
    this.geometry.dispose();
    (this.particles.material as THREE.Material).dispose();
  }

  private initThree(): void {
    const width = this.elementRef.nativeElement.clientWidth;
    const height = window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 50;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.elementRef.nativeElement.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private createParticles(): void {
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    this.velocities = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    const color = new THREE.Color();

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;

      // Initial position (center of the explosion)
      positions[i3] = 0;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = 0;

      // Initial velocity (random direction for explosion)
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const speed = Math.random() * 5 + 2;

      this.velocities[i3] = Math.sin(theta) * Math.cos(phi) * speed;
      this.velocities[i3 + 1] = Math.sin(theta) * Math.sin(phi) * speed;
      this.velocities[i3 + 2] = Math.cos(theta) * speed;

      // Color
      color.setHSL(0.1 + Math.random() * 0.1, 0.7, 0.5 + Math.random() * 0.2);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    });

    this.particles = new THREE.Points(this.geometry, material);
    this.scene.add(this.particles);
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));

    const positions = [];

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;

      // Update position with velocity
      positions[i3] += this.velocities[i3] * 0.05;
      positions[i3 + 1] += this.velocities[i3 + 1] * 0.05;
      positions[i3 + 2] += this.velocities[i3 + 2] * 0.05;

      // Add a constant velocity to the right
      this.velocities[i3] += 0.03;

      // Add a slight downward pull (gravity)
      this.velocities[i3 + 1] -= 0.003;

      // Reset particles that have moved off-screen to create a continuous flow
      if (positions[i3] > 100) {
        positions[i3] = 0;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = 0;

        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const speed = Math.random() * 5 + 2;

        this.velocities[i3] = Math.sin(theta) * Math.cos(phi) * speed;
        this.velocities[i3 + 1] = Math.sin(theta) * Math.sin(phi) * speed;
        this.velocities[i3 + 2] = Math.cos(theta) * speed;
      }
    }

    // this.geometry.attributes.position.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    const width = this.elementRef.nativeElement.clientWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
