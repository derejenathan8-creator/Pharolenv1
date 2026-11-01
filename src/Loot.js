import * as THREE from 'three';

export class Loot {
  constructor(scene, position, value = 10) {
    this.scene = scene;
    this.value = value;
    this.collected = false;

    const material = new THREE.MeshStandardMaterial({
      color: 0xf7d76a,
      emissive: 0x724f00,
      metalness: 0.8,
      roughness: 0.28,
    });

    this.mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), material);
    this.mesh.position.copy(position.clone().add(new THREE.Vector3(0, 0.6, 0)));
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }

  update(dt, player) {
    if (this.collected) return;

    this.mesh.rotation.y += dt * 2.2;
    this.mesh.position.y += Math.sin(performance.now() * 0.008) * 0.003;

    const distance = this.mesh.position.distanceTo(player.group.position);
    if (distance < 1.5) {
      this.collected = true;
      player.gold += this.value;
      player.game.setMessage(`+${this.value} gold`);
      this.scene.remove(this.mesh);
      return true;
    }

    return false;
  }
}
